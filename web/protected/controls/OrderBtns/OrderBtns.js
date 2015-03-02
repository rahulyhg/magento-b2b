var OrderBtnsJs=new Class.create;OrderBtnsJs.prototype={SEND_EMAIL_CALLBACK_ID:"",_pageJs:null,initialize:function(e,t){this._pageJs=e,this._order=t},openOrderPrintPage:function(e){var t={};return t.me=this,t.pdf=e||0,t.newWindow=window.open("/print/order/"+t.me._order.id+".html?pdf="+parseInt(t.pdf),t.me._order.status.name+" Order "+t.me._order.orderNo,"width=1300, location=no, scrollbars=yes, menubar=no, status=no, titlebar=no, fullscreen=no, toolbar=no"),t.newWindow.onload=function(){t.newWindow.document.title=t.me._order.status.name+" Order "+t.me._order.orderNo,t.newWindow.focus(),t.newWindow.print(),t.newWindow.close()},t.me},openDocketPrintPage:function(e){var t={};return t.me=this,t.pdf=e||0,t.newWindow=window.open("/printdocket/order/"+t.me._order.id+".html?pdf="+parseInt(t.pdf),t.me._order.status.name+" Order "+t.me._order.orderNo,"width=1300, location=no, scrollbars=yes, menubar=no, status=no, titlebar=no, fullscreen=no, toolbar=no"),t.newWindow.onload=function(){t.newWindow.document.title=t.me._order.status.name+" Order "+t.me._order.orderNo,t.newWindow.focus(),t.newWindow.print(),t.newWindow.close()},t.me},_sendEmail:function(e){var t={};return t.me=this,t.confirmDiv=$(e).up(".confirm-div"),t.confirmDiv.getElementsBySelector(".msg").each(function(e){e.remove()}),t.data=t.me._pageJs._collectFormData(t.confirmDiv,"confirm-email"),null!==t.data?(t.data.orderId=t.me._order.id,t.me._pageJs.postAjax(OrderBtnsJs.SEND_EMAIL_CALLBACK_ID,t.data,{onLoading:function(){t.me._signRandID(e),jQuery("#"+e.id).button("loading")},onSuccess:function(e,n){try{if(t.result=t.me._pageJs.getResp(n,!1,!0),!t.result||!t.result.item)return;t.confirmDiv.update('<h4 class="text-success">Email Successfully added into the Message Queue. Will be sent within a minute</h4>'),setTimeout(function(){t.me._pageJs.hideModalBox()},2e3)}catch(o){t.confirmDiv.insert({top:new Element("h4",{"class":"msg"}).update(new Element("span",{"class":"label label-danger"}).update(o))})}},onComplete:function(){jQuery("#"+e.id).button("reset")}}),t.me):void 0},_getFormGroup:function(e,t){return new Element("div",{"class":"form-group"}).insert({bottom:new Element("label",{"class":"control-label"}).update(e)}).insert({bottom:t.addClassName("form-control")})},_showEmailPanel:function(){var e={};return e.me=this,e.newDiv=new Element("div",{"class":"confirm-div"}).insert({bottom:new Element("div").insert({bottom:e.me._getFormGroup("Do you want to send an email to this address:",new Element("input",{value:e.me._order.customer.email,"confirm-email":"emailAddress",required:!0,placeholder:"The email to send to. WIll NOT update the customer's email with this."}))})}).insert({bottom:new Element("div").insert({bottom:new Element("em").insert({bottom:new Element("small").update("The above email will be used to send the email to. WIll NOT update the customer's email with this.")})})}).insert({bottom:new Element("div").insert({bottom:e.me._getFormGroup("Something you want to say:",new Element("textarea",{"confirm-email":"emailBody"}))})}).insert({bottom:new Element("div",{"class":"text-right"}).insert({bottom:new Element("span",{"class":"btn btn-default pull-left"}).update("CANCEL").observe("click",function(){e.me._pageJs.hideModalBox()})}).insert({bottom:new Element("span",{"class":"btn btn-primary","data-loading-text":"Sending ..."}).update("Yes, send this "+e.me._order.type+" to this email address").observe("click",function(){e.me._sendEmail(this)})})}),e.me._pageJs.showModalBox("<strong>Confirm Email Address:</strong>",e.newDiv),e.me},getBtnsDiv:function(){var e={};return e.me=this,e.newDiv=new Element("div",{"class":"order-btns-div"}).insert({bottom:new Element("div",{"class":"btn-group btn-group-xs visible-xs visible-md visible-sm visible-lg"}).insert({bottom:new Element("span",{"class":"btn btn-info"}).insert({bottom:new Element("span",{"class":"hidden-xs hidden-sm"}).update("Print ")}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-print"})}).observe("click",function(){e.me.openOrderPrintPage(1)})}).insert({bottom:new Element("span",{"class":"btn btn-info dropdown-toggle","data-toggle":"dropdown","aria-expanded":"false"}).insert({bottom:new Element("span",{"class":"caret"})})}).insert({bottom:new Element("ul",{"class":"dropdown-menu",role:"menu"}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("span").update("Print PDF ")}).insert({bottom:new Element("span",{"class":"fa fa-file-pdf-o"})}).observe("click",function(){e.me.openOrderPrintPage(1)})})}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("span").update("Print HTML")}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-print"})}).observe("click",function(){e.me.openOrderPrintPage(0)})})}).insert({bottom:new Element("li",{"class":"divider"})}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("span").update("Print Delivery Docket ")}).insert({bottom:new Element("span",{"class":"fa fa-file-pdf-o"})}).observe("click",function(){e.me.openDocketPrintPage(1)})})}).insert({bottom:new Element("li").insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("span").update("Print Delivery Docket ")}).insert({bottom:new Element("span",{"class":"fa fa-ils"})}).observe("click",function(){e.me.openDocketPrintPage(0)})})})})}).insert({bottom:new Element("div",{"class":"btn-group btn-group-xs visible-xs visible-md visible-sm visible-lg"}).setStyle("margin-left: 3px;").insert({bottom:new Element("span",{"class":"btn btn-primary"}).insert({bottom:new Element("span",{"class":"hidden-xs hidden-sm"}).update("Email ")}).insert({bottom:new Element("span",{"class":"fa fa-envelope"})}).observe("click",function(){e.me._showEmailPanel(this)})})}).insert({bottom:new Element("div",{"class":"btn-group btn-group-xs visible-xs visible-md visible-sm visible-lg"}).setStyle("margin-left: 3px;").insert({bottom:new Element("a",{"class":"btn btn-warning",href:"/order/new.html?cloneorderid="+e.me._order.id,target:"_BLANK"}).update("Clone")})}),e.newDiv}};