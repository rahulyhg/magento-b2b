var PageJs=new Class.create;PageJs.prototype=Object.extend(new CRUDPageJs,{manufactures:[],suppliers:[],productCategories:[],productStatuses:[],_showRightPanel:!1,_getTitleRowData:function(){return{sku:"SKU",name:"Product Name",manufacturer:{name:"Brand"},supplierCodes:[{supplier:{name:"Supplier"},code:""}],active:"act?"}},toggleSearchPanel:function(e){var t={};return t.me=this,$(e).toggle(),t.me.deSelectProduct(),t.me},_loadManufactures:function(e){this.manufactures=e;var t={};return t.me=this,t.selectionBox=$(t.me.searchDivId).down('[search_field="pro.manufacturerIds"]'),t.me.manufactures.each(function(e){t.selectionBox.insert({bottom:new Element("option",{value:e.id}).update(e.name)})}),this},_loadProductStatuses:function(e){this.productStatuses=e;var t={};return t.me=this,t.selectionBox=$(t.me.searchDivId).down('[search_field="pro.productStatusIds"]'),t.me.productStatuses.each(function(e){t.selectionBox.insert({bottom:new Element("option",{value:e.id}).update(e.name)})}),this},_loadSuppliers:function(e){this.suppliers=e;var t={};return t.me=this,t.selectionBox=$(t.me.searchDivId).down('[search_field="pro.supplierIds"]'),t.me.suppliers.each(function(e){t.selectionBox.insert({bottom:new Element("option",{value:e.id}).update(e.name)})}),this},_loadCategories:function(e){this.categories=e;var t={};return t.me=this,t.selectionBox=$(t.me.searchDivId).down('[search_field="pro.productCategoryIds"]'),t.me.categories.sort(function(e,t){return e.namePath>t.namePath}).each(function(e){t.selectionBox.insert({bottom:new Element("option",{value:e.id}).update(e.namePath)})}),this},_loadChosen:function(){return jQuery(".chosen").chosen({search_contains:!0,inherit_select_classes:!0,no_results_text:"Oops, nothing found!",width:"95%"}),this},_bindSearchKey:function(){var e={};return e.me=this,$("searchDiv").getElementsBySelector("[search_field]").each(function(t){t.observe("keydown",function(t){e.me.keydown(t,function(){$(e.me.searchDivId).down("#searchBtn").click()})})}),this},_getSupplierCodes:function(e,t){var n={};return n.me=this,n.supplierCodeString=[],e.each(function(e){n.supplierCodeString.push(t===!0?"Supplier":'<abbr title="Code: '+e.code+'">'+e.supplier.name+"</abbr>")}),n.supplierCodeString.join(", ")},_displayPriceMatchResult:function(e){var t={};return t.me=this,t.minPrice=0,t.tbody=new Element("tbody"),$H(e.companyPrices).each(function(e){0!==parseInt(e.value.price)&&parseFloat(e.value.price)<parseFloat(t.minPrice)&&(t.minPrice=e.value.price),t.tbody.insert({bottom:new Element("tr").insert({bottom:new Element("td",{colspan:3}).update(e.key)}).insert({bottom:new Element("td").update(e.value.priceURL&&!e.value.priceURL.blank()?new Element("a",{href:e.value.priceURL,target:"__blank"}).update(t.me.getCurrency(e.value.price)):t.me.getCurrency(e.value.price))})})}),t.priceDiff=parseFloat(e.myPrice)-parseFloat(t.minPrice),t.priceDiffClass="",0!==parseInt(t.minPrice)&&(parseInt(t.priceDiff)>0?t.priceDiffClass="label label-danger":parseInt(t.priceDiff)<0&&(t.priceDiffClass="label label-success")),t.newDiv=new Element("table",{"class":"table table-striped table-hover price-match-listing"}).insert({bottom:new Element("thead").insert({bottom:new Element("tr").insert({bottom:new Element("th").update("SKU")}).insert({bottom:new Element("th").update("My Price")}).insert({bottom:new Element("th",{"class":"price_diff"}).update("Price Diff.")}).insert({bottom:new Element("th").update("Min Price")})})}).insert({bottom:new Element("tbody").insert({bottom:new Element("tr").insert({bottom:new Element("td").update(e.sku)}).insert({bottom:new Element("td").update(t.me.getCurrency(e.myPrice))}).insert({bottom:new Element("td",{"class":"price_diff"}).update(new Element("span",{"class":""+t.priceDiffClass}).update(t.me.getCurrency(t.priceDiff)))}).insert({bottom:new Element("td",{"class":"price_min"}).update(t.me.getCurrency(t.minPrice))})})}).insert({bottom:new Element("thead").insert({bottom:new Element("tr").insert({bottom:new Element("th",{colspan:3}).update("Company")}).insert({bottom:new Element("th").update("Price")})})}).insert({bottom:t.tbody}),t.newDiv},_getInfoPanel:function(e){var t={};return t.me=this,new Element("div",{id:"info_panel_"+e.id}).insert({bottom:new Element("div",{"class":"col-md-6"}).insert({bottom:new Element("div",{"class":"panel panel-default price-match-div"}).insert({bottom:new Element("div",{"class":"panel-heading"}).update("<strong>Price Match</strong>")}).insert({bottom:new Element("div",{"class":"panel-body price-match-listing"}).update(t.me.getLoadingImg())})})}).insert({bottom:new Element("div",{"class":"col-md-6"}).insert({bottom:new Element("div",{"class":"panel panel-default price-trend-div"}).insert({bottom:new Element("div",{"class":"panel-body"}).insert({bottom:new Element("iframe",{frameborder:"0",scrolling:"auto",width:"100%",height:"400px"})})})})}).insert({bottom:new Element("div",{"class":"col-md-6"}).insert({bottom:new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-body"}).update("<h4>Reserved for Next Phase of Developing</h4>")})})}).insert({bottom:new Element("div",{"class":"col-md-6"}).insert({bottom:new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-body"}).update("<h4>Reserved for Next Phase of Developing</h4>")})})})},_showProductInfoOnRightPanel:function(e){var t={};return t.me=this,t.infoPanel=t.me._getInfoPanel(e),t.infoPanel.down(".price-trend-div iframe").writeAttribute("src","/statics/product/pricetrend.html?productid="+e.id),t.me.postAjax(t.me.getCallbackId("priceMatching"),{id:e.id},{onLoading:function(){t.infoPanel.down(".price-match-div .price-match-listing").replace(new Element("div",{"class":"panel-body price-match-listing"}).update(t.me.getLoadingImg()))},onSuccess:function(n,i){try{if(t.result=t.me.getResp(i,!1,!0),!t.result)return;$("info_panel_"+e.id)&&$("info_panel_"+e.id).down(".price-match-div .price-match-listing").replace(t.me._displayPriceMatchResult(t.result))}catch(s){t.me.showModalBox("Error",s,!0)}}}),t.infoPanel},deSelectProduct:function(){var e={};return e.me=this,jQuery(".product_item.success",jQuery("#"+e.me.resultDivId)).removeClass("success").popover("hide"),$(e.me.resultDivId).up(".list-panel").removeClassName("col-xs-4").addClassName("col-xs-12"),jQuery(".product_name",jQuery("#"+e.me.resultDivId)).show(),jQuery(".btns",jQuery("#"+e.me.resultDivId)).show(),e.me._showRightPanel=!1,e.me},_displaySelectedProduct:function(e){var t={};return t.me=this,$(t.me.resultDivId).up(".list-panel").removeClassName("col-xs-12").addClassName("col-xs-4"),jQuery(".product_name",jQuery("#"+t.me.resultDivId)).hide(),jQuery(".btns",jQuery("#"+t.me.resultDivId)).hide(),t.me._showRightPanel=!0,jQuery(".product_item.success",jQuery("#"+t.me.resultDivId)).removeClass("success").popover("hide"),t.selectedRow=jQuery('[product_id="'+e.id+'"]',jQuery("#"+t.me.resultDivId)).addClass("success"),t.selectedRow.hasClass("popover-loaded")||t.selectedRow.popover({title:'<div class="row"><div class="col-xs-10">Details for: '+e.sku+'</div><div class="col-xs-2"><span class="btn btn-danger pull-right btn-sm" onclick="pageJs.deSelectProduct();"><span class="glyphicon glyphicon-remove"></span></span></div></div>',html:!0,placement:"right",container:"body",trigger:"manual",viewport:{selector:".list-panel",padding:0},content:function(){return t.me._showProductInfoOnRightPanel(e).wrap(new Element("div")).innerHTML},template:'<div class="popover" role="tooltip" style="max-width: none; z-index: 0;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}).addClass("popover-loaded"),t.selectedRow.popover("toggle"),t.me},_openProductDetails:function(e){var t={};t.newWindow=window.open("/product/"+e.id+".html","Product Details for: "+e.sku,"location=no, menubar=no, status=no, titlebar=no, fullscreen=yes, toolbar=no"),t.newWindow.focus()},_getResultRow:function(e,t){var n={};return n.me=this,n.tag=n.isTitle===!0?"th":"td",n.isTitle=t||!1,n.row=new Element("tr",{"class":"visible-xs visible-md visible-lg visible-sm "+(n.isTitle===!0?"":"product_item"),product_id:e.id}).store("data",e).insert({bottom:new Element(n.tag,{"class":"sku",title:e.name}).insert({bottom:new Element("span",{style:"margin: 0 5px 0 0;"}).insert({bottom:new Element("input",{type:"checkbox","class":"product-selected"}).observe("click",function(){n.checked=this.checked,n.isTitle===!0&&$(n.me.resultDivId).getElementsBySelector(".product_item .product-selected").each(function(e){e.checked=n.checked})})})}).insert({bottom:n.isTitle===!0?e.sku:new Element("a",{href:"javascript: void(0);","class":"sku-link"}).update(e.sku)})}).insert({bottom:new Element(n.tag,{"class":"product_name hidden-xs hidden-sm",style:n.me._showRightPanel?"display: none":""}).update(e.name)}).insert({bottom:new Element(n.tag,{"class":"manufacturer col-xs-2"}).update(e.manufacturer?e.manufacturer.name:"")}).insert({bottom:new Element(n.tag,{"class":"supplier col-xs-2"}).update(e.supplierCodes?n.me._getSupplierCodes(e.supplierCodes,t):"")}).insert({bottom:new Element(n.tag,{"class":"product_active col-xs-1"}).insert({bottom:n.isTitle===!0?e.active:new Element("input",{type:"checkbox",disabled:!0,checked:e.active})})}).insert({bottom:n.isTitle===!0?"":new Element(n.tag,{"class":"btns hidden-xs hidden-sm",style:n.me._showRightPanel?"display: none":""}).insert({bottom:new Element("span",{"class":"btn btn-primary btn-xs"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-pencil"})})}).observe("click",function(){n.me._openProductDetails(e)})}),n.isTitle===!1&&n.row.down(".sku-link").observe("click",function(){n.me._displaySelectedProduct(e)}).observe("dblclick",function(){n.me._openProductDetails(e)}),n.row}});