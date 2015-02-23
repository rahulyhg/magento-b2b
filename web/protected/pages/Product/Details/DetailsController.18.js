var PageJs=new Class.create;PageJs.prototype=Object.extend(new DetailsPageJs,{_manufacturers:[],_suppliers:[],_statuses:[],_btnIdNewPO:null,_priceTypes:[],_codeTypes:[],_locationTypes:[],_productTreeId:"product_category_tree",_imgPanelId:"images_panel",_readOnlyMode:!1,_accountingCodes:[],_selectTypeTxt:"Select One...",_getFormGroup:function(e,t){return new Element("div",{"class":"form-group form-group-sm form-group-sm-label"}).insert({bottom:new Element("label").update(e)}).insert({bottom:t.addClassName("form-control")})},setPreData:function(e,t,n,i,s,o,a,l){return this._manufacturers=e,this._suppliers=t,this._statuses=n,this._priceTypes=i,this._codeTypes=s,this._locationTypes=o,this._btnIdNewPO=a||!1,this._btnIdNewPO&&(this._btnIdNewPO=a.replace(/["']/g,"")||!1),this._accountingCodes=l,this},_getSelBox:function(e,t){var n={};return n.me=this,n.selBox=new Element("select"),e.each(function(e){n.selBox.insert({bottom:new Element("option",{value:e.id,selected:t&&e.id===t?!0:!1}).update(e.name)})}),n.selBox},_getListPanelRow:function(e,t,n,i,s){var o={};return o.me=this,o.isTitle=i||!1,o.tag=o.isTitle===!0?"th":"td",o.typeString=n.type.toLowerCase(),o.valueString=n.value.toLowerCase(),o.randId="NEW_"+String.fromCharCode(65+Math.floor(26*Math.random()))+Date.now(),o.newRow=new Element("tr").insert({bottom:new Element(o.tag).update(o.isTitle===!0?n.type:o.me._getSelBox(t,e[o.typeString]&&e[o.typeString].id?e[o.typeString].id:"").addClassName("form-control input-sm").writeAttribute("list-panel-row","typeId").writeAttribute("required",!0).writeAttribute("list-item",e.id?e.id:o.randId).observe("change",function(e){"function"==typeof s&&s(e)}).wrap(new Element("div",{"class":"form-group"})))}),e.id&&o.newRow.insert({bottom:new Element("input",{type:"hidden","class":"form-control","list-panel-row":"id",value:e.id}).writeAttribute("list-item",e.id?e.id:o.randId)}),n.start&&o.newRow.insert({bottom:new Element(o.tag).update(o.isTitle===!0?n.start:new Element("input",{"class":"form-control input-sm datepicker","list-panel-row":"start",value:e.start?e.start:"",required:!0,disabled:!e.type.needTime}).writeAttribute("list-item",e.id?e.id:o.randId).wrap(new Element("div",{"class":"form-group"})))}),n.end&&o.newRow.insert({bottom:new Element(o.tag).update(o.isTitle===!0?n.end:new Element("input",{"class":"form-control input-sm datepicker","list-panel-row":"end",value:e.end?e.end:"",required:!0,disabled:!e.type.needTime}).writeAttribute("list-item",e.id?e.id:o.randId).wrap(new Element("div",{"class":"form-group"})))}),o.inputBoxDiv=new Element("div",{"class":"input-group input-group-sm"}).insert({bottom:new Element("input",{type:"text","class":"form-control","list-panel-row":"value",required:!0,value:e[o.valueString]?e[o.valueString]:""}).writeAttribute("list-item",e.id?e.id:o.randId)}).insert({bottom:new Element("input",{type:"hidden","class":"form-control","list-panel-row":"active",value:"1"}).writeAttribute("list-item",e.id?e.id:o.randId)}).insert({bottom:new Element("span",{"class":"btn btn-danger input-group-addon"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-trash"})}).observe("click",function(){e.id?($(this).up(".input-group").down("[list-panel-row=active]").value="0",$(this).up(".list-panel-row").hide()):$(this).up(".list-panel-row").remove()})}),o.newRow.insert({bottom:new Element(o.tag).update(o.isTitle===!0?n.value:o.inputBoxDiv.wrap(new Element("div",{"class":"form-group"})))}),o.newRow},_getListPanel:function(e,t,n,i,s){var o={};return o.me=this,o.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{"class":"toggle-btn",href:"javascript: void(0);",title:"click show/hide content below"}).insert({bottom:new Element("strong").update(e)}).observe("click",function(){$(this).up(".panel").down(".list-div").toggle()})}).insert({bottom:new Element("span",{"class":"btn btn-primary btn-xs pull-right",title:"New"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-plus"})}).insert({bottom:" NEW"}).observe("click",function(){o.parentPanel=$(this).up(".panel"),o.parentPanel.down(".table tbody").insert({bottom:o.me._getListPanelRow({},i,n,!1,s).addClassName("list-panel-row").writeAttribute("item_id","")}),o.parentPanel.down(".list-div").show(),o.me._bindDatePicker()})})}).insert({bottom:new Element("div",{"class":"list-div table-responsive"}).insert({bottom:new Element("table",{"class":"table table-condensed"}).insert({bottom:new Element("thead").update(o.me._getListPanelRow(n,i,n,!0,s))}).insert({bottom:o.listDiv=new Element("tbody")})})}),t&&t.each(function(e){o.listDiv.insert({bottom:o.me._getListPanelRow(e,i,n,!1,s).addClassName("list-panel-row").writeAttribute("item_id",e.id)})}),o.newDiv},_loadRichTextEditor:function(e){var t={};return t.me=this,t.me._signRandID(e),t.editor=new TINY.editor.edit("editor",{id:e.id,width:"100%",height:100,cssclass:"tinyeditor",controlclass:"tinyeditor-control",rowclass:"tinyeditor-header",dividerclass:"tinyeditor-divider",controls:["bold","italic","underline","strikethrough","|","subscript","superscript","|","orderedlist","unorderedlist","|","outdent","indent","|","leftalign","centeralign","rightalign","blockjustify","|","unformat","|","undo","redo","n","font","size","style","|","image","hr","link","unlink","|","print"],footer:!0,fonts:["Verdana","Arial","Georgia","Trebuchet MS"],xhtml:!0,cssfile:"custom.css",bodyid:"editor",footerclass:"tinyeditor-footer",toggle:{text:"source",activetext:"wysiwyg",cssclass:"toggle"},resize:{cssclass:"resize"}}),e.store("editor",t.editor),t.me},_getRichTextEditor:function(e){var t={};return t.me=this,t.newDiv=new Element("textarea",{"class":"rich-text-editor","save-item":"fullDescription"}).update(e?e:""),t.newDiv},_getFullDescriptionPanel:function(e){var t={};return t.me=this,t.fullDescriptioAssetId=e.fullDescAssetId?e.fullDescAssetId:"",t.loadFullBtn=e.id?new Element("span",{"class":"btn btn-default btn-loadFullDesc"}).update("click to show the full description editor").observe("click",function(){t.btn=$(this),e.fullDescriptionAsset||t.me._readOnlyMode?jQuery.ajax({type:"GET",url:e.fullDescriptionAsset.url,success:function(e){t.newTextarea=t.me._getRichTextEditor(e),t.me._readOnlyMode?$$(".fullDescriptionEl").first().replace(new Element("div",{"class":"col-sm-12"}).update(t.me._getFormGroup("Full Description:",new Element("input",{type:"text",disabled:!0,value:e?e:""})))):($(t.btn).replace(t.newTextarea),t.me._loadRichTextEditor(t.newTextarea))}}):(t.newTextarea=t.me._getRichTextEditor(""),$(t.btn).replace(t.newTextarea),t.me._loadRichTextEditor(t.newTextarea))}):t.me._getRichTextEditor(""),t.newDiv=t.me._getFormGroup("Full Description:",t.loadFullBtn),t.newDiv},_getChildCategoryJson:function(e,t){var n={};return n.me=this,n.cate={text:e.name,id:e.id},t.indexOf(e.id)>=0&&(n.cate.checked=!0),e.children&&e.children.size()>0&&(n.cate.children=[],e.children.each(function(e){n.cate.children.push(n.me._getChildCategoryJson(e,t))})),n.cate},_initTree:function(e,t){var n={};return n.me=this,n.categoies=[],n.selectedCateIds=[],n.me._item.categories.each(function(e){n.selectedCateIds.push(e.id)}),e.each(function(e){n.categoies.push(n.me._getChildCategoryJson(e,n.selectedCateIds))}),jQuery(t).tree({data:n.categoies}),n.me},_getCategories:function(e){var t={};return t.me=this,t.me.postAjax(t.me.getCallbackId("getCategories"),{},{onLoading:function(){$(e).update(t.me.getLoadingImg())},onSuccess:function(n,i){try{if(t.result=t.me.getResp(i,!1,!0),!t.result||!t.result.items)return;t.treeDiv=new Element("ul",{id:t.me._productTreeId,"data-options":"animate:true, checkbox:true"}),$(e).update(new Element("div",{"class":"easyui-panel"}).update(t.treeDiv)),t.me._signRandID(t.treeDiv),t.me._initTree(t.result.items,"#"+t.treeDiv.id),$(e).addClassName("loaded")}catch(s){$(e).update(t.me.getAlertBox("Error:",s).addClassName("alert-danger"))}}}),t.me},_getCategoryPanel:function(){var e={};return e.me=this,e.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("strong").update("Categories: "+(e.me._item.categories?e.me._item.categories.size()+" Selected":""))})}).observe("click",function(){e.btn=this,e.panelBody=$(e.btn).up(".panel").down(".panel-body"),e.panelBody.hasClassName("loaded")||e.me._getCategories(e.panelBody),e.panelBody.toggle()})}).insert({bottom:new Element("div",{"class":"panel-body",style:"display: none"})}),e.newDiv},_getSummaryDiv:function(e){var t={};return t.me=this,t.item=e,t.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide below"}).insert({bottom:new Element("strong").update(t.item.name?"Editing: "+t.item.name:"Creating: ")}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:new Element("small",{"class":"pull-right"}).insert({bottom:new Element("label",{"for":"showOnWeb_"+t.item.id}).update("Show on Web?")}).insert({bottom:new Element("input",{id:"showOnWeb_"+t.item.id,"save-item":"sellOnWeb",type:"checkbox",checked:t.item.sellOnWeb})})})}).insert({bottom:new Element("div",{"class":"panel-body"}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("Name",new Element("input",{"save-item":"name",type:"text",required:!0,value:t.item.name?t.item.name:""})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("sku",new Element("input",{"save-item":"sku",type:"text",required:!0,value:t.item.sku?t.item.sku:""})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("Status",t.me._getSelBox(t.me._statuses,t.item.status?t.item.status.id:null).writeAttribute("save-item","statusId").addClassName("chosen")))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("Brand/Manf.",t.me._getSelBox(t.me._manufacturers,t.item.manufacturer?t.item.manufacturer.id:null).writeAttribute("save-item","manufacturerId").addClassName("chosen")))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("Web As New Start:",new Element("input",{"class":"datepicker","save-item":"asNewFromDate",value:t.item.asNewFromDate?t.item.asNewFromDate:""})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(t.me._getFormGroup("Web As New End:",new Element("input",{"class":"datepicker","save-item":"asNewToDate",value:t.item.asNewToDate?t.item.asNewToDate:""})))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-12"}).update(t.me._getFormGroup("Short Description:",new Element("input",{"save-item":"shortDescription",type:"text",value:t.item.shortDescription?t.item.shortDescription:""})))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-12 fullDescriptionEl"}).update(t.me._getFullDescriptionPanel(t.item))})})}),t.newDiv},_loadFancyBox:function(e){var t={};return t.me=this,e.each(function(n){n.observe("click",function(){t.imgs=[],e.each(function(e){t.imgs.push({href:e.down("img").readAttribute("src")})}),jQuery.fancybox(t.imgs,{prevEffect:"none",nextEffect:"none",helpers:{title:{type:"outside"},thumbs:{height:50}}})})}),this},_getImageThumb:function(e){var t={};return t.me=this,t.src=e.data?e.data:e.path,t.newDiv=new Element("div",{"class":"col-xs-12 col-sm-6 col-md-4 thumbnail-holder btn-hide-row product-image",active:"1"}).store("data",e).insert({bottom:new Element("a",{href:"javascript: void(0)","class":"thumbnail fancybox-thumb",ref:"product_thumbs"}).insert({bottom:new Element("img",{"data-src":"holder.js/100%x180",src:t.src})})}).insert({bottom:new Element("span",{"class":"btns"}).insert({bottom:new Element("small",{"class":"btn btn-danger btn-xs"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-trash"})})}).observe("click",function(){return confirm("Delete this image?")?(t.imgDiv=$(this).up(".product-image"),void(t.imgDiv.hasAttribute("asset-id")?t.imgDiv.remove():t.imgDiv.writeAttribute("active","0").hide())):!1})}),e.imageAssetId||t.newDiv.writeAttribute("file-name",e.filename).writeAttribute("asset-id",e.imageAssetId),t.newDiv},_readImages:function(e,t){var n={};for(n.me=this,n.files=e.target.files,n.i=0;n.file=n.files[n.i];n.i++)n.file.type.match("image.*")&&(n.reader=new FileReader,n.reader.onload=function(i){return function(s){n.thumb=n.me._getImageThumb({data:s.target.result,filename:i.name}),$(t).insert({bottom:n.thumb}),e.target.value="",n.me._loadFancyBox($(n.me._imgPanelId).getElementsBySelector(".fancybox-thumb"))}}(n.file),n.reader.readAsDataURL(n.file));return n.me},_getImagesPanel:function(e){var t={};return t.me=this,t.noLocalReader=!(window.File&&window.FileReader&&window.FileList&&window.Blob),t.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide content below"}).insert({bottom:new Element("strong").update("Images: ")}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:t.uploadDiv=new Element("span",{"class":"pull-right new-btn-panel"})})}).insert({bottom:t.body=new Element("div",{id:t.me._imgPanelId,"class":"panel-body"})}),e.images&&e.images.each(function(e){e.asset&&t.body.insert({bottom:t.me._getImageThumb({path:e.asset.url,filename:e.asset.filename,imageAssetId:e.asset.assetId})})}),t.noLocalReader?t.uploadDiv.update(new Element("span",{"class":"btn btn-danger btn-xs pull-right",title:"Your browser does NOT support this feature. Pls change browser and try again"}).insert({bottom:new Element("span",{"class":" glyphicon glyphicon-exclamation-sign"})}).insert({bottom:" Not Supported"})):t.uploadDiv.insert({bottom:new Element("span",{"class":"btn btn-primary btn-xs pull-right",title:"New"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-plus"})}).insert({bottom:" NEW"}).observe("click",function(){$(this).up(".new-btn-panel").down(".new-images-file").click()})}).insert({bottom:new Element("input",{"class":"new-images-file",type:"file",multiple:!0,style:"display: none"}).observe("change",function(e){t.panelBody=$(this).up(".panel").down(".panel-body"),t.me._readImages(e,t.panelBody),t.panelBody.show()})}),t.newDiv},_submitSave:function(e){var t={};if(t.me=this,t.data=t.me._collectFormData($(t.me._htmlIds.itemDiv),"save-item"),null===t.data)return t.me;if(t.data.prices=t.me._collectFormData($(t.me._htmlIds.itemDiv).down(".prices-panel"),"list-panel-row","list-item"),null===t.data.prices)return t.me;if(t.data.supplierCodes=t.me._collectFormData($(t.me._htmlIds.itemDiv).down(".suppliers-panel"),"list-panel-row","list-item"),null===t.data.supplierCodes)return t.me;if(t.data.productCodes=t.me._collectFormData($(t.me._htmlIds.itemDiv).down(".codes-panel"),"list-panel-row","list-item"),null===t.data.productCodes)return t.me;if(t.data.locations=t.me._collectFormData($(t.me._htmlIds.itemDiv).down(".locations-panel"),"list-panel-row","list-item"),null===t.data.locations)return t.me;if(t.data.id=t.me._item.id,$$("[save-item=fullDescription]").size()>0&&(t.fullDescriptionBox=$$("[save-item=fullDescription]").first())&&(t.fullDescriptionBox.retrieve("editor").toggle(),t.fullDescriptionBox.retrieve("editor").toggle(),t.data.fullDescription=$F(t.fullDescriptionBox)),jQuery("#"+t.me._productTreeId).length>0)for(t.data.categoryIds=[],t.checkedNodes=jQuery("#"+t.me._productTreeId).tree("getChecked"),t.i=0;t.i<t.checkedNodes.length;t.i++)t.data.categoryIds.push(t.checkedNodes[t.i].id);return t.data.images=[],t.imgPanel=$(t.me._imgPanelId),t.imgPanel.getElementsBySelector(".product-image").each(function(e){t.img=e.retrieve("data"),t.img.imageAssetId=t.img.imageAssetId?t.img.imageAssetId:"",t.img.active="1"===e.readAttribute("active"),t.data.images.push(t.img)}),t.me.saveItem(e,t.data,function(e){if(!e.url)throw"System Error: no return product url";t.me._item=e.item,t.me.refreshParentWindow(),t.me.showModalBox('<strong class="text-success">Saved Successfully!</strong>',"Saved Successfully!",!0),window.location=e.url}),t.me},_loadChosen:function(){var e={};return e.me=this,jQuery(".chosen").chosen({search_contains:!0,inherit_select_classes:!0,no_results_text:"No code type found!",width:"100%"}),jQuery('.chosen[save-item="assetAccNo"]').change(function(){e.data=$(this).down('[value="'+$F($(this))+'"]').retrieve("data"),e.revenueEl=$$('.chosen[save-item="revenueAccNo"]').first(),e.costEl=$$('.chosen[save-item="costAccNo"]').first(),$F($(this))!==e.me._selectTypeTxt&&(e.revenueEl.getElementsBySelector('option[selected="selected"]').each(function(e){e.removeAttribute("selected")}),e.revenueEl.down('option[description="'+e.data.description+'"]').writeAttribute("selected",!0),jQuery('.chosen[save-item="revenueAccNo"]').trigger("chosen:updated"),e.costEl.getElementsBySelector('option[selected="selected"]').each(function(e){e.removeAttribute("selected")}),e.costEl.down('option[description="'+e.data.description+'"]').writeAttribute("selected",!0),jQuery('.chosen[save-item="costAccNo"]').trigger("chosen:updated"))}),this},_getAccCodeSelectEl:function(e){var t={};switch(t.me=this,e){case"assetAccNo":t.type=1;break;case"revenueAccNo":t.type=4;break;case"costAccNo":t.type=5;break;default:t.showModelBox("Error","Invalid Account Code Type")}return t.selectEl=new Element("select",{"class":"chosen","save-item":e,"data-placeholder":e}).setStyle("z-index: 9999;").insert({bottom:new Element("option",{value:t.me._selectTypeTxt}).update(t.me._selectTypeTxt)}),t.me._signRandID(t.selectEl),t.me._accountingCodes.each(function(e){e.type==t.type&&(t.selectEl.insert({bottom:t.option=new Element("option",{value:e.code,description:e.description}).store("data",e).update(e.description)}),(e.code===t.me._item.assetAccNo||e.code===t.me._item.revenueAccNo||e.code===t.me._item.costAccNo)&&t.option.writeAttribute("selected",!0))}),t.selectEl},_getStockDev:function(e){var t={};return t.me=this,t.item=e,t.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide content below"}).insert({bottom:new Element("strong").update("Stock Info").insert({bottom:new Element("span",{"class":"pull-right"}).update("Average Cost: "+(0!=t.item.totalOnHandValue&&0!=t.item.stockOnHand?t.me.getCurrency(t.item.totalOnHandValue/t.item.stockOnHand):"N/A"))})}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:t.uploadDiv=new Element("span",{"class":"pull-right new-btn-panel"})})}).insert({bottom:new Element("div",{"class":"panel-body"}).setStyle("display: none;").insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock On Hand",new Element("input",{"save-item":"stockOnHand",type:"value",disabled:!0,value:t.item.stockOnHand?t.item.stockOnHand:""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock On Hand Value",new Element("input",{"save-item":"totalOnHandValue",type:"value",disabled:!0,value:t.item.totalOnHandValue?t.me.getCurrency(t.item.totalOnHandValue):""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock In Parts",new Element("input",{"save-item":"stockInParts",type:"value",disabled:!0,value:t.item.stockInParts?t.item.stockInParts:""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock In Parts Value",new Element("input",{"save-item":"totalOnHandValue",type:"value",disabled:!0,value:t.item.totalOnHandValue?t.me.getCurrency(t.item.totalOnHandValue):""})))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock On Order",new Element("input",{"save-item":"stockOnOrder",type:"value",disabled:!0,value:t.item.stockOnOrder?t.item.stockOnOrder:""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock On PO",new Element("input",{"save-item":"stockOnPO",type:"value",disabled:!0,value:t.item.stockOnPO?t.item.stockOnPO:""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Stock In RMA",new Element("input",{"save-item":"stockInRMA",type:"value",disabled:!0,value:t.item.stockInRMA?t.item.stockInRMA:""})))}).insert({bottom:new Element("div",{"class":"col-sm-3"}).update(t.me._getFormGroup("Average Cost",new Element("input",{"save-item":"stockInRMA",type:"value",disabled:!0,value:0!=t.item.totalOnHandValue&&0!=t.item.stockOnHand?t.me.getCurrency(t.item.totalOnHandValue/t.item.stockOnHand):"N/A"})))})})}),t.newDiv},_getAccInfoDiv:function(e){var t={};return t.me=this,t.item=e,t.newDiv=new Element("div",{"class":"panel panel-default"}).setStyle("overflow: unset !important;").insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide content below"}).insert({bottom:new Element("strong").update("Accounting Info")}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:t.uploadDiv=new Element("span",{"class":"pull-right new-btn-panel"})})}).insert({bottom:new Element("div",{"class":"panel-body"}).setStyle("overflow: unset !important;").insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:new Element("div",{"class":"form-group form-group-sm"}).insert({bottom:new Element("label").update("Asset Account No.")}).insert({bottom:new Element("div",{"class":"form-control chosen-container"}).setStyle("padding: 0px; height: 100%;").insert({bottom:t.me._getAccCodeSelectEl("assetAccNo")})})})}).insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:new Element("div",{"class":"form-group form-group-sm"}).insert({bottom:new Element("label").update("Revenue Account No.")}).insert({bottom:new Element("div",{"class":"form-control chosen-container"}).setStyle("padding: 0px; height: 100%;").insert({bottom:t.me._getAccCodeSelectEl("revenueAccNo")})})})}).insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:new Element("div",{"class":"form-group form-group-sm"}).insert({bottom:new Element("label").update("Cost Account No.")}).insert({bottom:new Element("div",{"class":"form-control chosen-container"}).setStyle("padding: 0px; height: 100%;").insert({bottom:t.me._getAccCodeSelectEl("costAccNo")})})})})}),t.newDiv},_getItemDiv:function(){var e={};return e.me=this,e.newDiv=new Element("div").insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:e.me._getImagesPanel(e.me._item)}).insert({bottom:e.me._getCategoryPanel(e.me._item)})}).insert({bottom:new Element("div",{"class":"col-sm-8"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:e.me._getSummaryDiv(e.me._item).wrap(new Element("div",{"class":"col-sm-12"}))}).insert({bottom:e.me._getStockDev(e.me._item).wrap(new Element("div",{"class":"col-sm-12"}))}).insert({bottom:e.me._getAccInfoDiv(e.me._item).wrap(new Element("div",{"class":"col-sm-12"}))}).insert({bottom:e.me._getListPanel("Prices:",e.me._item.prices,{type:"Type",value:"Price",start:"From",end:"To"},e.me._priceTypes,function(t){e.selectedPriceType=null,e.selBox=t.target,e.me._priceTypes.each(function(t){t.id===$F(e.selBox)&&(e.selectedPriceType=t)}),e.selRow=$(e.selBox).up(".list-panel-row"),e.startBox=e.selRow.down('[list-panel-row="start"]'),e.endBox=e.selRow.down('[list-panel-row="end"]'),null!==e.selectedPriceType&&e.selectedPriceType.needTime===!1?(e.startBox.writeAttribute("disabled",!0).writeAttribute("value","0001-01-01 00:00:00"),e.endBox.writeAttribute("disabled",!0).writeAttribute("value","9999-12-31 23:59:59"),e.selRow.down('[list-panel-row="value"]').select()):(e.endBox.writeAttribute("disabled",!1).writeAttribute("value",""),e.startBox.writeAttribute("disabled",!1).writeAttribute("value","").select())}).wrap(new Element("div",{"class":"col-sm-12 prices-panel"}))}).insert({bottom:e.me._getListPanel("Suppliers:",e.me._item.supplierCodes,{type:"Supplier",value:"Code"},e.me._suppliers).wrap(new Element("div",{"class":"col-sm-4 suppliers-panel"}))}).insert({bottom:e.me._getListPanel("Codes:",e.me._item.productCodes,{type:"Type",value:"Code"},e.me._codeTypes).wrap(new Element("div",{"class":"col-sm-4 codes-panel"}))}).insert({bottom:e.me._getListPanel("Locations:",e.me._item.locations,{type:"Type",value:"value"},e.me._locationTypes).wrap(new Element("div",{"class":"col-sm-4 locations-panel"}))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("span",{"class":"btn btn-primary pull-right col-sm-4","data-loading-text":"saving ..."}).update("Save").observe("click",function(){e.me._submitSave(this)})})})})}),e.newDiv},_bindDatePicker:function(){var e={};return e.me=this,$$(".datepicker").each(function(t){t.hasClassName("datepicked")||(e.me._signRandID(t),e.picker=new Prado.WebUI.TDatePicker({ID:t.id,InputMode:"TextBox",Format:"yyyy-MM-dd 00:00:00",FirstDayOfWeek:1,CalendarStyle:"default",FromYear:2009,UpToYear:2024,PositionMode:"Bottom",ClassName:"datepicker-layer-fixer"}),t.store("picker",e.picker))}),e.me},bindAllEventNObjects:function(){var e={};return e.me=this,e.me._bindDatePicker(),$$("textarea.rich-text-editor").each(function(t){e.me._loadRichTextEditor(t)}),e.me},refreshParentWindow:function(){var e={};e.me=this,window.opener&&(e.parentWindow=window.opener,e.row=$(e.parentWindow.document.body).down("#"+e.parentWindow.pageJs.resultDivId+" .product_item[product_id="+e.me._item.id+"]"),e.row&&(e.row.replace(e.parentWindow.pageJs._getResultRow(e.me._item)),e.row.hasClassName("success")&&e.row.addClassName("success")),e.newPObtn=$(e.parentWindow.document.body).down("#"+e.me._btnIdNewPO),e.newPObtn&&e.parentWindow.pageJs.selectProduct(e.me._item,e.newPObtn))},readOnlyMode:function(){var e={};e.me=this,e.me._readOnlyMode=!0,$$(".btn.btn-loadFullDesc").first().click(),jQuery("input").prop("disabled",!0),jQuery("select").prop("disabled",!0),jQuery(".btn").remove()}});