DROP TABLE IF EXISTS `pricematchmin`;
CREATE TABLE `pricematchmin` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`recordId` int(10) unsigned NULL DEFAULT NULL,
	`sku` varchar(50) NOT NULL DEFAULT '',
	`active` bool NOT NULL DEFAULT 1,
	`created` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
	`createdById` int(10) unsigned NOT NULL DEFAULT 0,
	`updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`updatedById` int(10) unsigned NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
	,INDEX (`recordId`)
	,INDEX (`createdById`)
	,INDEX (`updatedById`)
	,INDEX (`sku`)
) ENGINE=innodb DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `pricematchrecord`;
CREATE TABLE `pricematchrecord` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`minId` int(10) unsigned NOT NULL DEFAULT 0,
	`companyId` int(10) unsigned NOT NULL DEFAULT 0,
	`url` varchar(50) NOT NULL DEFAULT '',
	`price` double(10,4) unsigned NOT NULL DEFAULT 0,
	`name` varchar(100) NOT NULL DEFAULT '',
	`active` bool NOT NULL DEFAULT 1,
	`created` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
	`createdById` int(10) unsigned NOT NULL DEFAULT 0,
	`updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`updatedById` int(10) unsigned NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
	,INDEX (`minId`)
	,INDEX (`companyId`)
	,INDEX (`createdById`)
	,INDEX (`updatedById`)
	,INDEX (`price`)
) ENGINE=innodb DEFAULT CHARSET=utf8;