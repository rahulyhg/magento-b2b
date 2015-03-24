var PageJs=new Class.create;PageJs.prototype=Object.extend(new CRUDPageJs,{_getTitleRowData:function(){return{stockOnHand:"Stock on Hand",stockOnHandVar:"stockOnHandVar",totalOnHandValue:"Total On Hand Value",totalOnHandValueVar:"totalOnHandValueVar",totalInPartsValue:"Total In PartsValue",totalInPartsValueVar:"totalInPartsValueVar",stockOnOrder:"Stock On Order",stockOnOrderVar:"stockOnOrderVar",stockOnPO:"Stock On PO",stockOnPOVar:"stockOnPOVar",stockInParts:"Stock In Parts",stockInPartsVar:"stockInPartsVar",stockInRMA:"Stock In RMA",stockInRMAVar:"stockInRMAVar",comments:"Comments",type:"Type",created:"Date",totalRMAValue:"Total RMA Value",product:{name:"Product",sku:"sku"}}},setPreData:function(e,t,n){var r={};return r.me=this,r.from=e||!1,r.to=t||!1,r.productId=n||!1,r.from!==!1&&($("searchDiv").down('[search_field="pql.createdDate_from"]').value=r.from.replace(/["']/g,"")),r.to!==!1&&($("searchDiv").down('[search_field="pql.createdDate_to"]').value=r.to.replace(/["']/g,"")),r.productId!==!1&&($("searchDiv").down('[search_field="pql.product"]').value=r.productId.replace(/["']/g,""),$$("#showSearch").first().checked&&$$("#showSearch").first().click()),(r.from||r.to||r.productId)&&$("searchPanel").down("#searchBtn").click(),r.me},_bindSearchKey:function(){var e={};return e.me=this,$$("#searchBtn").first().observe("click",function(){e.me.getSearchCriteria().getResults(!0,e.me._pagination.pageSize)}),$("searchDiv").getElementsBySelector("[search_field]").each(function(t){t.observe("keydown",function(t){e.me.keydown(t,function(){$("searchPanel").down("#searchBtn").click()})})}),this},_getEditPanel:function(e){var t={};return t.me=this,t.newDiv=new Element("tr",{"class":"save-item-panel info"}).store("data",e).insert({bottom:new Element("input",{type:"hidden","save-item-panel":"id",value:e.id?e.id:""})}).insert({bottom:new Element("td",{"class":"form-group"}).insert({bottom:new Element("input",{required:!0,"class":"form-control",placeholder:"The name of the Prefer Location Type","save-item-panel":"name",value:e.name?e.name:""})})}).insert({bottom:new Element("td",{"class":"form-group"}).insert({bottom:new Element("input",{"class":"form-control",placeholder:"Optional - The description of the Prefer Location Type","save-item-panel":"description",value:e.description?e.description:""})})}).insert({bottom:new Element("td",{"class":"text-right"}).insert({bottom:new Element("span",{"class":"btn-group btn-group-sm"}).insert({bottom:new Element("span",{"class":"btn btn-success",title:"Save"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-ok"})}).observe("click",function(){t.btn=this,t.me._saveItem(t.btn,$(t.btn).up(".save-item-panel"),"save-item-panel")})}).insert({bottom:new Element("span",{"class":"btn btn-danger",title:"Delete"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-remove"})}).observe("click",function(){e.id?$(this).up(".save-item-panel").replace(t.me._getResultRow(e).addClassName("item_row").writeAttribute("item_id",e.id)):$(this).up(".save-item-panel").remove()})})})}),t.newDiv},getTypeName:function(e){switch(e){case"P":return"Purchase";case"S":return"Sales Order";case"AD":return"Stock Adjustment";case"SI":return"Internal Stock movement";case"Type":return e;default:return"Invalid type!"}},_loadDataPicker:function(){return $$(".datepicker").each(function(e){new Prado.WebUI.TDatePicker({ID:e,InputMode:"TextBox",Format:"yyyy-MM-dd 00:00:00",FirstDayOfWeek:1,CalendarStyle:"default",FromYear:2009,UpToYear:2024,PositionMode:"Bottom",ClassName:"datepicker-layer-fixer"})}),this},getNumber:function(e){var t={};return t.me=this,t.theNumber=t.me.getValueFromCurrency(e),t.theNumber>0?"+"+t.theNumber:t.theNumber.toString()},_getResultRow:function(e,t){var n={};return n.me=this,n.tag=e.id?"td":"th",n.isTitle=t||!1,console.debug(e),n.link="",e.order&&e.order.id?n.link=new Element("a",{href:"/orderdetails/"+e.order.id+".html",target:"_BLANK"}).update(e.order.orderNo):e.purchaseOrder&&e.purchaseOrder.id&&(n.link=new Element("a",{href:"/purchase/"+e.purchaseOrder.id+".html",target:"_BLANK"}).update(e.purchaseOrder.purchaseOrderNo)),n.row=new Element("tr",{"class":n.isTitle===!0?"":"btn-hide-row"}).store("data",e).insert({bottom:new Element(n.tag,{"class":"col-xs-1"}).update(n.isTitle===!0?e.created:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-3"}).insert({bottom:new Element("abbr",{title:n.me.getTypeName(e.type)}).update(e.type)})}).insert({bottom:new Element("div",{"class":"col-xs-9"}).insert({bottom:new Element("small").update(moment(n.me.loadUTCTime(e.created)).format("DD/MMM/YY h:mm a"))})}))}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Product":new Element("a",{href:"/product/"+e.product.id+".html",target:"_BLANK"}).update(e.product.name))}).insert({bottom:new Element(n.tag,{"class":"col-xs-6"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-xs-1"}).update(n.isTitle?e.stockOnPO:e.stockOnPO+"("+n.me.getNumber(e.stockOnPOVar)+")")}).insert({bottom:new Element("div",{"class":"col-xs-1"}).update(n.isTitle?e.stockOnHand:e.stockOnHand+"("+n.me.getNumber(e.stockOnHandVar)+")")}).insert({bottom:new Element("div",{"class":"col-xs-3"}).update(n.isTitle?e.totalOnHandValue:n.me.getCurrency(e.totalOnHandValue)+"("+n.me.getNumber(n.me.getCurrency(e.totalOnHandValueVar))+")")}).insert({bottom:new Element("div",{"class":"col-xs-1"}).update(n.isTitle?e.stockOnOrder:e.stockOnOrder+"("+n.me.getNumber(e.stockOnOrderVar)+")")}).insert({bottom:new Element("div",{"class":"col-xs-1"}).update(n.isTitle?e.stockInParts:e.stockInParts+"("+n.me.getNumber(e.stockInPartsVar)+")")}).insert({bottom:new Element("div",{"class":"col-xs-2"}).update(n.isTitle?e.totalInPartsValue:n.me.getCurrency(e.totalInPartsValue)+"("+n.me.getNumber(n.me.getCurrency(e.totalInPartsValueVar))+")")}).insert({bottom:new Element("div",{"class":"col-xs-1"}).update(n.isTitle?e.stockInRMA:e.stockInRMA+"("+n.me.getNumber(e.stockInRMAVar)+")")}).insert({bottom:new Element("div",{"class":"col-xs-2"}).update(n.isTitle?e.totalRMAValue:n.me.getCurrency(e.totalRMAValue)+"("+n.me.getNumber(n.me.getCurrency(e.totalRMAValueVar))+")")})})}).insert({bottom:new Element(n.tag,{"class":"col-xs-2"}).update(e.comments+" ").insert({bottom:n.link})}),n.row}});