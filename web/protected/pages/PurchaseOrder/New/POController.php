<?php
/**
 * This is the OrderController
 * 
 * @package    Web
 * @subpackage Controller
 * @author     lhe<helin16@gmail.com>
 */
class POController extends BPCPageAbstract
{
	/**
	 * (non-PHPdoc)
	 * @see BPCPageAbstract::$menuItem
	 */
	public $menuItem = 'order.new';
	/**
	 * (non-PHPdoc)
	 * @see BPCPageAbstract::onLoad()
	 */
	public function onLoad($param)
	{
		parent::onLoad($param);
	}
	/**
	 * Getting The end javascript
	 *
	 * @return string
	 */
	protected function _getEndJs()
	{
		$js = parent::_getEndJs();
		
		$paymentMethods =  array_map(create_function('$a', 'return $a->getJson();'), PaymentMethod::getAll());
		$shippingMethods =  array_map(create_function('$a', 'return $a->getJson();'), Courier::getAll());
		$customer = (isset($_REQUEST['customerid']) && ($customer = Customer::get(trim($_REQUEST['customerid']))) instanceof Customer) ? $customer->getJson() : null;
		$js .= "pageJs";
			$js .= ".setHTMLIDs('detailswrapper')";
			$js .= ".setCallbackId('searchSupplier', '" . $this->searchSupplierBtn->getUniqueID() . "')";
			$js .= ".setCallbackId('searchProduct', '" . $this->searchProductBtn->getUniqueID() . "')";
			$js .= ".setCallbackId('saveOrder', '" . $this->saveOrderBtn->getUniqueID() . "')";
			$js .= ".setPaymentMethods(" . json_encode($paymentMethods) . ")";
			$js .= ".setShippingMethods(" . json_encode($shippingMethods) . ")";
			$js .= ".init(" . json_encode($customer) . ");";
		return $js;
	}
	/**
	 * Searching Customer
	 *
	 * @param unknown $sender
	 * @param unknown $param
	 * 
	 * @throws Exception
	 *
	 */
	public function searchSupplier($sender, $param)
	{
		$results = $errors = array();
		try
		{
			$items = array();
			$searchTxt = isset($param->CallbackParameter->searchTxt) ? trim($param->CallbackParameter->searchTxt) : '';
			foreach(Supplier::getAllByCriteria('name like :searchTxt or contactName like :searchTxt', array('searchTxt' => $searchTxt . '%')) as $supplier)
			{
				$items[] = $supplier->getJson();
			}
			$results['items'] = $items;
		}
		catch(Exception $ex)
		{
			$errors[] = $ex->getMessage();
		}
		$param->ResponseData = StringUtilsAbstract::getJson($results, $errors);
	}
	/**
	 * Searching searchProduct
	 *
	 * @param unknown $sender
	 * @param unknown $param
	 * 
	 * @throws Exception
	 *
	 */
	public function searchProduct($sender, $param)
	{
		$results = $errors = array();
		try
		{
			$items = array();
			$searchTxt = isset($param->CallbackParameter->searchTxt) ? trim($param->CallbackParameter->searchTxt) : '';
			$supplierID = isset($param->CallbackParameter->supplierID) ? trim($param->CallbackParameter->supplierID) : '';
			$productIdsFromBarcode = array_map(create_function('$a', 'return $a->getProduct()->getId();'), ProductCode::getAllByCriteria('code = ?', array($searchTxt)));
			$where = (count($productIdsFromBarcode) === 0 ? '' : ' OR id in (' . implode(',', $productIdsFromBarcode) . ')');
			foreach(Product::getAllByCriteria('name like :searchTxt OR sku like :searchTxt' . $where, array('searchTxt' => $searchTxt . '%'), true, 1, DaoQuery::DEFAUTL_PAGE_SIZE) as $product)
			{
				// Min price: across all supplier for one product, Latest price: for one supplier
				$array = $product->getJson();
				$array['minProductPrice'] = 0;
				$array['lastSupplierPrice'] = 0;
				$array['minSupplierPrice'] = 0;
				$minProductPrice = PurchaseOrderItem::getAllByCriteria('productId = ?', array($product->getId()), true, 1, 1, array('unitPrice'=> 'asc'));
				$minProductPrice = sizeof($minProductPrice) ? $minProductPrice[0]->getUnitPrice() : 0;
				$lastSupplierPrice = PurchaseOrderItem::getAllByCriteria('productId = ? and supplierId = ?', array($product->getId(), $supplierID), true, 1, 1, array('id'=> 'desc'));
				$lastSupplierPrice = sizeof($lastSupplierPrice) ? $lastSupplierPrice[0]->getUnitPrice() : 0;
				$minSupplierPrice = PurchaseOrderItem::getAllByCriteria('productId = ? and supplierId = ?', array($product->getId(), $supplierID), true, 1, 1, array('unitPrice'=> 'asc'));
				$minSupplierPrice = sizeof($minSupplierPrice) ? $minSupplierPrice[0]->getUnitPrice() : 0;
				$array['minProductPrice'] = $minProductPrice;
				$array['lastSupplierPrice'] = $lastSupplierPrice;
				$array['minSupplierPrice'] = $minSupplierPrice;
				$items[] = $array;
			}
			$results['items'] = $items;
		}
		catch(Exception $ex)
		{
			$errors[] = $ex->getMessage();
		}
		$param->ResponseData = StringUtilsAbstract::getJson($results, $errors);
	}
	/**
	 * saveOrder
	 *
	 * @param unknown $sender
	 * @param unknown $param
	 * 
	 * @throws Exception
	 *
	 */
	public function saveOrder($sender, $param)
	{
		$results = $errors = array();
		try
		{
			var_dump($param->CallbackParameter);
			
			Dao::beginTransaction();
			$supplier = Supplier::get(trim($param->CallbackParameter->supplier->id));
			if(!$supplier instanceof Supplier)
				throw new Exception('Invalid Supplier passed in!');
			$supplierRefNum = trim($param->CallbackParameter->supplierRefNum);
			$supplierContactName = trim($param->CallbackParameter->contactName);
			$supplierContactNo = trim($param->CallbackParameter->contactNo);
			$shippingCost = trim($param->CallbackParameter->shippingCost);
			$handlingCost = trim($param->CallbackParameter->handlingCost);
			$comment = trim($param->CallbackParameter->comments);
			$purchaseOrder = PurchaseOrder::create($supplier,$supplierRefNum,$supplierContactName,$supplierContactNo,$shippingCost,$handlingCost);
			$purchaseOrderTotalAmount = trim($param->CallbackParameter->totalAmount);
			$purchaseOrderTotalPaid = trim($param->CallbackParameter->totalPaid);
			$purchaseOrder->setTotalAmount($purchaseOrderTotalAmount)->setTotalPaid($purchaseOrderTotalPaid);
			foreach ($param->CallbackParameter->items as $item) {
				$productId = trim($item->product->id);
				$productUnitPrice = trim($item->unitPrice);
				$qtyOrdered = trim($item->qtyOrdered);
				$productWtyOrdered = trim($item->qtyOrdered);
				$productTotalPrice = trim($item->totalPrice);
				$product = Product::get($productId);
				if(!$product instanceof Product)
					throw new Exception('Invalid Product passed in!');
				$purchaseOrder->addItem($product,$supplier->getId(),$productUnitPrice,$qtyOrdered,'','',$productTotalPrice);
			};
			var_dump($purchaseOrder);
			$purchaseOrder->save();
			$purchaseOrder->addComment($comment, Comments::TYPE_SYSTEM);
			Dao::commitTransaction();
		}
		catch(Exception $ex)
		{
			$errors[] = $ex->getMessage();
		}
		$param->ResponseData = StringUtilsAbstract::getJson($results, $errors);
	}
}
?>