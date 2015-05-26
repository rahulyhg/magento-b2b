/**
 * The page Js file
 */
var PageJs = new Class.create();
PageJs.prototype = Object.extend(new CRUDPageJs(), {
	_openinFB: true
	/**
	 * Getting the title row data
	 */
	,_getTitleRowData: function() {
		return {};
	}
	/**
	 * whether to open in fancybox for details page
	 */
	,setOpenInFancyBox: function(_openinFB) {
		var tmp = {};
		tmp.me = this;
		tmp.me._openinFB = _openinFB;
		return tmp.me;
	}
	,refreshResultRow: function(row) {
		var tmp = {};
		tmp.me = this;
		tmp.tbody = $(tmp.me.resultDivId).down('tbody');
		if(!tmp.tbody)
			tmp.tbody = $(tmp.me.resultDivId);
		tmp.row = tmp.tbody.down('.item_row[item_id=' + row.id + ']');
		if(tmp.row)
			tmp.row.replace(tmp.me._getResultRow(row, false).addClassName('item_row'));
		else
			tmp.tbody.insert({'top': tmp.me._getResultRow(row, false).addClassName('item_row')});
		return tmp.me;
	}
	,_openURL: function(url) {
		var tmp = {};
		tmp.me = this;
		tmp.url = url;
		if(tmp.me._openinFB !== true) {
			window.location = tmp.url;
			return tmp.me;
		}
		jQuery.fancybox({
			'width'			: '95%',
			'height'		: '95%',
			'autoScale'     : false,
			'autoDimensions': false,
			'fitToView'     : false,
			'autoSize'      : false,
			'type'			: 'iframe',
			'href'			: tmp.url
 		});
		return tmp.me;
	}
	/**
	 * show the task details Page
	 */
	,showTaskPage: function(task) {
		var tmp = {};
		tmp.me = this;
		if(!task || !task.id)
			return tmp.me;
		tmp.url = '/task/' + task.id + '.html?blanklayout=1';
		return tmp.me._openURL(tmp.url)
	}
	/**
	 * show the product details Page
	 */
	,showProductPage: function(product) {
		var tmp = {};
		tmp.me = this;
		if(!product || !product.id)
			return tmp.me;
		tmp.url = '/product/' + product.id + '.html?blanklayout=1';
		return tmp.me._openURL(tmp.url);
	}
	/**
	 * show the kit details Page
	 */
	,showKitDetailsPage: function(kit) {
		var tmp = {};
		tmp.me = this;
		tmp.url = '/kit/' + ((!kit || !kit.id) ? 'new' : kit.id) + '.html?blanklayout=1';
		return tmp.me._openURL(tmp.url);
	}
	/**
	 * show the order details Page
	 */
	,showOrderDetailsPage: function(order) {
		var tmp = {};
		tmp.me = this;
		if(!order || !order.id)
			return tmp.me;
		tmp.url = '/orderdtails/' + order.id + '.html?blanklayout=1';
		return tmp.me._openURL(tmp.url);
	}
	/**
	 * show the customer details Page
	 */
	,showCustomerDetailsPage: function(customer) {
		var tmp = {};
		tmp.me = this;
		if(!customer || !customer.id)
			return tmp.me;
		tmp.url = '/customer/' + customer.id + '.html?blanklayout=1';
		return tmp.me._openURL(tmp.url);
	}
	/**
	 * Getting the result row for the table
	 */
	,_getResultRow: function(row, isTitle) {
		var tmp = {};
		tmp.me = this;
		tmp.tag = (tmp.isTitle === true ? 'th' : 'td');
		tmp.isTitle = (isTitle || false);
		tmp.row = new Element('tr', {'class': 'order_item ' + (tmp.isTitle === true ? '' : 'btn-hide-row'), 'item_id' : (tmp.isTitle === true ? '' : row.id)})
			.store('data', row)
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-1'})
				.insert({'bottom': tmp.isTitle === true ? 'Barcode' : new Element('a', {'href': 'javascript: void(0);', 'title': 'view details'})
					.update(row.barcode)
					.observe('click', function() {
						tmp.me.showKitDetailsPage(row);
					})
				})
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-5'})
				.insert({'bottom': tmp.isTitle === true ? 'Product' :  new Element('div')
					.insert({'bottom': new Element('div', {"class": 'col-md-12'})
						.insert({'bottom': new Element('a', {'href': 'javascript: void(0);', 'title': row.product.sku})
							.update( row.product.sku )
							.observe('click', function(){
								tmp.me.showProductPage(row.product);
							})
						})
					})
					.insert({'bottom': new Element('div', {"class": 'col-md-12'}).setStyle('padding: 0px;').update( '<small>' + row.product.name + '</small>' )	})
				})
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-2'})
				.insert({'bottom': tmp.isTitle === true ? new Element('div', {'class': 'row'})
						.insert({'bottom': new Element('div', {'class': 'col-xs-5'}).update('Price (inc. GST)') })
						.insert({'bottom': new Element('div', {'class': 'col-xs-5'}).update('Cost (exc. GST)') })
					:
					new Element('div', {'class': 'row'})
						.insert({'bottom': new Element('div', {'class': 'col-xs-5'}).update( tmp.me.getCurrency(row.price) ) })
						.insert({'bottom': new Element('div', {'class': 'col-xs-5'}).update( tmp.me.getCurrency(row.cost) ) })
				})
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-1'})
				.insert({'bottom': tmp.isTitle === true ? 'From Task' :  ((!row.task || !row.task.id) ? '' : new Element('a', {'href': 'javascript: void(0);', "class": 'truncate', 'title': row.task.id})
					.update( row.task.id )
					.observe('click', function(){
						tmp.me.showTaskPage(row.task);
					})
				) })
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-1'})
				.insert({'bottom': tmp.isTitle === true ? 'Sold To Customer' :  ((!row.soldToCustomer || !row.soldToCustomer.name) ? '' : new Element('a', {'href': 'javascript: void(0);', "class": 'truncate', 'title': row.soldToCustomer.name})
						.update( row.customer.name )
						.observe('click', function(){
							tmp.me.showCustomerDetailsPage(row.customer);
						})
				) })
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-1'})
				.insert({'bottom': tmp.isTitle === true ? 'Sold On Order' :  ((!row.soldOnOrder || !row.soldOnOrder.orderNo) ? '' : new Element('a', {'href': 'javascript: void(0);', "class": 'truncate', 'title': row.soldOnOrder.orderNo})
					.update( row.soldOnOrder.orderNo )
					.observe('click', function(){
						tmp.me.showOrderDetailsPage(row.soldOnOrder);
					})
				) })
			})
			.insert({'bottom': new Element(tmp.tag, {'class': 'col-xs-1'})
				.insert({'bottom': tmp.isTitle === true ? 'Shipped Via' :  ((!row.shippment || !row.shippment.id) ? '' : new Element('a', {'href': 'javascript: void(0);', "class": 'truncate', 'title': row.shippment.courier.name})
					.update( row.shippment.courier.name )
				) })
			});
		return tmp.row;
	}

	,_initOrderSearchBox: function() {
		var tmp = {};
		tmp.me = this;
		tmp.selectBox = jQuery('[search_field="ord.id"]').select2({
			 minimumInputLength: 3,
			 multiple: true,
			 ajax: {
				 delay: 250
				 ,url: '/ajax/getAll'
		         ,type: 'POST'
	        	 ,data: function (params) {
	        		 return {"searchTxt": 'orderNo like ?', 'searchParams': ['%' + params + '%'], 'entityName': 'Order', 'pageNo': 1};
	        	 }
				 ,results: function(data, page, query) {
					 tmp.result = [];
					 if(data.resultData && data.resultData.items) {
						 data.resultData.items.each(function(item){
							 tmp.result.push({'id': item.id, 'text': item.orderNo, 'data': item});
						 });
					 }
		    		 return { 'results' : tmp.result };
		    	 }
			 }
			,cache: true
			,formatResult : function(result) {
				 if(!result)
					 return '';
				 return '<div class="row order_item"><div class="col-xs-3">' + result.data.orderNo + '</div><div class="col-xs-3" order_status="' + result.data.status.name + '">' + result.data.status.name + '</div><div class="col-xs-6"><small>' + ((result.data.customer && result.data.customer.name) ? result.data.customer.name : '') + '</small></div></div >';
			 }
			 ,escapeMarkup: function (markup) { return markup; } // let our custom formatter work
		});
		if(tmp.me._preSetData && tmp.me._preSetData.order && tmp.me._preSetData.order.id) {
			tmp.selectBox.select2('data', [{'id': tmp.me._preSetData.order.id, 'text': tmp.me._preSetData.order.orderNo, 'data': tmp.me._preSetData.order}]);
		}
		return tmp.me;
	}
	,_initCustomerSearchBox: function() {
		var tmp = {};
		tmp.me = this;
		tmp.selectBox = jQuery('[search_field="customer.id"]').select2({
			minimumInputLength: 3
			,multiple: true
			,ajax: {
				delay: 250
				,url: '/ajax/getAll'
					,type: 'POST'
						,data: function (params) {
							return {
								'searchTxt': 'name like ?',
								'searchParams': ['%' + params + '%'],
								'entityName': 'Customer',
								'pageNo': 1
							};
						}
		,results: function(data, page, query) {
			tmp.result = [];
			if(data.resultData && data.resultData.items) {
				data.resultData.items.each(function(item){
					tmp.result.push({'id': item.id, 'text': item.name, 'data': item});
				});
			}
			return { 'results' : tmp.result };
		}
			}
		,cache: true
		,escapeMarkup: function (markup) { return markup; } // let our custom formatter work
		});
		if(tmp.me._preSetData && tmp.me._preSetData.customer && tmp.me._preSetData.customer.id) {
			tmp.selectBox.select2('data', [{'id': tmp.me._preSetData.customer.id, 'text': tmp.me._preSetData.customer.name, 'data': tmp.me._preSetData.customer}]);
		}
		return tmp.me;
	}
	,init: function () {
		var tmp = {};
		tmp.me = this;
		jQuery('.datepicker').datetimepicker({
			format: 'DD/MM/YYYY'
		});
		tmp.me._initCustomerSearchBox()
			._initOrderSearchBox();
		$('searchBtn').observe('click', function() {
			tmp.me.getSearchCriteria().getResults(true, 30);
		});
		return tmp.me;
	}
});