ALTER TABLE `product` ADD `attributeSetId` INT( 10 ) UNSIGNED NULL DEFAULT NULL AFTER `isKit` ,
ADD INDEX ( `attributeSetId` ) ;