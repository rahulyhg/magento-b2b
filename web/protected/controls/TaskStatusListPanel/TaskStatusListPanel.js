var TaskStatusListPanelJs=new Class.create;TaskStatusListPanelJs.prototype=Object.extend(new BPCPageJs,{_pageJs:null,_openinFB:!0,initialize:function(e){this._pageJs=e},setOpenInFancyBox:function(e){var t={};return t.me=this,t.me._openinFB=e,t.me},_getTaskListPage:function(e){var t={};return t.me=this,t.url="/tasks.html?blanklayout="+(t.me._openinFB===!0?"1":"0")+"&nosearch=1&statusIds="+e+("Order"===t.me.entityName&&t.me.entity&&t.me.entity.id?"&orderId="+t.me.entity.id:""),t.me._openinFB!==!0?(window.location=t.url,t.me):(jQuery.fancybox({width:"95%",height:"95%",autoScale:!1,autoDimensions:!1,fitToView:!1,autoSize:!1,type:"iframe",href:t.url,beforeClose:function(){t.me.render()}}),t.me)},_getTaskDetailsPage:function(e){var t={};return t.me=this,t.rowId=e&&e.id?e.id:"new",t.url="/task/"+t.rowId+".html?blanklayout="+(t.me._openinFB===!0?"1":"0"),"new"===t.rowId&&(t.url=t.url+(t.me.entity&&t.me.entity.customer&&t.me.entity.customer.id?"&customerId="+t.me.entity.customer.id:""),"Order"===t.me.entityName&&t.me.entity&&t.me.entity.id&&(t.url=t.url+("&orderId="+t.me.entity.id))),t.me._openinFB!==!0?(window.location=t.url,t.me):(jQuery.fancybox({width:"95%",height:"95%",autoScale:!1,autoDimensions:!1,fitToView:!1,autoSize:!1,type:"iframe",href:t.url,beforeClose:function(){t.me.render()}}),t.me)},_getListDiv:function(){var e={};return e.me=this,e.newDiv=new Element("div",{"class":"TaskStatusListPanel alert alert-info"}).setStyle("padding: 8px;").store("data",{entity:e.me.entity,entityName:e.me.entityName}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-2"}).setStyle("cursor: pointer").insert({bottom:new Element("span",{"class":"text-success"}).insert({bottom:new Element("i",{"class":"glyphicon glyphicon-plus-sign"})})}).insert({bottom:" <strong>Tasks:</strong>"}).observe("click",function(){e.me._getTaskDetailsPage()})}).insert({bottom:new Element("div",{"class":"col-sm-10 task-list-wrapper"}).update(new Element("small").update(e.me._pageJs.getLoadingImg().removeClassName("fa-5x")))})}),e.me._pageJs._signRandID(e.newDiv),e.me._divId=e.newDiv.id,e.newDiv},getDiv:function(e,t){var i={};return i.me=this,i.me.entityName=e,i.me.entity=t,i.me._getListDiv()},_formatResult:function(e){var t={};return t.me=this,t.me._divId&&$(t.me._divId)&&e&&e.resultData&&e.resultData.items?(t.listMap={},t.listMapKeys=[],e.resultData.items.each(function(e){t.listMap[e.status.id]||(t.listMapKeys.push(e.status.id),t.listMap[e.status.id]={status:e.status,items:[]}),t.listMap[e.status.id].items.push(e)}),t.list=new Element("div",{"class":"list-inline order_item item_row"}),t.listMapKeys.each(function(e){t.list.insert({bottom:new Element("li",{order_status:t.listMap[e].status.name}).setStyle("padding: 0 4px; margin: 0 10px; cursor: pointer;").insert({bottom:new Element("small").update(t.listMap[e].status.name+": ")}).insert({bottom:new Element("strong").update(t.listMap[e].items.size())}).observe("click",function(){t.listMap[e].items&&1===t.listMap[e].items.size()?t.me._getTaskDetailsPage(t.listMap[e].items[0]):t.me._getTaskListPage(t.listMap[e].status.id)})})}),$(t.me._divId).down(".task-list-wrapper").update(t.list),t.me):t.me},render:function(){var e={};return e.me=this,jQuery.getJSON("/ajax/getAll",{entityName:"Task",searchTxt:"fromEntityName = ? and fromEntityId = ?",searchParams:[e.me.entityName,e.me.entity.id]},function(t){e.me._formatResult(t)}),e.me}});