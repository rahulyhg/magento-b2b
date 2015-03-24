var PaymentListPanelJs=new Class.create;PaymentListPanelJs.prototype={_pageJs:null,_order:null,_creditNote:null,_canEdit:!1,_panelHTMLID:"",_showNotifyCustBox:!0,initialize:function(e,t,n,a,o){this._pageJs=e,this._panelHTMLID="PaymentListPanelJs_"+String.fromCharCode(65+Math.floor(26*Math.random()))+Date.now(),this._order=t,this._creditNote=n,this._showNotifyCustBox=o,this._canEdit=a||this._canEdit},setAfterAddFunc:function(e){var t={};return t.me=this,t.me._afterAddFunc=e,t.me},setAfterDeleteFunc:function(e){var t={};return t.me=this,t.me._afterDeleteFunc=e,t.me},getPaymentListPanel:function(){var e={};return e.me=this,e.newDiv=new Element("div",{"class":"panel panel-default",id:e.me._panelHTMLID}).store("PaymentListPanelJs",e.me).insert({bottom:new Element("div",{"class":"panel-heading"}).update("Payments: ")}).insert({bottom:new Element("div",{"class":"panel-body"}).update(e.me._pageJs.getLoadingImg())}),e.newDiv},_deletePayment:function(e,t){var n={};return n.me=this,n.confirmPanel=$(e).up(".deletion-confirm"),n.confirmPanel.getElementsBySelector(".msg").each(function(e){e.remove()}),n.data=n.me._pageJs._collectFormData(n.confirmPanel,"deletion-confirm"),null!==n.data?(n.data.paymentId=t.id,n.me._pageJs.postAjax(PaymentListPanelJs.callbackIds.delPayment,n.data,{onLoading:function(){n.me._signRandID(e),jQuery("#"+e.id).button("loading")},onSuccess:function(t,a){try{if(n.result=n.me._pageJs.getResp(a,!1,!0),!n.result||!n.result.item)return;n.paymentRow=$(n.me._panelHTMLID).down(".payment-item[payment-id="+n.result.item.id+"]"),n.paymentRow&&n.paymentRow.remove(),n.confirmPanel.update('<h4 class="text-success">Payment delete successfully.</h4>'),n.confirmPanel.up(".modal-content").down(".modal-header").update('<strong class="text-success">Success</strong>'),"function"==typeof n.me._afterDeleteFunc&&n.me._afterDeleteFunc(n.result.item)}catch(o){$(e).insert({before:n.me._pageJs.getAlertBox("Error",o).addClassName("alert-danger").addClassName("msg")})}},onComplete:function(){jQuery("#"+e.id).button("reset")}}),n.me):void 0},_showComments:function(e){var t={};return t.me=this,t.item=$(e),t.me._pageJs._signRandID(e),t.item.hasClassName("popover-loaded")||jQuery.ajax({type:"GET",dataType:"json",url:"/ajax/getComments",data:{entity:t.item.readAttribute("comments-entity"),entityId:t.item.readAttribute("comments-entity-Id"),type:""},success:function(n){t.newDiv="N/A",n.resultData&&n.resultData.items&&n.resultData.items.length>0&&(t.newDiv='<div class="list-group">',jQuery.each(n.resultData.items,function(e,n){t.newDiv+='<div class="list-group-item">',t.newDiv+='<span class="badge">'+n.type+"</span>",t.newDiv+='<strong class="list-group-item-heading"><small>'+n.createdBy.person.fullname+"</small></strong>: ",t.newDiv+="<p><small><em> @ "+t.me._pageJs.loadUTCTime(n.created).toLocaleString()+"</em></small><br /><small>"+n.comments+"</small></p>",t.newDiv+="</div>"}),t.newDiv+="</div>"),jQuery("#"+e.id).popover({html:!0,placement:"left",title:'<div class="row" style="min-width: 200px;"><div class="col-xs-10">Comments:</div><div class="col-xs-2"><a class="pull-right" href="javascript:void(0);" onclick="jQuery(\'#'+t.item.readAttribute("id")+"').popover('hide');\"><strong>&times;</strong></a></div></div>",content:t.newDiv}).popover("show"),t.item.addClassName("popover-loaded")}}),t.me},_getPaymentRow:function(e,t){var n={};return n.me=this,n.isTitle=t===!0?!0:!1,n.tag=n.isTitle===!0?"th":"td",n.newDiv=new Element("tr",{"class":"item "+n.isTitle===!0?"":"payment-item"}).store("data",e).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Date":moment(n.me._pageJs.loadUTCTime(e.paymentDate)).format("DD/MMM/YY"))}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Method":e.method.name)}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Value":n.me._pageJs.getCurrency(e.value))}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Created":e.createdBy.person.fullname+" @ "+moment(n.me._pageJs.loadUTCTime(e.created)).format("DD/MM/YY h:mm a"))}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"Comments":new Element("a",{href:"javascript: void(0);","class":"text-muted visible-lg visible-md visible-sm visible-xs",title:"comments","comments-entity-id":e.id,"comments-entity":"Payment"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-comment"})}).observe("click",function(){n.me._showComments(this)}))}).insert({bottom:new Element(n.tag).update(n.isTitle===!0?"":n.me._canEdit!==!0?"":new Element("a",{href:"javascript: void(0);","class":"text-danger",title:"Delete this payment"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-remove"})}).observe("click",function(){n.newConfirmDiv=new Element("div",{"class":"deletion-confirm"}).insert({bottom:new Element("h4").update("You are about to delete a payment with a value: "+n.me._pageJs.getCurrency(e.value)+" from Method: "+e.method.name)}).insert({bottom:new Element("div",{"class":"form-group"}).insert({bottom:new Element("label").update('If you want to continue, please provide a reason/comments below and click <strong class="text-danger">"YES, Delete It"</strong> below:')}).insert({bottom:n.deleteMsgBox=new Element("input",{"class":"form-control",placeholder:"The reason of deleting this payment","deletion-confirm":"reason",required:!0})})}).insert({bottom:new Element("span",{"class":"btn btn-danger","data-loading-text":'<i class="fa fa-refresh fa-spin"></i>'}).update("YES, Delete It").observe("click",function(){n.me._deletePayment(this,e)})}).insert({bottom:new Element("span",{"class":"btn btn-default pull-right"}).update("NO, Cancel Deletion").observe("click",function(){n.me._pageJs.hideModalBox()})}),n.me._pageJs.showModalBox("Deleting a Payment?",n.newConfirmDiv),$(n.deleteMsgBox).focus()}))}),e.id&&n.newDiv.writeAttribute("payment-id",e.id),n.newDiv},_getFormGroup:function(e,t){return new Element("div",{"class":"form-group"}).insert({bottom:e}).insert({bottom:t})},_submitPayment:function(e){var t={};return t.me=this,t.newPaymentDiv=$(e).up(".new-payment-div"),t.newPaymentDiv.getElementsBySelector(".msg").each(function(e){e.remove()}),t.data=t.me._pageJs._collectFormData(t.newPaymentDiv,"payment_field"),null===t.data?t.me:(t.paymentDateBox=t.newPaymentDiv.down('[payment_field="paymentDate"]'),t.paymentDateBox&&(t.me._pageJs._signRandID(t.paymentDateBox),t.data.paymentDate=jQuery("#"+t.paymentDateBox.id).data("DateTimePicker").date().utc().format()),t.againstEntity=null,t.me._order&&t.me._order.id?t.againstEntity={entity:"Order",entityId:t.me._order.id}:t.me._creditNote&&t.me._creditNote.id&&(t.againstEntity={entity:"CreditNote",entityId:t.me._creditNote.id}),null!==t.againstEntity&&t.me._pageJs.postAjax(PaymentListPanelJs.callbackIds.addPayment,{payment:t.data,againstEntity:t.againstEntity},{onLoading:function(){t.me._pageJs._signRandID(e),jQuery("#"+e.id).button("loading")},onSuccess:function(e,n){try{if(t.result=t.me._pageJs.getResp(n,!1,!0),!t.result||!t.result.item)return;t.newPaymentDiv.insert({top:t.me._pageJs.getAlertBox("Success: ","Payment saved successfully!").addClassName("alert-success").addClassName("msg")}),$(t.me._panelHTMLID).down(".payment-list").insert({top:t.me._getPaymentRow(t.result.item)}),"function"==typeof t.me._afterAddFunc&&t.me._afterAddFunc(t.result.item)}catch(a){t.newPaymentDiv.insert({top:t.me._pageJs.getAlertBox("",a).addClassName("alert-danger").addClassName("msg")})}},onComplete:function(){jQuery("#"+e.id).button("reset")}}),t.me)},_currencyInputChanged:function(e){var t={};return t.me=this,$F(e).blank()?!1:(t.inputValue=t.me._pageJs.getValueFromCurrency($F(e)),null===t.inputValue.match(/^(-)?\d+(\.\d{1,4})?$/)?(t.me._pageJs._markFormGroupError(e,"Invalid currency format provided!"),!1):($(e).value=t.me._pageJs.getCurrency(t.inputValue),!0))},_clearCreatePaymentRow:function(e,t){var n={};return n.me=this,n.paymentDiv=e.up(".new-payment-div"),n.paymentDiv.getElementsBySelector(".after_select_method").each(function(e){e.remove()}),$F(t).blank()||n.me._currencyInputChanged(t)!==!0?void $(t).select():(n.paymentDiv.insert({bottom:n.me._showNotifyCustBox!==!0?"":new Element("div",{"class":"after_select_method  col-sm-3",title:"Notify Customer?"}).insert({bottom:n.me._getFormGroup(new Element("label",{"class":"control-label"}).update("Notify Cust.?"),new Element("div",{"class":"text-center"}).update(new Element("input",{type:"checkbox","class":"input-sm",payment_field:"notifyCust",checked:!0})))})}).insert({bottom:new Element("div",{"class":"after_select_method control-label col-sm-6"}).insert({bottom:n.me._getFormGroup(new Element("label",{"class":"control-label"}).update("Comments:"),n.commentsBox=new Element("input",{type:"text","class":"after_select_method input-sm form-control",payment_field:"extraComments",required:!0,placeholder:"Some Comments"}).observe("keydown",function(e){n.me._pageJs.keydown(e,function(){n.paymentDiv.down(".add-btn").click()})}))})}).insert({bottom:new Element("div",{"class":"after_select_method control-label col-sm-3"}).insert({bottom:n.me._getFormGroup("&nbsp;",new Element("span",{"class":"btn btn-primary form-control add-btn","data-loading-text":'<i class="fa fa-refresh fa-spin"></i>'}).update("Save").observe("click",function(){n.me._submitPayment(this)}))})}),n.commentsBox.select(),n.me)},_getCreatePaymentRow:function(e){var t={};return t.me=this,t.me._canEdit!==!0?"":(t.newDiv=new Element("tr").insert({bottom:new Element("td",{colspan:4}).insert({bottom:new Element("div",{"class":"new-payment-div"}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup(new Element("label",{"class":"control-label"}).update("Date: "),new Element("input",{"class":"input-sm form-control",payment_field:"paymentDate",required:!0})))}).insert({bottom:new Element("div",{"class":"col-sm-5"}).update(t.me._getFormGroup(new Element("label",{"class":"control-label"}).update("Method: "),t.paymentMethodSelBox=new Element("select",{"class":"input-sm form-control",payment_field:"payment_method_id",required:!0}).insert({bottom:new Element("option",{value:""}).update("Payment Method:")}).observe("change",function(){t.me._clearCreatePaymentRow(this,t.newDiv.down("[payment_field=paidAmount]"))})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup(new Element("label",{"class":"control-label"}).update("Amt.: "),new Element("input",{type:"text",payment_field:"paidAmount","class":"input-sm form-control",required:!0,validate_currency:!0,placeholder:"The paid amount"}).observe("change",function(){t.me._clearCreatePaymentRow(t.newDiv.down("[payment_field=payment_method_id]"),this)})))})})}),e.each(function(e){t.paymentMethodSelBox.insert({bottom:new Element("option",{value:e.id}).update(e.name)})}),t.newDiv)},_showPayments:function(e,t){var n={};n.me=this,n.pageNo=e||1,t&&n.me._pageJs._signRandID(t),n.data=null,n.me._order&&n.me._order.id?n.data={entity:"Order",entityId:n.me._order.id}:n.me._creditNote&&n.me._creditNote.id&&(n.data={entity:"CreditNote",entityId:n.me._creditNote.id}),null!==n.data&&(n.data.pagination={pageNo:n.pageNo},n.loadingImg=n.me._pageJs.getLoadingImg(),n.me._pageJs.postAjax(PaymentListPanelJs.callbackIds.getPayments,n.data,{onLoading:function(){1===n.pageNo&&(n.panelBody=$(n.me._panelHTMLID).down(".panel-body"),n.panelBody?n.panelBody.update(n.loadingImg):$(n.me._panelHTMLID).insert({bottom:new ELement("div",{"class":"panel-body"}).update(n.loadingImg)})),t&&jQuery("#"+t.id).button("loading")},onSuccess:function(e,a){try{if(n.result=n.me._pageJs.getResp(a,!1,!0),!n.result||!n.result.items)return;n.panelBody=$(n.me._panelHTMLID).down(".panel-body"),n.panelBody&&n.panelBody.remove(),n.thead=$(n.me._panelHTMLID).down("thead"),n.listPanel=$(n.me._panelHTMLID).down(".payment-list"),n.listPanel&&n.thead||$(n.me._panelHTMLID).insert({bottom:new Element("table",{"class":"table table-hover table-condensed"}).insert({bottom:n.thead=new Element("thead").update(n.me._getPaymentRow({},!0))}).insert({bottom:n.listPanel=new Element("tbody",{"class":"payment-list"})})}),1===n.pageNo&&n.result.paymentMethods&&(n.thead.insert({top:n.newRow=n.me._getCreatePaymentRow(n.result.paymentMethods)}),n.paymentDateBox=n.newRow.down('[payment_field="paymentDate"]'),n.paymentDateBox&&(n.me._pageJs._signRandID(n.paymentDateBox),jQuery("#"+n.paymentDateBox.id).datetimepicker({format:"DD/MM/YYYY"}),jQuery("#"+n.paymentDateBox.id).data("DateTimePicker").date(new Date))),n.result.items.each(function(e){n.listPanel.insert({bottom:n.me._getPaymentRow(e)})}),n.result.pagination&&n.result.pagination.pageNumber<n.result.pagination.totalPages&&n.listPanel.insert({bottom:new Element("tr",{"class":"get-more-btn-wrapper"}).update(new Element("td",{colspan:4}).update(new Element("div",{"class":"btn btn-primary"}).update("Show More Payments").observe("click",function(){n.me._showPayments(1*n.pageNo+1,t)})))})}catch(o){n.panelBody=$(n.me._panelHTMLID).down(".panel-body"),n.panelBody?n.panelBody.update(n.me._pageJs.getAlertBox("Error: ",o).addClassName("alert-danger")):n.me._pageJs.showModalBox('<strong class="text-danger">Error</strong>',o)}},onComplete:function(){n.loadingImg.remove(),t&&jQuery("#"+t.id).button("reset")}}))},load:function(){var e={};return e.me=this,$(e.me._panelHTMLID)&&e.me._showPayments(),e.me}};