<?php
/**
 * Menu template
 *
 * @package    Web
 * @subpackage Layout
 * @author     lhe
 */
class Menu extends TTemplateControl
{
    /**
     * (non-PHPdoc)
     * @see TControl::onLoad()
     */
	public function onLoad($param)
	{
	}
	public function getMenuItems()
	{
		$pageItem = trim($this->getPage()->menuItem);
		$array = array(
			'' => array('url' => '/', 'name' => 'Home')
			,'order' => array('url' => '/order.html', 'name' => 'Orders')
		);
		if(AccessControl::canAccessUsersPage(Core::getRole()) )
			$array['users'] = array('url' => '/users.html', 'name' => 'Users');
		if(AccessControl::canAccessPriceMatchPage(Core::getRole()) )
			$array['priceMatch'] = array('url' => '/pricematch.html', 'name' => 'Price Match');
		if(AccessControl::canAccessOrderItemsPage(Core::getRole()) )
			$array['orderitems'] = array('url' => '/orderitems.html', 'name' => 'OrderItems');
		$html = "<ul class='mainMenu'>";
			foreach($array as $key => $item)
			{
				$activeClass = ($pageItem === $key ? 'active' : '');
				$html .= "<li class='mainMenuItem'><a href='" . $item['url'] . "' class='" . $activeClass . "'>" . $item['name'] . "</a></li>";
			}
		$html .= "</ul>";
		return $html;
	}
}
?>