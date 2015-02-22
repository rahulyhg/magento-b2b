var PageJs=new Class.create;PageJs.prototype=Object.extend(new BPCPageJs,{_htmlIds:{itemDiv:"",searchPanel:"search_panel"},_customer:null,setHTMLIDs:function(e){return this._htmlIds.itemDiv=e,this},setPaymentMethods:function(e){return this._paymentMethods=e,this},setShippingMethods:function(e){return this._shippingMethods=e,this},setOrderTypes:function(e){return this._orderTypes=e,this},_getFormGroup:function(e,t){return new Element("div",{"class":"form-group"}).insert({bottom:e?new Element("label",{"class":"control-label"}).update(e):""}).insert({bottom:t.addClassName("form-control")})},_confirmSubmit:function(e){var t={};if(t.me=this,t.printIt=e===!0?!0:!1,t.data=t.me._collectFormData($(t.me._htmlIds.itemDiv),"save-order"),null===t.data)return t.me;if(t.data.printIt=t.printIt,t.data.type=jQuery('[save-order-type="type"]').val(),t.data.customer={},t.data.customer.id=t.me._customer.id,t.shippAddrPanel=$$(".shipping-address.address-div").first(),t.shippAddrPanel){if(t.shippAddr=t.me._collectFormData(t.shippAddrPanel,"address-editable-field"),null===t.shippAddr)return t.me;t.data.shippingAddr=t.shippAddr}return t.data.items=[],$$(".order-item-row").each(function(e){t.itemData=e.retrieve("data"),t.data.items.push({product:{id:t.itemData.product.id},itemDescription:t.itemData.itemDescription,unitPrice:t.itemData.unitPrice,qtyOrdered:t.itemData.qtyOrdered,totalPrice:t.itemData.totalPrice,serials:e.retrieve("serials")})}),t.data.items.size()<=0?(t.me.showModalBox('<strong class="text-danger">Error</strong>',"At least one order item is needed!",!0),t.me):(t.data.items.each(function(e){e.totalPrice=t.me.getValueFromCurrency(e.totalPrice),e.unitPrice=t.me.getValueFromCurrency(e.unitPrice)}),t.newDiv=new Element("div").insert({bottom:new Element("h4").update("Please confirm whether you want to change it to be an INVOICE.")}).insert({bottom:new Element("div").insert({bottom:new Element("span",{"class":"btn btn-info"}).update("NO. Save as: "+t.data.type).observe("click",function(){t.me._submitOrder(this,t.data)})}).insert({bottom:new Element("div",{"class":"btn-group pull-right  visible-xs visible-sm visible-md visible-lg"}).insert({bottom:new Element("span",{"class":"btn btn-primary",title:"This will push this order to be an INVOICE and status SHIPPED"}).update("YES. GOODs Given to Customer & Push to INVOICE").observe("click",function(){t.data.type="INVOICE",t.data.shipped=!0,t.me._submitOrder(this,t.data)})}).insert({bottom:new Element("span",{"class":"btn btn-primary dropdown-toggle","data-toggle":"dropdown"}).insert({bottom:new Element("span",{"class":"caret"})})}).insert({bottom:new Element("ul",{"class":"dropdown-menu save-btn-dropdown-menu"}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);",title:"This will JUST push this order to be an INVOICE and status NEW"}).update("YES. Push to INVOICE ONLY, goods not given").observe("click",function(){t.data.type="INVOICE",t.data.shipped=!1,t.me._submitOrder(this,t.data)})})})})})}),t.me.showModalBox('<strong class="text-info">Confirmation Needed</strong>',t.newDiv,!1),t.me)},_submitOrder:function(e,t){var n={};return n.me=this,n.modalBoxPanel=$(e).up(".modal-content"),n.modalBoxTitlePanel=n.modalBoxPanel.down(".modal-title"),n.modalBoxBodyPanel=n.modalBoxPanel.down(".modal-body"),n.me.postAjax(n.me.getCallbackId("saveOrder"),t,{onLoading:function(){n.modalBoxTitlePanel.update("Please wait..."),n.modalBoxBodyPanel.update('<h4>Submitting the data, please be patient.</h4><div><h3 class="fa fa-spinner fa-spin"></h3></div>')},onSuccess:function(e,t){try{if(n.result=n.me.getResp(t,!1,!0),!n.result||!n.result.item)return;if(n.me._item=n.result.item,n.modalBoxTitlePanel.update('<strong class="text-success">Success!</strong>'),window.location=document.URL,n.result.printURL&&(n.printWindow=window.open(n.result.printURL,"Printing Order","width=1300, location=no, scrollbars=yes, menubar=no, status=no, titlebar=no, fullscreen=no, toolbar=no"),!n.printWindow))throw'<h4>Your browser has block the popup window, please enable it for further operations.</h4><a href="'+n.result.printURL+'" target="_BLANK"> click here for now</a>'}catch(o){n.modalBoxTitlePanel.update('<h4 class="text-danger">Error:</h4>'),n.modalBoxBodyPanel.update(o)}},onComplete:function(){}}),n.me},_saveBtns:function(){var e={};return e.me=this,e.newDiv=new Element("div").insert({bottom:new Element("div",{"class":"btn-group pull-right  visible-xs visible-sm visible-md visible-lg"}).insert({bottom:new Element("span",{"class":"btn btn-primary save-btn"}).insert({bottom:new Element("span").update(" Save & Print ")}).observe("click",function(){e.me._confirmSubmit(!0)})}).insert({bottom:new Element("span",{"class":"btn btn-primary dropdown-toggle","data-toggle":"dropdown"}).insert({bottom:new Element("span",{"class":"caret"})})}).insert({bottom:new Element("ul",{"class":"dropdown-menu save-btn-dropdown-menu"}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);"}).update("Save Only").observe("click",function(){e.me._confirmSubmit()})})})})}).insert({bottom:new Element("div",{"class":"btn btn-default"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-remove-sign"})}).insert({bottom:new Element("span").update(" cancel ")}).observe("click",function(){e.me.showModalBox('<strong class="text-danger">Cancelling the current order</strong>','<div>You are about to cancel this new order, all input data will be lost.</div><br /><div>Continue?</div><div><span class="btn btn-primary" onclick="window.location = document.URL;"><span class="glyphicon glyphicon-ok"></span> YES</span><span class="btn btn-default pull-right" data-dismiss="modal"><span aria-hidden="true"><span class="glyphicon glyphicon-remove-sign"></span> NO</span></span></div>',!0)})}),e.newDiv},_getAddressDiv:function(e,t,n){var o={};return o.me=this,o.editable=n||!1,o.newDiv=new Element("div",{"class":"address-div"}).insert({bottom:new Element("strong").update(e)}).insert({bottom:new Element("dl",{"class":"dl-horizontal dl-condensed"}).insert({bottom:new Element("dt").update(new Element("span",{"class":"glyphicon glyphicon-user",title:"Customer Name"}))}).insert({bottom:new Element("dd").insert({bottom:new Element("div").insert({bottom:new Element("div",{"class":"col-sm-6"}).update(o.editable!==!0?t.contactName:new Element("input",{"address-editable-field":"contactName","class":"form-control input-sm",placeholder:"The name of contact person",value:t.contactName}))}).insert({bottom:new Element("div",{"class":"col-sm-6"}).update(o.editable!==!0?t.contactNo:new Element("input",{"address-editable-field":"contactNo","class":"form-control input-sm",placeholder:"The contact number of contact person",value:t.contactNo}))})})}).insert({bottom:new Element("dt").update(new Element("span",{"class":"glyphicon glyphicon-map-marker",title:"Address"}))}).insert({bottom:new Element("dd").insert({bottom:new Element("div").insert({bottom:o.editable!==!0?t.street:new Element("div",{"class":"street col-sm-12"}).update(new Element("input",{"address-editable-field":"street","class":"form-control input-sm",placeholder:"Street Number and Street name",value:t.street}))})}).insert({bottom:new Element("div").insert({bottom:o.editable!==!0?t.city+" ":new Element("div",{"class":"city col-sm-6"}).update(new Element("input",{"address-editable-field":"city","class":"form-control input-sm",placeholder:"City / Suburb",value:t.city}))}).insert({bottom:o.editable!==!0?t.region+" ":new Element("div",{"class":"region col-sm-3"}).update(new Element("input",{"address-editable-field":"region","class":"form-control input-sm",placeholder:"State / Province",value:t.region}))}).insert({bottom:o.editable!==!0?t.postCode:new Element("div",{"class":"postcode col-sm-3"}).update(new Element("input",{"address-editable-field":"postCode","class":"form-control input-sm",placeholder:"PostCode",value:t.postCode}))})}).insert({bottom:new Element("div").insert({bottom:o.editable!==!0?t.country:new Element("div",{"class":"postcode col-sm-4"}).update(new Element("input",{"address-editable-field":"country","class":"form-control input-sm",placeholder:"Country",value:t.country}))})})})}),o.editable===!0&&o.newDiv.writeAttribute("address-editable",!0),o.newDiv},_getCustomerInfoPanel:function(){var e={};return e.me=this,e.customer=e.me._customer,e.typeSelBox=new Element("select",{"save-order-type":"type"}),e.me._orderTypes.each(function(t){e.typeSelBox.insert({bottom:e.option=new Element("option",{value:t}).update(t)}).observe("change",function(){e.panels=jQuery(".panel").removeClass("panel-success").removeClass("panel-warning").removeClass("panel-info"),e.inputs=jQuery(".list-group-item").removeClass("list-group-item-success").removeClass("list-group-item-warning").removeClass("list-group-item-info"),"QUOTE"===$F(this)?(e.panels.addClass("panel-warning"),e.inputs.addClass("list-group-item-warning")):"ORDER"===$F(this)?(e.panels.addClass("panel-success"),e.inputs.addClass("list-group-item-success")):(e.panels.addClass("panel-info"),e.inputs.addClass("list-group-item-info"))}),"ORDER"===t&&e.option.writeAttribute("selected",!0)}),e.newDiv=new Element("div",{"class":"panel panel-success"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-8"}).insert({bottom:new Element("strong").update("CREATING A ")}).insert({bottom:e.typeSelBox}).insert({bottom:new Element("strong").update(" FOR:  "+e.customer.name+" ")}).insert({bottom:" <"}).insert({bottom:new Element("a",{href:"mailto:"+e.customer.email}).update(e.customer.email)}).insert({bottom:">"}).insert({bottom:new Element("strong").update(" with PO No.:")}).insert({bottom:new Element("input",{type:"text","save-order":"poNo",placeholder:"Optional - PO No. From Customer"})})}).insert({bottom:new Element("div",{"class":"col-sm-4 text-right"}).insert({bottom:new Element("strong").update("Total Payment Due: ")}).insert({bottom:new Element("span",{"class":"badge","order-price-summary":"total-payment-due"}).update(e.me.getCurrency(0))})})})}).insert({bottom:new Element("div",{"class":"panel-body"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("small").update(new Element("em").update(e.customer.description))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:e.me._getAddressDiv("Billing Address: ",e.customer.address.billing).addClassName("col-xs-6")}).insert({bottom:e.me._getAddressDiv("Shipping Address: ",e.customer.address.shipping,!0).addClassName("col-xs-6").addClassName("shipping-address")})})}),e.newDiv},_getProductRow:function(e,t){var n={};return n.me=this,n.isTitle=t||!1,n.tag=n.isTitle===!0?"strong":"div",n.row=new Element("div",{"class":" list-group-item "+(n.isTitle===!0?"":"item_row order-item-row")}).store("data",e).insert({bottom:new Element("div",{"class":"row"}).store("data",e).insert({bottom:new Element(n.tag,{"class":"productName col-xs-6"}).insert({bottom:e.itemDescription?e.itemDescription:e.product.name})}).insert({bottom:new Element(n.tag,{"class":"uprice col-xs-1"}).insert({bottom:e.unitPrice})}).insert({bottom:new Element(n.tag,{"class":"col-xs-2"}).insert({bottom:new Element("div").insert({bottom:new Element("div",{"class":"qty col-xs-6"}).update(e.qtyOrdered)}).insert({bottom:new Element("div",{"class":"discount col-xs-6"}).update(e.discount)})})}).insert({bottom:new Element(n.tag,{"class":"tprice col-xs-1"}).insert({bottom:e.totalPrice})}).insert({bottom:new Element(n.tag,{"class":"margin col-xs-1 text-right"}).update(e.margin)}).insert({bottom:new Element(n.tag,{"class":"btns col-xs-1 text-right"}).update(e.btns)})}),e.product.sku&&n.row.down(".productName").removeClassName("col-xs-6").addClassName("col-xs-4").insert({before:new Element(n.tag,{"class":"productSku col-xs-2"}).update(e.product.sku).insert({bottom:new Element("small",{"class":e.product.id?"btn btn-xs btn-info":"hidden"}).insert({bottom:new Element("small",{"class":"glyphicon glyphicon-new-window"})}).observe("click",function(t){Event.stop(t),$productId=e.product.id,$productId&&n.me._openProductDetailPage($productId)})})}),e.scanTable&&n.row.insert({bottom:new Element("div",{"class":"row product-content-row"}).insert({bottom:new Element("span",{"class":"col-sm-2 show-tools"}).insert({bottom:new Element("input",{type:"checkbox",checked:!0,"class":"show-panel-check"}).observe("click",function(){n.btn=this,n.panel=$(n.btn).up(".product-content-row").down(".serial-no-scan-pane"),n.btn.checked?n.panel.show():n.panel.hide()})}).insert({bottom:new Element("a",{href:"javascript: void(0);"}).update(" show serial scan panel?").observe("click",function(){$(this).up(".show-tools").down(".show-panel-check").click()})})}).insert({bottom:new Element("span",{"class":"col-sm-10 serial-no-scan-pane",style:"padding-top: 5px"}).update(e.scanTable)})}),n.row},_getSearchPrductResultRow:function(e,t){var n={};return n.me=this,n.defaultImgSrc="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZWVlIi8+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iMzIiIHk9IjMyIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9zdmc+",n.newRow=new Element("a",{"class":"list-group-item search-product-result-row",href:"javascript: void(0);"}).store("data",e).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-2"}).insert({bottom:new Element("div",{"class":"thumbnail"}).insert({bottom:new Element("img",{"data-src":"holder.js/100%x64",alert:"Product Image",src:0===e.images.size()?n.defaultImgSrc:e.images[0].asset.url})})})}).insert({bottom:new Element("div",{"class":"col-xs-10"}).insert({bottom:new Element("strong").update(e.name).insert({bottom:new Element("small",{"class":"btn btn-xs btn-info"}).insert({bottom:new Element("small",{"class":"glyphicon glyphicon-new-window"})})}).observe("click",function(e){Event.stop(e),$productId=$(this).up(".search-product-result-row").retrieve("data").id,$productId&&n.me._openProductDetailPage($productId)}).insert({bottom:new Element("small",{"class":"pull-right"}).update("SKU: "+e.sku)})}).insert({bottom:new Element("div").insert({bottom:new Element("small").update(e.shortDescription)})}).insert({bottom:new Element("div").insert({bottom:new Element("small",{"class":"col-xs-4"}).insert({bottom:new Element("div",{"class":"input-group",title:"stock on HAND"}).insert({bottom:new Element("span",{"class":"input-group-addon"}).update("SOH:")}).insert({bottom:new Element("strong",{"class":"form-control"}).update(e.stockOnHand)})})}).insert({bottom:new Element("small",{"class":"col-xs-4"}).insert({bottom:new Element("div",{"class":"input-group",title:"stock on ORDER"}).insert({bottom:new Element("span",{"class":"input-group-addon"}).update("SOO:")}).insert({bottom:new Element("strong",{"class":"form-control"}).update(e.stockOnOrder)})})}).insert({bottom:new Element("small",{"class":"col-xs-4"}).insert({bottom:new Element("div",{"class":"input-group",title:"stock on PO"}).insert({bottom:new Element("span",{"class":"input-group-addon"}).update("SOP:")}).insert({bottom:new Element("strong",{"class":"form-control"}).update(e.stockOnPO)})})})})})}).observe("click",function(){n.inputRow=$(t).up(".new-order-item-input").store("product",e),t.up(".productName").writeAttribute("colspan",!1).update(e.sku).removeClassName("col-xs-8").addClassName("col-xs-2").insert({bottom:new Element("small",{"class":"btn btn-xs btn-info"}).insert({bottom:new Element("small",{"class":"glyphicon glyphicon-new-window"})}).observe("click",function(t){Event.stop(t),$productId=e.id,$productId&&n.me._openProductDetailPage($productId)})}).insert({bottom:new Element("a",{href:"javascript: void(0);","class":"text-danger pull-right",title:"click to change the product"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-remove"})}).observe("click",function(){n.newRow=n.me._getNewProductRow(),$(this).up(".new-order-item-input").replace(n.newRow),n.newRow.down("[new-order-item=product]").select()})}).insert({after:new Element("div",{"class":"col-xs-4"}).update(new Element("textarea",{"new-order-item":"itemDescription"}).setStyle("width: 100%").update(e.name))}),jQuery("#"+n.me.modalId).modal("hide"),n.retailPrice=0===e.prices.size()?0:e.prices[0].price,n.inputRow.down("[new-order-item=unitPrice]").writeAttribute("value",n.me.getCurrency(n.retailPrice)).select(),n.me._calculateNewProductPrice(n.inputRow)}),n.newRow},_searchProduct:function(e,t,n){var o={};return o.me=this,o.btn=e,o.showMore=$(e).retrieve("showMore")===!0?!0:!1,o.pageNo=t||1,o.me._signRandID(o.btn),o.searchTxtBox=$(o.btn).up(".product-autocomplete")&&$(o.btn).up(".product-autocomplete").down(".search-txt")?$(o.btn).up(".product-autocomplete").down(".search-txt"):$($(o.btn).retrieve("searchBoxId")),o.me._signRandID(o.searchTxtBox),o.searchTxt=$F(o.searchTxtBox),o.me.postAjax(o.me.getCallbackId("searchProduct"),{searchTxt:o.searchTxt,pageNo:o.pageNo},{onLoading:function(){jQuery("#"+o.btn.id).button("loading"),jQuery("#"+o.searchTxtBox.id).button("loading")},onSuccess:function(t,r){o.resultList=o.showMore===!1?new Element("div",{"class":"search-product-list"}):$(e).up(".search-product-list");try{if(o.result=o.me.getResp(r,!1,!0),!o.result||!o.result.items||0===o.result.items.size())throw"Nothing Found for: "+o.searchTxt;o.me._signRandID(o.searchTxtBox),o.result.items.each(function(e){o.resultList.insert({bottom:o.me._getSearchPrductResultRow(e,o.searchTxtBox)})}),o.resultList.addClassName("list-group")}catch(s){o.resultList.update(o.me.getAlertBox("Error: ",s).addClassName("alert-danger"))}"function"==typeof n&&n(),o.result.pagination.pageNumber<o.result.pagination.totalPages&&o.resultList.insert({bottom:new Element("a",{"class":"item-group-item"}).insert({bottom:new Element("span",{"class":"btn btn-primary","data-loading-text":"Getting more ..."}).update("Show Me More")}).observe("click",function(){o.newBtn=$(this),$(o.newBtn).store("searchBoxId",o.searchTxtBox.id),$(o.newBtn).store("showMore",!0),o.me._searchProduct(this,1*o.pageNo+1,function(){$(o.newBtn).remove()})})}),o.showMore===!1&&o.me.showModalBox("Products that has: "+o.searchTxt,o.resultList,!1)},onComplete:function(){jQuery("#"+o.btn.id).button("reset"),jQuery("#"+o.searchTxtBox.id).button("reset")}}),o.me},_getNewProductProductAutoComplete:function(){var e={};return e.me=this,e.skuAutoComplete=e.me._getFormGroup(null,new Element("div",{"class":"input-group input-group-sm product-autocomplete"}).insert({bottom:new Element("input",{"class":"form-control search-txt visible-xs visible-sm visible-md visible-lg","new-order-item":"product",required:!0,placeholder:"search SKU, NAME and any BARCODE for this product"}).observe("keyup",function(t){e.txtBox=this,e.me.keydown(t,function(){$(e.txtBox).up(".product-autocomplete").down(".search-btn").click()})}).observe("keydown",function(t){e.txtBox=this,e.me.keydown(t,function(){$(e.txtBox).up(".product-autocomplete").down(".search-btn").click()},function(){},Event.KEY_TAB)})}).insert({bottom:new Element("span",{"class":"input-group-btn"}).insert({bottom:new Element("span",{"class":" btn btn-primary search-btn","data-loading-text":"searching..."}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-search"})}).observe("click",function(){$F($(this).up(".product-autocomplete").down(".search-txt")).blank()?$(this).up(".product-autocomplete").down(".search-txt").focus():e.me._searchProduct(this)})})})),e.skuAutoComplete.down(".input-group").removeClassName("form-control"),e.skuAutoComplete},_recalculateSummary:function(){var e={};return e.me=this,e.totalPriceIncGSTNoDicount=0,e.totalPriceIncGSTWithDiscount=0,e.totalMargin=0,$$(".item_row.order-item-row").each(function(t){e.rowData=t.retrieve("data"),e.totalPriceIncGSTWithDiscount=1*e.totalPriceIncGSTWithDiscount+1*e.me.getValueFromCurrency(e.rowData.totalPrice),e.totalPriceIncGSTNoDicount=1*e.totalPriceIncGSTNoDicount+e.me.getValueFromCurrency(e.rowData.unitPrice)*e.rowData.qtyOrdered,e.rowData.margin&&(e.totalMargin=1*e.totalMargin+1*e.me.getValueFromCurrency(e.rowData.margin))}),e.totalPriceExcGST=1*e.totalPriceIncGSTWithDiscount/1.1,jQuery('[order-price-summary="totalPriceExcludeGST"]').val(e.me.getCurrency(e.totalPriceExcGST)).html(e.me.getCurrency(e.totalPriceExcGST)),e.totalGST=1*e.totalPriceIncGSTWithDiscount-1*e.totalPriceExcGST,jQuery('[order-price-summary="totalPriceGST"]').val(e.me.getCurrency(e.totalGST)).html(e.me.getCurrency(e.totalGST)),e.totalDiscount=1*e.totalPriceIncGSTNoDicount-1*e.totalPriceIncGSTWithDiscount,jQuery('[order-price-summary="totalDiscount"]').val(e.me.getCurrency(e.totalDiscount)).html(e.me.getCurrency(e.totalDiscount)),jQuery('[order-price-summary="totalPriceIncludeGST"]').val(e.me.getCurrency(e.totalPriceIncGSTWithDiscount)).html(e.me.getCurrency(e.totalPriceIncGSTWithDiscount)),e.totalShipping=jQuery('[order-price-summary="totalShippingCost"]').length>0?jQuery('[order-price-summary="totalShippingCost"]').val():0,e.subTotal=1*e.totalShipping+1*e.totalPriceIncGSTWithDiscount,jQuery('[order-price-summary="subTotal"]').val(e.me.getCurrency(e.subTotal)).html(e.me.getCurrency(e.subTotal)),e.totalPaid=jQuery('[order-price-summary="totalPaidAmount"]').length>0?jQuery('[order-price-summary="totalPaidAmount"]').val():0,e.totalDue=1*e.subTotal-1*e.totalPaid,e.totalDue<0&&e.me.showModalBox('<h4 class="text-danger">Attention!</h4>','<div><strong>The customer has paid more than the due amount?</strong></div><div><span class="btn btn-primary" onclick="pageJs.hideModalBox();">OK</span>',!0),jQuery('[order-price-summary="total-payment-due"]').val(e.me.getCurrency(e.totalDue)).html(e.me.getCurrency(e.totalDue)),jQuery('[order-price-summary="total-margin"]').val(e.me.getCurrency(e.totalMargin)).html(e.me.getCurrency(e.totalMargin)),e.me},_addNewProductRow:function(e){var t={};return t.me=this,t.currentRow=$(e).up(".new-order-item-input"),t.product=t.currentRow.retrieve("product"),t.product?(t.unitPriceBox=t.currentRow.down("[new-order-item=unitPrice]"),t.unitPrice=t.me.getValueFromCurrency($F(t.unitPriceBox)),null===t.unitPrice.match(/^\d+(\.\d{1,2})?$/)?void t.me._markFormGroupError(t.unitPriceBox,"Invalid value provided!"):(t.qtyOrderedBox=t.currentRow.down("[new-order-item=qtyOrdered]"),t.qtyOrdered=t.me.getValueFromCurrency($F(t.qtyOrderedBox)),null===t.qtyOrdered.match(/^\d+(\.\d{1,2})?$/)?void t.me._markFormGroupError(t.qtyOrderedBox,"Invalid value provided!"):(t.discountBox=t.currentRow.down("[new-order-item=discount]"),t.discount=t.me.getValueFromCurrency($F(t.discountBox)),null===t.discount.match(/^\d+(\.\d{1,2})?$/)?void t.me._markFormGroupError(t.discountBox,"Invalid value provided!"):(t.totalPriceBox=t.currentRow.down("[new-order-item=totalPrice]"),t.totalPrice=t.me.getValueFromCurrency($F(t.totalPriceBox)),null===t.totalPrice.match(/^\d+(\.\d{1,2})?$/)?void t.me._markFormGroupError(t.totalPriceBox,"Invalid value provided!"):(t.currentRow.getElementsBySelector(".form-group.has-error .form-control").each(function(e){$(e).retrieve("clearErrFunc")()}),t.itemDescription=$F(t.currentRow.down("[new-order-item=itemDescription]")).replace(/\n/g,"<br />"),t.data={product:t.product,itemDescription:t.itemDescription,unitPrice:t.me.getCurrency(t.unitPrice),qtyOrdered:t.qtyOrdered,discount:t.discount,margin:t.me.getCurrency(parseFloat(t.totalPrice)-parseFloat(1.1*t.product.unitCost*t.qtyOrdered)),totalPrice:t.me.getCurrency(t.totalPrice),btns:new Element("span",{"class":"pull-right"}).insert({bottom:new Element("span",{"class":"btn btn-danger btn-xs"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-trash"})}).observe("click",function(){confirm("You remove this entry.\n\nContinue?")&&(t.row=$(this).up(".item_row"),t.row.remove(),t.me._recalculateSummary())})})},t.data.scanTable=t.me._getScanTable(t.data),t.currentRow.insert({after:t.itemRow=t.me._getProductRow(t.data)}),t.newRow=t.me._getNewProductRow(),t.currentRow.replace(t.newRow).addClassName(),t.newRow.down("[new-order-item=product]").focus(),t.me._recalculateSummary(),t.me))))):(t.productBox=t.currentRow.down("[new-order-item=product]"),void(t.currentRow.down("[new-order-item=product]")?t.me._markFormGroupError(t.productBox,"Select a product first!"):t.me.showModalBox("Product Needed","Select a product first!",!0)))},_getScanTable:function(e){var t={};for(t.me=this,t.item=e,t.newDiv=new Element("div",{"class":"scanTable"}),t.i=0;t.i<e.qtyOrdered;t.i++)t.newDiv.insert({bottom:new Element("input",{"class":"form-control","scanned-item":"serialNo",type:"text",placeholder:"Serial Number:"}).observe("change",function(){t.emptyIput=null,t.serials=[],$(this).up(".scanTable").getElementsBySelector('input[scanned-item="serialNo"]').each(function(e){$F(e).blank()||t.serials.push($F(e)),null===t.emptyIput&&$F(e).blank()&&(t.emptyIput=e)}),$(this).up(".order-item-row").store("serials",t.serials),null!==t.emptyIput&&t.emptyIput.select()}).wrap(new Element("div",{"class":"col-sm-3"}))});return t.newDiv},_calculateNewProductPrice:function(e){var t={};return t.me=this,t.row=e,t.unitPrice=t.me.getValueFromCurrency($F(t.row.down("[new-order-item=unitPrice]"))),t.discount=$F(t.row.down("[new-order-item=discount]")).strip().replace("%",""),t.qty=$F(t.row.down("[new-order-item=qtyOrdered]")).strip(),t.totalPrice=t.unitPrice*(1-t.discount/100)*t.qty,$(t.row.down("[new-order-item=totalPrice]")).value=t.me.getCurrency(t.totalPrice),e.retrieve("product")&&(t.unitCost=e.retrieve("product").unitCost,t.row.down(".margin")&&$(t.row.down(".margin")).update(t.me.getCurrency(1*t.totalPrice-1.1*t.unitCost*t.qty)+(0===parseInt(t.unitCost)?'<div><small class="label label-danger">No Cost Yet</small</div>':""))),t.me},_bindSubmitNewProductRow:function(e,t){var n={};return n.me=this,n.txtBox=t,n.me.keydown(e,function(){$(n.txtBox).up(".item_row").down(".save-new-product-btn").click()}),n.me},_getNewProductRow:function(){var e={};return e.me=this,e.skuAutoComplete=e.me._getNewProductProductAutoComplete(),e.data={product:{name:e.skuAutoComplete},unitPrice:e.me._getFormGroup(null,new Element("input",{"class":"input-sm","new-order-item":"unitPrice",required:!0,value:e.me.getCurrency(0)}).observe("click",function(){$(this).select()}).observe("keydown",function(t){e.me._bindSubmitNewProductRow(t,this)}).observe("keyup",function(){e.me._calculateNewProductPrice($(this).up(".item_row"))})),qtyOrdered:e.me._getFormGroup(null,new Element("input",{"class":"input-sm","new-order-item":"qtyOrdered",required:!0,value:"1"}).observe("keyup",function(){e.me._calculateNewProductPrice($(this).up(".item_row"))}).observe("keydown",function(t){e.me._bindSubmitNewProductRow(t,this)}).observe("click",function(){$(this).select()})),discount:e.me._getFormGroup(null,new Element("input",{"class":"input-sm","new-order-item":"discount",value:"0"}).observe("keyup",function(){($F($(this)).blank()||$F($(this))>100)&&($(this).value=0,$(this).select()),e.me._calculateNewProductPrice($(this).up(".item_row"))}).observe("keydown",function(t){e.me._bindSubmitNewProductRow(t,this)}).observe("click",function(){$(this).select()})),totalPrice:e.me._getFormGroup(null,new Element("input",{"class":"input-sm",disabled:!0,"new-order-item":"totalPrice",required:!0,value:e.me.getCurrency(0)})),margin:e.me.getCurrency(0),btns:new Element("span",{"class":"btn-group btn-group-sm pull-right"}).insert({bottom:new Element("span",{"class":"btn btn-primary"}).insert({bottom:new Element("span",{"class":" glyphicon glyphicon-floppy-saved save-new-product-btn"})}).observe("click",function(){e.me._addNewProductRow(this)})}).insert({bottom:new Element("span",{"class":"btn btn-default"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-floppy-remove"})}).observe("click",function(){confirm("You about to clear this entry. All input data for this entry will be lost.\n\nContinue?")&&(e.newRow=e.me._getNewProductRow(),e.currentRow=$(this).up(".new-order-item-input"),e.currentRow.getElementsBySelector(".form-group.has-error .form-control").each(function(e){$(e).retrieve("clearErrFunc")()}),e.currentRow.replace(e.newRow),e.newRow.down("[new-order-item=product]").focus())})})},e.me._getProductRow(e.data,!1).addClassName("new-order-item-input list-group-item-success").removeClassName("order-item-row")},_getPartsTable:function(){var e={};return e.me=this,e.productListDiv=new Element("div",{"class":"list-group order_change_details_table"}).insert({bottom:e.me._getProductRow({product:{sku:"SKU",name:"Description"},unitPrice:"Unit Price<div><small>(inc GST)</small><div>",qtyOrdered:"Qty",margin:"Margin",discount:"Disc. %",totalPrice:"Total Price<div><small>(inc GST)</small><div>",btns:new Element("div").insert({bottom:new Element("label",{"for":"hide-margin-checkbox"}).update("Show Margin ")}).insert({bottom:new Element("input",{id:"hide-margin-checkbox",type:"checkbox",checked:!0}).observe("click",function(){jQuery(".margin").toggle()})})},!0)}),e.productListDiv.insert({bottom:e.me._getNewProductRow().addClassName("list-group-item-success")}),e.productListDiv},_getSummaryFooter:function(){var e={};return e.me=this,e.shippingMethodSel=new Element("select",{"class":"form-control input-sm","save-order":"courierId"}).insert({bottom:new Element("option",{value:""}).update("Shipping Via:")}),e.me._shippingMethods.each(function(t){e.shippingMethodSel.insert({bottom:new Element("option",{value:t.id}).update(t.name)})}),e.paymentMethodSel=new Element("select",{"class":"form-control input-sm","save-order":"paymentMethodId"}).insert({bottom:new Element("option",{value:""}).update("Paid Via:")}),e.me._paymentMethods.each(function(t){e.paymentMethodSel.insert({bottom:new Element("option",{value:t.id}).update(t.name)})}),e.newDiv=new Element("div",{"class":"panel-footer"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-8"}).insert({bottom:e.me._getFormGroup("Comments:",new Element("textarea",{"save-order":"comments",rows:"8"}))})}).insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Total Excl. GST: "))}).insert({bottom:new Element("div",{"class":"col-xs-6","order-price-summary":"totalPriceExcludeGST"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Total GST: "))}).insert({bottom:new Element("div",{"order-price-summary":"totalPriceGST","class":"col-xs-6"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row",style:"border-bottom: 1px solid brown"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Total Discount:"))}).insert({bottom:new Element("div",{"order-price-summary":"totalDiscount","class":"col-xs-6"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Sub Total Incl. GST: "))}).insert({bottom:new Element("div",{"order-price-summary":"totalPriceIncludeGST","class":"col-xs-6"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row",style:"border-bottom: 1px solid brown"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update(e.shippingMethodSel.observe("change",function(){e.btn=this,$(e.btn).up(".row").down(".input-field").update($F(e.btn).blank()?e.me.getCurrency(0):e.shippingCostBox=new Element("input",{"order-price-summary":"totalShippingCost","class":"form-control input-sm","save-order":"totalShippingCost",placeholder:e.me.getCurrency(0),required:!0,validate_currency:"Invalid number provided!",value:0}).observe("keyup",function(){e.me._recalculateSummary()
})),e.me._recalculateSummary(),e.shippingCostBox&&e.shippingCostBox.select()})))}).insert({bottom:new Element("div",{"class":"col-xs-6 input-field"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Total Incl. GST:"))}).insert({bottom:new Element("strong",{"order-price-summary":"subTotal","class":"col-xs-6"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row",style:"border-bottom: 1px solid brown"}).insert({bottom:new Element("div",{"class":"col-xs-6 text-right"}).update(new Element("strong").update(e.paymentMethodSel.observe("change",function(){e.btn=this,$(e.btn).up(".row").down(".input-field").update($F(e.btn).blank()?e.me.getCurrency(0):e.paidAmountBox=new Element("input",{"order-price-summary":"totalPaidAmount","class":"form-control input-sm","save-order":"totalPaidAmount",placeholder:e.me.getCurrency(0),required:!0,validate_currency:"Invalid number provided!"}).observe("keyup",function(){e.me._recalculateSummary()})),e.me._recalculateSummary(),e.paidAmountBox&&e.paidAmountBox.select()})))}).insert({bottom:new Element("div",{"class":"col-xs-6 input-field"}).update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("h4",{"class":"col-xs-6 text-right"}).setStyle("color: #d30014 !important").update(new Element("strong").update("DUE:"))}).insert({bottom:new Element("h4",{"class":"col-xs-6","order-price-summary":"total-payment-due"}).setStyle("color: #d30014 !important").update(e.me.getCurrency(0))})}).insert({bottom:new Element("div",{"class":"row margin"}).insert({bottom:new Element("strong",{"class":"col-xs-6 text-right"}).update(new Element("strong").update("Margin Total Incl. GST:"))}).insert({bottom:new Element("strong",{"class":"col-xs-6","order-price-summary":"total-margin"}).update(e.me.getCurrency(0))})})})}),e.newDiv},_getViewOfOrder:function(){var e={};return e.me=this,e.newDiv=new Element("div").insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-12"}).update(e.me._getCustomerInfoPanel())})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-12"}).insert({bottom:new Element("div",{"class":"panel panel-success"}).update(e.me._getPartsTable()).insert({bottom:e.me._getSummaryFooter()})})})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-12"}).update(e.me._saveBtns())})}),e.newDiv},selectCustomer:function(e){var t={};return t.me=this,t.me._customer=e,t.newDiv=t.me._getViewOfOrder(),$(t.me._htmlIds.itemDiv).update(t.newDiv),t.newDiv.down('.new-order-item-input [new-order-item="product"]').focus(),t.me},_getCustomerRow:function(e,t){var n={};return n.me=this,n.isTitle=t||!1,n.tag=n.isTitle===!0?"th":"td",n.newDiv=new Element("tr").store("data",e).insert({bottom:new Element(n.tag).insert({bottom:n.isTitle===!0?"&nbsp;":new Element("span",{"class":"btn btn-primary btn-xs"}).update("select").observe("click",function(){n.me.selectCustomer(e)})})}).insert({bottom:new Element(n.tag).update(e.name)}).insert({bottom:new Element(n.tag).update(e.email)}).insert({bottom:new Element(n.tag).update(e.address&&e.address.billing?e.address.billing.full:"")}),n.newDiv},_searchCustomer:function(e){var t={};return t.me=this,t.searchTxt=$F(e).strip(),t.searchPanel=$(e).up("#"+t.me._htmlIds.searchPanel),t.me.postAjax(t.me.getCallbackId("searchCustomer"),{searchTxt:t.searchTxt},{onLoading:function(){$(t.searchPanel).down(".list-div")&&$(t.searchPanel).down(".list-div").remove(),$(t.searchPanel).insert({bottom:new Element("div",{"class":"panel-body"}).update(t.me.getLoadingImg())})},onSuccess:function(e,n){$(t.searchPanel).down(".panel-body").remove();try{if(t.result=t.me.getResp(n,!1,!0),!t.result||!t.result.items)return;$(t.searchPanel).insert({bottom:new Element("small",{"class":"table-responsive list-div"}).insert({bottom:new Element("table",{"class":"table table-hover table-condensed"}).insert({bottom:new Element("thead").insert({bottom:t.me._getCustomerRow({name:"Customer Name",email:"Email",address:{billing:{full:"Address"}}},!0)})}).insert({bottom:t.listDiv=new Element("tbody")})})}),t.result.items.each(function(e){t.listDiv.insert({bottom:t.me._getCustomerRow(e)})})}catch(o){$(t.searchPanel).insert({bottom:new Element("div",{"class":"panel-body"}).update(t.me.getAlertBox("ERROR",o).addClassName("alert-danger"))})}}}),t.me},_getCustomerListPanel:function(){var e={};return e.me=this,e.newDiv=new Element("div",{id:e.me._htmlIds.searchPanel,"class":"panel panel-default search-panel"}).insert({bottom:new Element("div",{"class":"panel-heading form-inline"}).insert({bottom:new Element("strong").update("Creating a new order for: ")}).insert({bottom:new Element("span",{"class":"input-group col-sm-6"}).insert({bottom:new Element("input",{"class":"form-control search-txt init-focus",placeholder:"customer name or email"}).observe("keyup",function(t){e.me.keydown(t,function(){$(e.me._htmlIds.searchPanel).down(".search-btn").click()})})}).insert({bottom:new Element("span",{"class":"input-group-btn search-btn"}).insert({bottom:new Element("span",{"class":" btn btn-primary"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-search"})})}).observe("click",function(){e.btn=this,e.me._searchCustomer($(e.me._htmlIds.searchPanel).down(".search-txt"))})})}).insert({bottom:new Element("span",{"class":"btn btn-success pull-right btn-sm"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-plus-sign"})}).insert({bottom:" NEW"}).observe("click",function(){e.me._openNewCustomerPage()})})}),e.newDiv},_openNewCustomerPage:function(){var e={};return e.me=this,jQuery.fancybox({width:"95%",height:"95%",autoScale:!1,autoDimensions:!1,fitToView:!1,autoSize:!1,type:"iframe",href:"/customer/new.html",beforeClose:function(){e.newCustomer=$$("iframe.fancybox-iframe").first().contentWindow.pageJs._item,e.newCustomer.id&&e.me.selectCustomer(e.newCustomer)}}),e.me},_openProductDetailPage:function(e){var t={};return t.me=this,t.newWindow=window.open("/product/"+e+".html","Product Details","width=1300, location=no, scrollbars=yes, menubar=no, status=no, titlebar=no, fullscreen=no, toolbar=no"),t.newWindow.focus(),t.me},init:function(e){var t={};return t.me=this,e?t.me.selectCustomer(e):$(t.me._htmlIds.itemDiv).update(t.me._getCustomerListPanel()),$$(".init-focus").size()>0&&$$(".init-focus").first().focus(),t.me}});