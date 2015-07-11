var PageJs=new Class.create;
PageJs.prototype=Object.extend(new CRUDPageJs,{manufactures:[],suppliers:[],productCategories:[],productStatuses:[],_showRightPanel:!1,_nextPageColSpan:9,_autoLoading:!1,_postIndex:null,_selected:null,_priceMatchRule:null,newRuleResultContainerId:"new_rule_result_container",_getTitleRowData:function(){return{sku:"SKU",name:"Product Name",locations:"Locations",invenAccNo:"AccNo.",manufacturer:{name:"Brand"},supplierCodes:[{supplier:{name:"Supplier"},code:""}],active:"act?",stockOnOrder:"OnOrder",stockOnHand:"OnHand",
stockOnPO:"OnPO"}},toggleSearchPanel:function(b){$(b).toggle();this.deSelectProduct();return this},_loadManufactures:function(b){this.manufactures=b;var c;c=$(this.searchDivId).down('[search_field="pro.manufacturerIds"]');this.manufactures.each(function(a){c.insert({bottom:(new Element("option",{value:a.id})).update(a.name)})});return this},_loadProductStatuses:function(b){this.productStatuses=b;var c;c=$(this.searchDivId).down('[search_field="pro.productStatusIds"]');this.productStatuses.each(function(a){c.insert({bottom:(new Element("option",
{value:a.id})).update(a.name)})});return this},_loadSuppliers:function(b){this.suppliers=b;var c;c=$(this.searchDivId).down('[search_field="pro.supplierIds"]');this.suppliers.each(function(a){c.insert({bottom:(new Element("option",{value:a.id})).update(a.name)})});return this},_loadCategories:function(b){this.categories=b;var c;c=$(this.searchDivId).down('[search_field="pro.productCategoryIds"]');this.categories.sort(function(a,b){return a.namePath>b.namePath}).each(function(a){c.insert({bottom:(new Element("option",
{value:a.id})).update(a.namePath)})});return this},_loadChosen:function(){jQuery(".chosen").select2({minimumResultsForSearch:Infinity});return this},_getSelection:function(){var b,c,a;b=[];$("item-list").getElementsBySelector(".product_item.item_row").each(function(e){c=e.down('input.product-selected[type="checkbox"]').checked;a=e.readAttribute("product_id");!0===c&&!0===jQuery.isNumeric(a)&&b.push(e.retrieve("data"))});$("total-selected-count").update(b.length);return b},_bindSearchKey:function(){var b;
b=this;$$("#searchBtn").first().observe("click",function(c){$$("#showSearch").first().checked?(b.deSelectProduct(),b.getSearchCriteria().getResults(!0,b._pagination.pageSize)):$$("#showSearch").first().click()});$("searchDiv").getElementsBySelector("[search_field]").each(function(c){c.observe("keydown",function(a){b.keydown(a,function(){$(b.searchDivId).down("#searchBtn").click()})})});return this},_getSupplierCodes:function(b,c){var a;a=[];b.each(function(b){a.push(!0===c?"Supplier":'<abbr title="Code: '+
b.code+'">'+(b.supplier&&b.supplier.name?b.supplier.name:"")+"</abbr>")});return a.join(", ")},postNewRule:function(b,c){var a,e,d,f,g;a=this;e=b||null;d=c||!1;null!==e&&a._signRandID(e);a._priceMatchRule.price_from=a.getValueFromCurrency(a._priceMatchRule.price_from);a._priceMatchRule.price_to=a.getValueFromCurrency(a._priceMatchRule.price_to);a._priceMatchRule.offset=a.getValueFromCurrency(a._priceMatchRule.offset);a._priceMatchRule.active=!0===d?!1:!0;a._selected[a._postIndex]?(window.onbeforeunload=
function(){return"Processing... Please Do not close"},(f=$(a.modalId))&&f.down(".modal-header").update('<h4 style="color:red;">Processing... Please Do NOT close</h4>'),a.postAjax(a.getCallbackId("newRule"),{productId:a._selected[a._postIndex].id,rule:a._priceMatchRule},{onLoading:function(){null!==e&&jQuery(".right-panel.btn").button("loading")},onSuccess:function(b,c){try{(g=a.getResp(c,!1,!0))&&$(a.newRuleResultContainerId).insert({bottom:(new Element("d",{"class":"col-xs-9"})).update(a._selected[a._postIndex].sku)}).insert({bottom:(new Element("div",
{"class":"col-xs-3"})).update("done")})}catch(e){$(a.newRuleResultContainerId).insert({top:a.getAlertBox("",e).addClassName("alert-danger col-xs-12").insert({top:(new Element("b",{"class":"col-xs-12"})).update("SKU: "+a._selected[a._postIndex].sku)})})}},onComplete:function(){window.onbeforeunload=null;null!==e&&jQuery(".right-panel.btn").button("reset");a._postIndex+=1;a.postNewRule(e,d)}})):($(a.newRuleResultContainerId).insert({top:(new Element("div",{"class":"col-xs-12"})).update("All Done!")}),
a.hideModalBox(),jQuery("#"+a.modalId).remove(),$("searchBtn").click())},_bindNewRuleBtn:function(b,c){var a,e,d,f,g,k;a=this;e=c||null;d=b||$("newPriceMatchRuleBtn");a.observeClickNDbClick(d,function(){f=a._getSelection();g=$("total-found-count").innerHTML;null===e&&null!==f&&0<f.length?(k=(new Element("div")).insert({bottom:(new Element("h3",{"class":"col-lg-12"})).update("only <b>"+f.length+"</b> out of <b>"+g+"</b> is selected, Contrinue?")}).insert({bottom:(new Element("i",{"class":"btn btn-danger btn-lg"})).update("No").observe("click",
function(){a.hideModalBox()})}).insert({bottom:(new Element("i",{"class":"btn btn-success btn-lg pull-right"})).update("Yes").setStyle(0===f.length?"display: none;":"").observe("click",function(){jQuery("#select2-drop-mask").select2("close");$(this).up(".modal-body").update("").insert({bottom:a._getPriceMatchRuleEl(null,f)}).insert({bottom:new Element("div",{"class":"row",id:a.newRuleResultContainerId})});a._getPriceMatchCompanySelect2(jQuery('[match_rule="company_id"]'),!0)})}),a.showModalBox("Warning",
k,!1,null,null,!0)):e&&jQuery.isNumeric(e.id)},null);return a},_getPriceMatchCompanySelect2:function(b,c,a){var e,d;e=this;c=c||null;a=a||null;b=jQuery(b).select2({ajax:{delay:250,url:"/ajax/getAll",type:"POST",data:function(a){return{searchTxt:"companyName like ?",searchParams:["%"+a+"%"],entityName:"PriceMatchCompany"}},results:function(a,b,c){d=[];a.resultData&&a.resultData.items&&a.resultData.items.each(function(a){!1===e._checkUniquePriceMatchCompanies(d,a)&&d.push({id:a.id,text:a.companyName,
data:a})});return{results:d}}},cache:!0,escapeMarkup:function(a){return a}});!0===c&&b.select2("open");null!==a&&a.priceMatchRule&&a.priceMatchRule.id&&a.priceMatchRule.priceMatchCompany&&a.priceMatchRule.priceMatchCompany.id&&b.select2("data",{id:a.priceMatchRule.priceMatchCompany.id,text:a.priceMatchRule.priceMatchCompany.companyName,data:a.priceMatchRule.priceMatchCompany});return b},_checkUniquePriceMatchCompanies:function(b,c){var a;a=!1;b.each(function(b){!1===a&&b.text===c.companyName&&(a=
!0)});return a},_getLocations:function(b,c){var a;if(!0===c)return"Locations";a=[];b.each(function(b){a.push('<div><small><strong class="hidden-xs hide-when-info hidden-sm">'+b.type.name+': </strong><abbr title="Type: '+b.type.name+'">'+b.value+"</abbr></small></div>")});return a.join("")},_displayPriceMatchResult:function(b,c){var a,e,d,f,g;a=this;e=0;d=new Element("tbody");$H(b.companyPrices).each(function(b){0!==parseInt(b.value.price)&&(0===parseInt(e)&&0<parseFloat(b.value.price)||parseFloat(b.value.price)<
parseFloat(e))&&(e=b.value.price);d.insert({bottom:(new Element("tr")).insert({bottom:(new Element("td",{colspan:3})).update(b.key).addClassName(c.priceMatchRule&&b.key===c.priceMatchRule.priceMatchCompany.companyName?"success":"")}).insert({bottom:(new Element("td")).update(b.value.priceURL&&!b.value.priceURL.blank()?(new Element("a",{href:b.value.priceURL,target:"__blank"})).update(a.getCurrency(b.value.price)):a.getCurrency(b.value.price))})})});f=parseFloat(b.myPrice)-parseFloat(e);g="";0!==parseInt(e)&&
(0<parseInt(f)?g="label label-danger":0>parseInt(f)&&(g="label label-success"));return(new Element("table",{"class":"table table-striped table-hover price-match-listing"})).insert({bottom:(new Element("thead")).insert({bottom:(new Element("tr")).insert({bottom:(new Element("th")).update("SKU")}).insert({bottom:(new Element("th")).update("My Price")}).insert({bottom:(new Element("th",{"class":"price_diff"})).update("Price Diff.")}).insert({bottom:(new Element("th")).update("Min Price")})})}).insert({bottom:(new Element("tbody")).insert({bottom:(new Element("tr")).insert({bottom:(new Element("td")).update(b.sku)}).insert({bottom:(new Element("td")).update(new Element("input",
{"class":"click-to-edit price-input",value:a.getCurrency(b.myPrice),"product-id":c.id}))}).insert({bottom:(new Element("td",{"class":"price_diff"})).update((new Element("span",{"class":""+g})).update(a.getCurrency(f)))}).insert({bottom:(new Element("td",{"class":"price_min"})).update(a.getCurrency(e))})})}).insert({bottom:(new Element("thead")).insert({bottom:(new Element("tr")).insert({bottom:(new Element("th",{colspan:3})).update("Company")}).insert({bottom:(new Element("th")).update("Price")})})}).insert({bottom:d})},
_getInfoPanel:function(b){return(new Element("div",{id:"info_panel_"+b.id})).insert({bottom:(new Element("div",{"class":"col-md-6"})).insert({bottom:(new Element("div",{"class":"panel panel-default price-match-div"})).insert({bottom:(new Element("div",{"class":"panel-heading"})).update("<strong>Price Match</strong>")}).insert({bottom:(new Element("div",{"class":"panel-body price-match-listing"})).update(this.getLoadingImg())})})}).insert({bottom:(new Element("div",{"class":"col-md-6"})).insert({bottom:(new Element("div",
{"class":"panel panel-default price-trend-div"})).insert({bottom:(new Element("div",{"class":"panel-body"})).insert({bottom:new Element("iframe",{frameborder:"0",scrolling:"auto",width:"100%",height:"400px"})})})})}).insert({bottom:(new Element("div",{"class":"col-md-6"})).insert({bottom:(new Element("div",{"class":"panel panel-default"})).insert({bottom:(new Element("div",{"class":"panel-body"})).update("<h4>Reserved for Next Phase of Developing</h4>")})})}).insert({bottom:(new Element("div",{"class":"col-md-6"})).insert({bottom:(new Element("div",
{"class":"panel panel-default"})).insert({bottom:(new Element("div",{"class":"panel-heading"})).update("<strong>Price Match Rule</strong>")}).insert({bottom:(new Element("div",{"class":"panel-body"})).update(this._getPriceMatchRuleEl(b))})})})},_getPriceMatchRuleEl:function(b,c){var a,e,d,f;a=this;e=b||null;d=c||null;return(new Element("div",{"class":""})).insert({bottom:(new Element("div",{"class":"col-xs-12"})).insert({bottom:(new Element("div",{"class":"form-group form-group-sm input-group"})).insert({bottom:(new Element("label",
{"class":"contorl-label input-group-addon"})).update("Target Competitor")}).insert({bottom:new Element("input",{type:"text","class":"form-control input-sm rightPanel",match_rule:"company_id"})})})}).insert({bottom:(new Element("div",{"class":"col-xs-6"})).insert({bottom:(new Element("div",{"class":"form-group form-group-sm input-group"})).insert({bottom:(new Element("label",{"class":"contorl-label input-group-addon"})).update("Lower Safty Boundary")}).insert({bottom:(new Element("input",{type:"text",
"class":"form-control input-sm",match_rule:"price_from",value:e&&e.priceMatchRule?e.priceMatchRule.price_from:""})).observe("keyup",function(a){$(this).up(".modal-body").down('[match_rule="price_to"]').value=$F($(this))}).observe("keydown",function(b){f=this;a.keydown(b,function(){Event.stop(b);$(f).up(".modal-body").down('[match_rule="offset"]').focus();$(f).up(".modal-body").down('[match_rule="offset"]').select()},function(){},Event.KEY_TAB)})})})}).insert({bottom:(new Element("div",{"class":"col-xs-6"})).insert({bottom:(new Element("div",
{"class":"form-group form-group-sm input-group"})).insert({bottom:(new Element("label",{"class":"contorl-label input-group-addon"})).update("Upper Safty Boundary")}).insert({bottom:(new Element("input",{type:"text","class":"form-control input-sm",match_rule:"price_to",value:e&&e.priceMatchRule?e.priceMatchRule.price_to:""})).observe("keyup",function(a){$(this).up(".modal-body").down('[match_rule="price_from"]').value=$F($(this))})})})}).insert({bottom:(new Element("div",{"class":"col-xs-9"})).insert({bottom:(new Element("div",
{"class":"form-group form-group-sm input-group"})).insert({bottom:(new Element("label",{"class":"contorl-label input-group-addon"})).update("Extra Margin After Price Match")}).insert({bottom:new Element("input",{type:"text","class":"form-control input-sm",match_rule:"offset",value:e&&e.priceMatchRule?e.priceMatchRule.offset:""})})})}).insert({bottom:(new Element("div",{"class":"col-xs-3 text-right"})).insert({bottom:(new Element("i",{"class":"btn btn-sm btn-success btn-new-rule right-panel"})).update("Confirm").observe("click",
function(b){a._priceMatchRule=a._collectFormData($(this).up(".modal-body"),"match_rule");a._selected=null===e?d:e;a._postIndex=0;a.postNewRule($(this))})}).insert({bottom:(new Element("i",{"class":"btn btn-sm btn-danger btn-del-rule right-panel"})).update('<i class="glyphicon glyphicon-trash"></i>').observe("click",function(b){a._priceMatchRule=a._collectFormData($(this).up(".modal-body"),"match_rule");a._selected=null===e?d:e;a._postIndex=0;a.postNewRule($(this),!0)})})})},_showProductInfoOnRightPanel:function(b){var c,
a,e;c=this;a=c._getInfoPanel(b);a.down(".price-trend-div iframe").writeAttribute("src","/statics/product/pricetrend.html?productid="+b.id);c.postAjax(c.getCallbackId("priceMatching"),{id:b.id},{onLoading:function(){a.down(".price-match-div .price-match-listing").replace((new Element("div",{"class":"panel-body price-match-listing"})).update(c.getLoadingImg()))},onSuccess:function(a,f){try{if(e=c.getResp(f,!1,!0))$("info_panel_"+b.id)&&$("info_panel_"+b.id).down(".price-match-div .price-match-listing").replace(c._displayPriceMatchResult(e,
b)),c._bindPriceInput()}catch(g){c.showModalBox("Error",g,!0)}}});return a},deSelectProduct:function(){jQuery(".product_item.success",jQuery("#"+this.resultDivId)).removeClass("success").popover("hide");$(this.resultDivId).up(".list-panel").removeClassName("col-xs-4").addClassName("col-xs-12");jQuery(".hide-when-info",jQuery("#"+this.resultDivId)).show();this._showRightPanel=!1;return this},getResults:function(b,c,a,e){var d,f,g,k,l,h,m,n;d=this;f=b||!1;g=a||!1;k=e||!1;l=$(d.resultDivId);!0===f&&
(d._pagination.pageNo=1);!0===g&&0<$$(".btn-show-more").length&&(d._autoLoading=!0,d._pagination.pageNo=1*d._pagination.pageNo+1);d._pagination.pageSize=c||d._pagination.pageSize;d.postAjax(d.getCallbackId("getItems"),{pagination:d._pagination,searchCriteria:d._searchCriteria},{onLoading:function(){jQuery("#"+d.searchDivId+" .btn").button("loading");jQuery("#"+d.searchDivId+" input").prop("disabled",!0);jQuery("#"+d.searchDivId+" select").prop("disabled",!0);!0===f&&l.update((new Element("tr")).update((new Element("td")).update(d.getLoadingImg())));
$(d.totalQtyId).update(0);$(d.totalValueId).update(d.getCurrency(0))},onSuccess:function(a,b){try{if(h=d.getResp(b,!1,!0))$(d.totalNoOfItemsId).update(h.pageStats.totalRows),$(d.totalQtyId).update(h.totalStockOnHand),$(d.totalValueId).update(d.getCurrency(h.totalOnHandValue)),!0===f&&l.update(d._getResultRow(d._getTitleRowData(),!0).wrap(new Element("thead"))),l.getElementsBySelector(".paginWrapper").each(function(a){a.remove()}),(m=$(l).down("tbody"))||$(l).insert({bottom:m=new Element("tbody")}),
h.items.each(function(a){m.insert({bottom:n=d._getResultRow(a).addClassName("item_row").writeAttribute("item_id",a.id)});!0!==g&&!0!==k||n.down(".product-selected").click()}),!0!==d._singleProduct?h.pageStats.pageNumber<h.pageStats.totalPages&&l.insert({bottom:d._getNextPageBtn().addClassName("paginWrapper")}):0<h.items.size()&&d._displaySelectedProduct(h.items[0]),d._bindPriceInput(),!0===g&&0<$$(".btn-show-more").length?d.getResults(!1,d._pagination.pageSize,!0):(d._autoLoading=!1,d.hideModalBox(),
jQuery("#"+d.searchDivId+" .btn").button("reset"),jQuery("#"+d.searchDivId+" input").prop("disabled",!1),jQuery("#"+d.searchDivId+" select").prop("disabled",!1)),d._getSelection()}catch(c){l.insert({bottom:d.getAlertBox("Error",c).addClassName("alert-danger")})}},onComplete:function(){!0!==g&&(jQuery("#"+d.searchDivId+" .btn").button("reset"),jQuery("#"+d.searchDivId+" input").prop("disabled",!1),jQuery("#"+d.searchDivId+" select").prop("disabled",!1))}})},_displaySelectedProduct:function(b){var c,
a,e,d;c=this;$(c.resultDivId).up(".list-panel").removeClassName("col-xs-12").addClassName("col-xs-4");jQuery(".hide-when-info",jQuery("#"+c.resultDivId)).hide();c._showRightPanel=!0;jQuery(".product_item.success",jQuery("#"+c.resultDivId)).removeClass("success").popover("hide");a=jQuery('[product_id="'+b.id+'"]',jQuery("#"+c.resultDivId)).addClass("success");a.hasClass("popover-loaded")||a.on("shown.bs.popover",function(a){c._getPriceMatchCompanySelect2(jQuery('.rightPanel[match_rule="company_id"]'),
null,b);e=$$(".btn-new-rule.right-panel").first().up(".panel-body");$$(".btn-new-rule.right-panel").first().observe("click",function(a){c._priceMatchRule=c._collectFormData($(this).up(".panel-body"),"match_rule");c._selected=[b];c._postIndex=0;c.postNewRule($(this))});$$(".btn-del-rule.right-panel").first().observe("click",function(a){c._priceMatchRule=c._collectFormData($(this).up(".panel-body"),"match_rule");c._selected=[b];c._postIndex=0;c.postNewRule($(this),!0)});b.priceMatchRule&&b.priceMatchRule.id&&
jQuery.isNumeric(b.priceMatchRule.id)||$$(".btn-del-rule.right-panel").first().hide();e.down('[match_rule="price_from"]').observe("keyup",function(a){$(this).up(".panel-body").down('[match_rule="price_to"]').value=$F($(this))}).observe("keydown",function(a){d=this;c.keydown(a,function(){Event.stop(a);$(d).up(".panel-body").down('[match_rule="offset"]').focus();$(d).up(".panel-body").down('[match_rule="offset"]').select()},function(){},Event.KEY_TAB)})}).popover({title:'<div class="row"><div class="col-xs-10">Details for: '+
b.sku+'</div><div class="col-xs-2"><div class="btn-group pull-right"><a class="btn btn-primary btn-sm" href="/product/'+b.id+'.html" target="_BLANK"><span class="glyphicon glyphicon-pencil"></span></a><span class="btn btn-danger btn-sm" onclick="pageJs.deSelectProduct();"><span class="glyphicon glyphicon-remove"></span></span></div></div></div>',html:!0,placement:"right",container:"body",trigger:"manual",viewport:{selector:".list-panel",padding:0},content:function(){return c._showProductInfoOnRightPanel(b).wrap(new Element("div")).innerHTML},
template:'<div class="popover" role="tooltip" style="max-width: none; z-index: 0;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}).addClass("popover-loaded");a.popover("show");return c},toggleActive:function(b,c){var a,e;a=this;a.postAjax(a.getCallbackId("toggleActive"),{productId:c.id,active:b},{onSuccess:function(b,f){try{(e=a.getResp(f,!1,!0))&&e.item&&(0<$$(".product_item[product_id="+c.id+"]").size()&&$$(".product_item[product_id="+c.id+"]").first().replace(a._getResultRow(e.item,
!1)),a._bindPriceInput())}catch(g){a.showModalBox("ERROR",g,!0)}}});return a},toggleIsKit:function(b,c){var a,e,d;a=this;a.postAjax(a.getCallbackId("toggleIsKit"),{productId:c.id,isKit:b},{onSuccess:function(b,g){e=c;try{d=a.getResp(g,!1,!0);if(!d||!d.item)return;e=d.item}catch(k){a.showModalBox("ERROR",k,!0)}0<$$(".product_item[product_id="+c.id+"]").size()&&$$(".product_item[product_id="+c.id+"]").first().replace(a._getResultRow(e,!1));a._bindPriceInput()}});return a},_updatePrice:function(b,c,
a){var e,d;e=this;e.postAjax(e.getCallbackId("updatePrice"),{productId:b,newPrice:e.getValueFromCurrency(c)},{onLoading:function(){},onSuccess:function(f,g){try{(d=e.getResp(g,!1,!0))&&d.item&&d.item.id&&jQuery(".price-input[product-id="+d.item.id+"]").attr("original-price",e.getValueFromCurrency(c))}catch(k){e.showModalBox('<strong class="text-danger">Error When Update Price:</strong>',"<strong>"+k+"</strong>"),jQuery(".price-input[product-id="+b+"]").val(e.getCurrency(a))}}});return e},_updateStockLevel:function(b,
c,a,e){var d,f,g;d=this;"stockMinLevel"!==e&&"stockReorderLevel"!==e&&d.showModalBox("Error","Invalid type passin to tmp.me._updateStockLevel");d.postAjax(d.getCallbackId("updateStockLevel"),{productId:b,newValue:c,type:e},{onLoading:function(){},onSuccess:function(k,l){try{(f=d.getResp(l,!1,!0))&&f.item&&f.item.id&&(jQuery("."+e+"-input[product-id="+f.item.id+"]").attr("original-"+e,c),g=$(d.resultDivId).down(".product_item[product_id="+f.item.id+"]"))&&(g.replace(d._getResultRow(f.item,!1)),d._bindPriceInput())}catch(h){d.showModalBox('<strong class="text-danger">Error When Update '+
e+":</strong>","<strong>"+h+"</strong>"),jQuery("."+e+"-input[product-id="+b+"]").val(a)}}});return d},_bindPriceInput:function(){var b,c,a;b=this;jQuery('.price-input[product-id]:not(".price-input-binded")').click(function(){jQuery(this).attr("original-price",b.getValueFromCurrency(jQuery(this).val())).select()}).keydown(function(a){c=jQuery(this);b.keydown(a,function(){c.blur()})}).focusout(function(){a=b.getValueFromCurrency(jQuery(this).val());jQuery(this).val(b.getCurrency(a))}).change(function(){b._updatePrice(jQuery(this).attr("product-id"),
jQuery(this).val(),b.getValueFromCurrency(jQuery(this).attr("original-price")))}).addClass("price-input-binded");jQuery(".stockMinLevel-input[product-id]").not(".stockMinLevel-input-binded").click(function(){jQuery(this).attr("original-stockMinLevel",jQuery(this).val()).select()}).keydown(function(a){c=jQuery(this);b.keydown(a,function(){c.blur()})}).focusout(function(){a=jQuery(this).val();jQuery(this).val(a)}).change(function(){b._updateStockLevel(jQuery(this).attr("product-id"),jQuery(this).val(),
jQuery(this).attr("original-stockMinLevel"),"stockMinLevel")}).addClass("stockMinLevel-input-binded");jQuery(".stockReorderLevel-input[product-id]").not(".stockReorderLevel-input-binded").click(function(){jQuery(this).attr("original-stockReorderLevel",jQuery(this).val()).select()}).keydown(function(a){c=jQuery(this);b.keydown(a,function(){c.blur()})}).focusout(function(){a=jQuery(this).val();jQuery(this).val(a)}).change(function(){b._updateStockLevel(jQuery(this).attr("product-id"),jQuery(this).val(),
jQuery(this).attr("original-stockReorderLevel"),"stockReorderLevel")}).addClass("stockReorderLevel-input-binded");return b},_getNextPageBtn:function(){var b,c;b=this;c=$("total-found-count").innerHTML;return(new Element("tfoot")).insert({bottom:(new Element("tr")).insert({bottom:(new Element("td",{colspan:b._nextPageColSpan,"class":"text-center"})).insert({bottom:(new Element("span",{"class":"btn btn-primary btn-show-more","data-loading-text":"Fetching more results ..."})).update("Next Page").observe("click",
function(){b._pagination.pageNo=1*b._pagination.pageNo+1;jQuery(this).button("loading");b.getResults(!1,b._pagination.pageSize,!1,!0)})}).insert({bottom:(new Element("span",{"class":"btn btn-warning btn-show-more","data-loading-text":"Fetching more results ..."})).update("<b>Show ALL Pages</b>").setStyle("margin-left: 10px; color: black;").observe("click",function(){1E3<c?b.showModalBox("Warning","<h3>There are "+c+" products for current search conditions. <br/>Please narrow down the search"):b.getResults(!1,
b._pagination.pageSize,!0)})})})})},_getResultRow:function(b,c){var a={me:this};a.tag=!0===a.isTitle?"th":"td";a.isTitle=c||!1;a.price="";b.prices&&b.prices.each(function(b){b.type&&1===parseInt(b.type.id)&&(a.price=b.price)});a.row=(new Element("tr",{"class":"visible-xs visible-md visible-lg visible-sm "+(!0===a.isTitle?"":"product_item "+(b.stockOnHand<=b.stockMinLevel?"danger":b.stockOnHand<=b.stockReorderLevel?"warning":"")),product_id:b.id})).store("data",b).insert({bottom:(new Element(a.tag,
{"class":"sku",title:b.name})).addClassName("col-xs-1").observe("click",function(b){a.me._signRandID($(this));"INPUT"!=b.target.nodeName&&(jQuery("#"+$(this).id).find(":checkbox").prop("checked",!jQuery("#"+$(this).id).find(":checkbox").prop("checked")),!0===a.isTitle&&(a.checked=jQuery("#"+$(this).id).find(":checkbox").prop("checked"),$(a.me.resultDivId).getElementsBySelector(".product_item .product-selected").each(function(b){b.checked=a.checked})));a.me._getSelection()}).insert({bottom:(new Element("span")).setStyle("margin: 0 5px 0 0").insert({bottom:(new Element("input",
{type:"checkbox","class":"product-selected"})).observe("click",function(b){a.checked=this.checked;!0===a.isTitle&&$(a.me.resultDivId).getElementsBySelector(".product_item .product-selected").each(function(b){b.checked=a.checked});a.me._getSelection()})})}).insert({bottom:!0===a.isTitle?b.sku:(new Element("a",{href:"javascript: void(0);","class":"sku-link truncate"})).observe("click",function(c){Event.stop(c);a.me._displaySelectedProduct(b)}).update(b.sku)})}).insert({bottom:(new Element(a.tag,{"class":"product_name hidden-xs hide-when-info hidden-sm"})).addClassName("col-xs-2").setStyle(a.me._showRightPanel?
"display: none":"").update(!0===a.isTitle?(new Element("div",{"class":"row"})).insert({bottom:(new Element("div",{"class":"col-sm-10"})).update("Product Name")}).insert({bottom:(new Element("div",{"class":"col-sm-2"})).update("IsKit?")}):(new Element("div",{"class":"row"})).insert({bottom:(new Element("div",{"class":"col-sm-10"})).update(b.name)}).insert({bottom:(new Element("div",{"class":"col-sm-2"})).update((new Element("input",{type:"checkbox",checked:b.isKit})).observe("click",function(c){a.btn=
this;a.checked=$(a.btn).checked;confirm(!0===a.checked?"You are about to set this product to a KIT, which you can NOT PICK or SHIP without providing a KIT barcode.\n Continue?":"You are about to set this product to NOT a KIT, which you can PICK or SHIP without providing a KIT barcode\n Continue?")&&a.me.toggleIsKit(a.checked,b)}))}))}).insert({bottom:(new Element(a.tag,{"class":"hidden-xs hide-when-info hidden-sm row"})).addClassName("col-xs-3").setStyle(a.me._showRightPanel?"display: none":"").insert({bottom:(new Element("div",
{"class":"col-sm-3"})).update(!0===a.isTitle?"Price":(new Element("input",{"class":"click-to-edit price-input",value:a.me.getCurrency(a.price),"product-id":b.id})).setStyle("width: 100%"))}).insert({bottom:(new Element("div",{"class":"col-sm-3"})).update(!0===a.isTitle?"Match":(new Element("span")).update(b.priceMatchRule&&b.priceMatchRule.priceMatchCompany?b.priceMatchRule.priceMatchCompany.companyName:"").setStyle("width: 100%"))}).insert({bottom:(new Element("div",{"class":"col-sm-3"})).update(!0===
a.isTitle?"Min St":(new Element("input",{"class":"click-to-edit stockMinLevel-input",value:b.stockMinLevel,"product-id":b.id})).setStyle("width: 100%"))}).insert({bottom:(new Element("div",{"class":"col-sm-3"})).update(!0===a.isTitle?"Re St":(new Element("input",{"class":"click-to-edit stockReorderLevel-input",value:b.stockReorderLevel,"product-id":b.id})).setStyle("width: 100%"))})}).insert({bottom:(new Element(a.tag,{"class":"locations hide-when-info hidden-sm"})).addClassName("col-xs-1").update(b.locations?
a.me._getLocations(b.locations,c):"")}).insert({bottom:(new Element(a.tag,{"class":"inventeryCode hide-when-info"})).addClassName("col-xs-1").update(b.invenAccNo?b.invenAccNo:"")}).insert({bottom:(new Element(a.tag,{"class":"manufacturer hide-when-info"})).addClassName("col-xs-1").update(b.manufacturer?b.manufacturer.name:"")}).insert({bottom:(new Element(a.tag,{"class":"supplier hide-when-info hidden-sm"})).addClassName("col-xs-1").update(b.supplierCodes?a.me._getSupplierCodes(b.supplierCodes,c):
"")}).insert({bottom:(new Element(a.tag,{"class":"qty hidden-sm"})).addClassName("col-xs-1").update(!0===a.isTitle?(new Element("div",{"class":"row"})).insert({bottom:(new Element("div",{"class":"col-xs-4",title:"Stock on Hand"})).update("SH")}).insert({bottom:(new Element("div",{"class":"col-xs-4",title:"Average Cost"})).update("Cost")}).insert({bottom:(new Element("div",{"class":"col-xs-4 hide-when-info",title:"Stock On PO"})).update("SP")}):(new Element("div",{"class":"row"})).update((new Element("a",
{href:"/productqtylog.html?productid="+b.id,target:"_BLANK"})).insert({bottom:(new Element("div",{"class":"col-xs-4",title:"Stock on Hand"})).update(b.stockOnHand)}).insert({bottom:(new Element("div",{"class":"col-xs-4",title:"Average Cost"})).update(0!=b.totalOnHandValue&&0!=b.stockOnHand?a.me.getCurrency(b.totalOnHandValue/b.stockOnHand):"N/A")}).insert({bottom:(new Element("div",{"class":"col-xs-4 hide-when-info",title:"Stock On PO"})).update(b.stockOnPO)})))}).insert({bottom:(new Element(a.tag,
{"class":"product_active hide-when-info hidden-sm"})).addClassName("col-xs-1").insert({bottom:(new Element("div",{"class":"row"})).insert({bottom:(new Element("div",{"class":"col-xs-4 text-right"})).insert({bottom:!0===a.isTitle?"Act?":(new Element("input",{type:"checkbox",checked:b.active})).observe("click",function(c){a.btn=this;a.checked=$(a.btn).checked;confirm(!0===a.checked?"You are about to ReACTIVATE this product.\n Continue?":"You are about to deactivate this product.\n Continue?")&&a.me.toggleActive(a.checked,
b)})})}).insert({bottom:(new Element("div",{"class":"col-xs-4"})).setStyle("padding: 0px;").insert({bottom:!0===a.isTitle?"":(new Element("a",{href:"/serialnumbers.html?productid="+b.id,target:"_BLANK",title:"Serial Numbers."})).update("SN")})}).insert({bottom:(new Element("div",{"class":"col-xs-4"})).setStyle("padding: 0px;").insert({bottom:!0===a.isTitle?"":(new Element("div",{"class":""})).insert({bottom:(new Element("a",{"class":"btn btn-primary btn-xs",href:"/product/"+b.id+".html",target:"_BLANK"})).insert({bottom:new Element("span",
{"class":"glyphicon glyphicon-pencil"})})})})})})});return a.row}});