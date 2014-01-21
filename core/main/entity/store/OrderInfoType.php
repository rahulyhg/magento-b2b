<?php
/**
 * Entity for OrderInfoType
 *
 * @package    Core
 * @subpackage Entity
 * @author     lhe<helin16@gmail.com>
 */
class OrderInfoType extends InfoTypeAbstract
{
	const ID_CUS_NAME = 1;
	const ID_CUS_EMAIL = 2;
	/**
	 * (non-PHPdoc)
	 * @see BaseEntity::__loadDaoMap()
	 */
	public function __loadDaoMap()
	{
		DaoMap::begin($this, 'oinfo_type');
		parent::__loadDaoMap();
		DaoMap::commit();
	}
}