<?php
abstract class CourierConnector
{
	public static $_cache = array();
	/**
	 * The courier this connector is for
	 * 
	 * @var Courier
	 */
	protected $_courier = null;
	
	protected $_internalCache = array();
	
	/**
	 * Getting the connector
	 * 
	 * @param Courier $courier The courier this connector is for
	 * 
	 * @return multitype:
	 */
	public static function getConnector(Courier $courier)
	{
		if(!isset(self::$_cache[$courier->getId()]))
		{
			$className = get_called_class();
			self::$_cache[$courier->getId()] = new $className($courier);
		}
		return self::$_cache[$courier->getId()];
	}
	/**
	 * construct
	 * 
	 * @param Courier $courier The courier this connector is for
	 */
	public function __construct(Courier $courier)
	{
		$this->_courier = $courier;
	}
	
	public function getCourierInfo(CourierInfoType $courierInfoType)
	{
		if(!isset($this->_internalCache[$courierInfoType->getId()]))
		{	
			$courierInfoArray = FactoryAbastract::service('CourierInfo')->findByCriteria('courierId = ? and typeId = ?', array($this->_courier->getId(), $courierInfoType->getId()), true, 1,1);
			if(count($courierInfoArray) === 0)
				throw new Exception('No ['. $courierInfoType->getName() .'] set for courier '.$this->_courier->getName());
			
			$this->_internalCache[$courierInfoType->getId()] = $courierInfoArray[0]->getValue();
		}
		
		return $this->_internalCache[$courierInfoType->getId()];
	}
}