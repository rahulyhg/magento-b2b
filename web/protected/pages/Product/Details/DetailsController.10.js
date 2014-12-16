var PageJs=new Class.create();PageJs.prototype=Object.extend(new DetailsPageJs(),{_manufacturers:[],_suppliers:[],_statuses:[],_priceTypes:[],_codeTypes:[],_locationTypes:[],_productTreeId:"product_category_tree",_imgPanelId:"images_panel",_getFormGroup:function(b,a){return new Element("div",{"class":"form-group form-group-sm form-group-sm-label"}).insert({bottom:new Element("label").update(b)}).insert({bottom:a.addClassName("form-control")})},setPreData:function(d,b,c,a,f,e){this._manufacturers=d;this._suppliers=b;this._statuses=c;this._priceTypes=a;this._codeTypes=f;this._locationTypes=e;return this},_getSelBox:function(a,c){var b={};b.me=this;b.selBox=new Element("select");a.each(function(d){b.selBox.insert({bottom:new Element("option",{value:d.id,selected:(c&&d.id===c?true:false)}).update(d.name)})});return b.selBox},_getListPanelRow:function(d,c,f,a,e){var b={};b.me=this;b.isTitle=(a||false);b.tag=(b.isTitle===true?"th":"td");b.typeString=f.type.toLowerCase();b.valueString=f.value.toLowerCase();b.randId="NEW_"+String.fromCharCode(65+Math.floor(Math.random()*26))+Date.now();b.newRow=new Element("tr").insert({bottom:new Element(b.tag).update(b.isTitle===true?f.type:b.me._getSelBox(c,(d[b.typeString]&&d[b.typeString].id?d[b.typeString].id:"")).addClassName("form-control input-sm").writeAttribute("list-panel-row","typeId").writeAttribute("required",true).writeAttribute("list-item",(d.id?d.id:b.randId)).observe("change",function(g){if(typeof(e)==="function"){e(g)}}).wrap(new Element("div",{"class":"form-group"})))});if(d.id){b.newRow.insert({bottom:new Element("input",{type:"hidden","class":"form-control","list-panel-row":"id",value:(d.id)}).writeAttribute("list-item",(d.id?d.id:b.randId))})}if(f.start){b.newRow.insert({bottom:new Element(b.tag).update(b.isTitle===true?f.start:new Element("input",{"class":"form-control input-sm datepicker","list-panel-row":"start",value:(d.start?d.start:""),required:true,disabled:true,value:"0001-01-01 00:00:00"}).writeAttribute("list-item",(d.id?d.id:b.randId)).wrap(new Element("div",{"class":"form-group"})))})}if(f.end){b.newRow.insert({bottom:new Element(b.tag).update(b.isTitle===true?f.end:new Element("input",{"class":"form-control input-sm datepicker","list-panel-row":"end",value:(d.end?d.end:""),required:true,disabled:true,value:"9999-12-31 23:59:59"}).writeAttribute("list-item",(d.id?d.id:b.randId)).wrap(new Element("div",{"class":"form-group"})))})}b.inputBoxDiv=new Element("div",{"class":"input-group input-group-sm"}).insert({bottom:new Element("input",{type:"text","class":"form-control","list-panel-row":"value",required:true,value:(d[b.valueString]?d[b.valueString]:"")}).writeAttribute("list-item",(d.id?d.id:b.randId))}).insert({bottom:new Element("input",{type:"hidden","class":"form-control","list-panel-row":"active",value:"1"}).writeAttribute("list-item",(d.id?d.id:b.randId))}).insert({bottom:new Element("span",{"class":"btn btn-danger input-group-addon"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-trash"})}).observe("click",function(){if(d.id){$(this).up(".input-group").down("[list-panel-row=active]").value="0";$(this).up(".list-panel-row").hide()}else{$(this).up(".list-panel-row").remove()}})});b.newRow.insert({bottom:new Element(b.tag).update(b.isTitle===true?f.value:b.inputBoxDiv.wrap(new Element("div",{"class":"form-group"})))});return b.newRow},_getListPanel:function(e,c,f,b,d){var a={};a.me=this;a.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{"class":"toggle-btn",href:"javascript: void(0);",title:"click show/hide content below"}).insert({bottom:new Element("strong").update(e)}).observe("click",function(){$(this).up(".panel").down(".list-div").toggle()})}).insert({bottom:new Element("span",{"class":"btn btn-primary btn-xs pull-right",title:"New"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-plus"})}).insert({bottom:" NEW"}).observe("click",function(){a.parentPanel=$(this).up(".panel");a.parentPanel.down(".table tbody").insert({bottom:a.me._getListPanelRow({},b,f,false,d).addClassName("list-panel-row").writeAttribute("item_id","")});a.parentPanel.down(".list-div").show();a.me._bindDatePicker()})})}).insert({bottom:new Element("div",{"class":"list-div table-responsive"}).insert({bottom:new Element("table",{"class":"table table-condensed"}).insert({bottom:new Element("thead").update(a.me._getListPanelRow(f,b,f,true,d))}).insert({bottom:a.listDiv=new Element("tbody")})})});if(c){c.each(function(g){a.listDiv.insert({bottom:a.me._getListPanelRow(g,b,f,false,d).addClassName("list-panel-row").writeAttribute("item_id",g.id)})})}return a.newDiv},_loadRichTextEditor:function(a){var b={};b.me=this;b.me._signRandID(a);b.editor=new TINY.editor.edit("editor",{id:a.id,width:"100%",height:100,cssclass:"tinyeditor",controlclass:"tinyeditor-control",rowclass:"tinyeditor-header",dividerclass:"tinyeditor-divider",controls:["bold","italic","underline","strikethrough","|","subscript","superscript","|","orderedlist","unorderedlist","|","outdent","indent","|","leftalign","centeralign","rightalign","blockjustify","|","unformat","|","undo","redo","n","font","size","style","|","image","hr","link","unlink","|","print"],footer:true,fonts:["Verdana","Arial","Georgia","Trebuchet MS"],xhtml:true,cssfile:"custom.css",bodyid:"editor",footerclass:"tinyeditor-footer",toggle:{text:"source",activetext:"wysiwyg",cssclass:"toggle"},resize:{cssclass:"resize"}});a.store("editor",b.editor);return b.me},_getRichTextEditor:function(b){var a={};a.me=this;a.newDiv=new Element("textarea",{"class":"rich-text-editor","save-item":"fullDescription"}).update(b?b:"");return a.newDiv},_getFullDescriptionPanel:function(b){var a={};a.me=this;a.fullDescriptioAssetId=b.fullDescAssetId?b.fullDescAssetId:"";a.loadFullBtn=!b.id?a.me._getRichTextEditor(""):new Element("span",{"class":"btn btn-default"}).update("click to show the full description editor").observe("click",function(){a.btn=$(this);if(!b.fullDescriptionAsset){a.newTextarea=a.me._getRichTextEditor("");$(a.btn).replace(a.newTextarea);a.me._loadRichTextEditor(a.newTextarea)}else{jQuery.ajax({type:"GET",url:b.fullDescriptionAsset.url,success:function(c){a.newTextarea=a.me._getRichTextEditor(c);$(a.btn).replace(a.newTextarea);a.me._loadRichTextEditor(a.newTextarea)}})}});a.newDiv=a.me._getFormGroup("Full Description:",a.loadFullBtn);return a.newDiv},_getChildCategoryJson:function(c,a){var b={};b.me=this;b.cate={text:c.name,id:c.id};if(a.indexOf(c.id)>=0){b.cate.checked=true}if(c.children&&c.children.size()>0){b.cate.children=[];c.children.each(function(d){b.cate.children.push(b.me._getChildCategoryJson(d,a))})}return b.cate},_initTree:function(b,a){var c={};c.me=this;c.categoies=[];c.selectedCateIds=[];c.me._item.categories.each(function(d){c.selectedCateIds.push(d.id)});b.each(function(d){c.categoies.push(c.me._getChildCategoryJson(d,c.selectedCateIds))});jQuery(a).tree({data:c.categoies});return c.me},_getCategories:function(b){var a={};a.me=this;a.me.postAjax(a.me.getCallbackId("getCategories"),{},{onLoading:function(c,d){$(b).update(a.me.getLoadingImg())},onSuccess:function(c,f){try{a.result=a.me.getResp(f,false,true);if(!a.result||!a.result.items){return}a.treeDiv=new Element("ul",{id:a.me._productTreeId,"data-options":"animate:true, checkbox:true"});$(b).update(new Element("div",{"class":"easyui-panel"}).update(a.treeDiv));a.me._signRandID(a.treeDiv);a.me._initTree(a.result.items,"#"+a.treeDiv.id);$(b).addClassName("loaded")}catch(d){$(b).update(a.me.getAlertBox("Error:",d).addClassName("alert-danger"))}}});return a.me},_getCategoryPanel:function(b){var a={};a.me=this;a.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);"}).insert({bottom:new Element("strong").update("Categories: "+(a.me._item.categories?a.me._item.categories.size()+" Selected":""))})}).observe("click",function(){a.btn=this;a.panelBody=$(a.btn).up(".panel").down(".panel-body");if(!a.panelBody.hasClassName("loaded")){a.me._getCategories(a.panelBody)}a.panelBody.toggle()})}).insert({bottom:new Element("div",{"class":"panel-body",style:"display: none"})});return a.newDiv},_getSummaryDiv:function(b){var a={};a.me=this;a.item=b;a.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide below"}).insert({bottom:new Element("strong").update(a.item.name?"Editing: "+a.item.name:"Creating: ")}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:new Element("small",{"class":"pull-right"}).insert({bottom:new Element("label",{"for":"showOnWeb_"+a.item.id}).update("Show on Web?")}).insert({bottom:new Element("input",{id:"showOnWeb_"+a.item.id,"save-item":"sellOnWeb",type:"checkbox",checked:a.item.sellOnWeb})})})}).insert({bottom:new Element("div",{"class":"panel-body"}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(a.me._getFormGroup("Name",new Element("input",{"save-item":"name",type:"text",required:true,value:a.item.name?a.item.name:""})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(a.me._getFormGroup("sku",new Element("input",{"save-item":"sku",type:"text",required:true,value:a.item.sku?a.item.sku:""})))}).insert({bottom:new Element("div",{"class":"col-sm-2"}).update(a.me._getFormGroup("Inventory Account No.",new Element("input",{"save-item":"invenAccNo",required:true,type:"text",value:a.item.invenAccNo?a.item.invenAccNo:""})))}).insert({bottom:new Element("div",{"class":"col-sm-2"}).update(a.me._getFormGroup("Status",a.me._getSelBox(a.me._statuses,a.item.status?a.item.status.id:null).writeAttribute("save-item","statusId").addClassName("chosen")))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(a.me._getFormGroup("Brand/Manf.",a.me._getSelBox(a.me._manufacturers,a.item.manufacturer?a.item.manufacturer.id:null).writeAttribute("save-item","manufacturerId").addClassName("chosen")))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(a.me._getFormGroup("Web As New Start:",new Element("input",{"class":"datepicker","save-item":"asNewFromDate",value:(a.item.asNewFromDate?a.item.asNewFromDate:"")})))}).insert({bottom:new Element("div",{"class":"col-sm-4"}).update(a.me._getFormGroup("Web As New End:",new Element("input",{"class":"datepicker","save-item":"asNewToDate",value:(a.item.asNewToDate?a.item.asNewToDate:"")})))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-12"}).update(a.me._getFormGroup("Short Description:",new Element("input",{"save-item":"shortDescription",type:"text",value:a.item.shortDescription?a.item.shortDescription:""})))})}).insert({bottom:new Element("div",{"class":""}).insert({bottom:new Element("div",{"class":"col-sm-12"}).update(a.me._getFullDescriptionPanel(a.item))})})});return a.newDiv},_loadFancyBox:function(b){var a={};a.me=this;b.each(function(c){c.observe("click",function(){a.imgs=[];b.each(function(d){a.imgs.push({href:d.down("img").readAttribute("src")})});jQuery.fancybox(a.imgs,{prevEffect:"none",nextEffect:"none",helpers:{title:{type:"outside"},thumbs:{height:50}}})})});return this},_getImageThumb:function(a){var b={};b.me=this;b.src=a.data?a.data:a.path;b.newDiv=new Element("div",{"class":"col-xs-12 col-sm-6 col-md-4 thumbnail-holder btn-hide-row product-image",active:"1"}).store("data",a).insert({bottom:new Element("a",{href:"javascript: void(0)","class":"thumbnail fancybox-thumb",ref:"product_thumbs"}).insert({bottom:new Element("img",{"data-src":"holder.js/100%x180",src:b.src})})}).insert({bottom:new Element("span",{"class":"btns"}).insert({bottom:new Element("small",{"class":"btn btn-danger btn-xs"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-trash"})})}).observe("click",function(){if(!confirm("Delete this image?")){return false}b.imgDiv=$(this).up(".product-image");if(b.imgDiv.hasAttribute("asset-id")){b.imgDiv.remove()}else{b.imgDiv.writeAttribute("active","0").hide()}})});if(!a.imageAssetId){b.newDiv.writeAttribute("file-name",a.filename).writeAttribute("asset-id",a.imageAssetId)}return b.newDiv},_readImages:function(a,c){var b={};b.me=this;b.files=a.target.files;for(b.i=0;b.file=b.files[b.i];b.i++){if(b.file.type.match("image.*")){b.reader=new FileReader();b.reader.onload=(function(d){return function(f){b.thumb=b.me._getImageThumb({data:f.target.result,filename:d.name});$(c).insert({bottom:b.thumb});a.target.value="";b.me._loadFancyBox($(b.me._imgPanelId).getElementsBySelector(".fancybox-thumb"))}})(b.file);b.reader.readAsDataURL(b.file)}}return b.me},_getImagesPanel:function(b){var a={};a.me=this;a.noLocalReader=!(window.File&&window.FileReader&&window.FileList&&window.Blob);a.newDiv=new Element("div",{"class":"panel panel-default"}).insert({bottom:new Element("div",{"class":"panel-heading"}).insert({bottom:new Element("a",{href:"javascript: void(0);",title:"click to show/hide content below"}).insert({bottom:new Element("strong").update("Images: ")}).observe("click",function(){$(this).up(".panel").down(".panel-body").toggle()})}).insert({bottom:a.uploadDiv=new Element("span",{"class":"pull-right new-btn-panel"})})}).insert({bottom:a.body=new Element("div",{id:a.me._imgPanelId,"class":"panel-body"})});if(b.images){b.images.each(function(c){if(c.asset){a.body.insert({bottom:a.me._getImageThumb({path:c.asset.url,filename:c.asset.filename,imageAssetId:c.asset.assetId})})}})}if(a.noLocalReader){a.uploadDiv.update(new Element("span",{"class":"btn btn-danger btn-xs pull-right",title:"Your browser does NOT support this feature. Pls change browser and try again"}).insert({bottom:new Element("span",{"class":" glyphicon glyphicon-exclamation-sign"})}).insert({bottom:" Not Supported"}))}else{a.uploadDiv.insert({bottom:new Element("span",{"class":"btn btn-primary btn-xs pull-right",title:"New"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-plus"})}).insert({bottom:" NEW"}).observe("click",function(){$(this).up(".new-btn-panel").down(".new-images-file").click()})}).insert({bottom:new Element("input",{"class":"new-images-file",type:"file",multiple:true,style:"display: none"}).observe("change",function(c){a.panelBody=$(this).up(".panel").down(".panel-body");a.me._readImages(c,a.panelBody);a.panelBody.show()})})}return a.newDiv},_submitSave:function(b){var a={};a.me=this;a.data=a.me._collectFormData($(a.me._htmlIds.itemDiv),"save-item");if(a.data===null){return a.me}a.data.prices=a.me._collectFormData($(a.me._htmlIds.itemDiv).down(".prices-panel"),"list-panel-row","list-item");if(a.data.prices===null){return a.me}a.data.supplierCodes=a.me._collectFormData($(a.me._htmlIds.itemDiv).down(".suppliers-panel"),"list-panel-row","list-item");if(a.data.supplierCodes===null){return a.me}a.data.productCodes=a.me._collectFormData($(a.me._htmlIds.itemDiv).down(".codes-panel"),"list-panel-row","list-item");if(a.data.productCodes===null){return a.me}a.data.locations=a.me._collectFormData($(a.me._htmlIds.itemDiv).down(".locations-panel"),"list-panel-row","list-item");if(a.data.locations===null){return a.me}a.data.id=a.me._item.id;if($$("[save-item=fullDescription]").size()>0&&(a.fullDescriptionBox=$$("[save-item=fullDescription]").first())){a.fullDescriptionBox.retrieve("editor").toggle();a.fullDescriptionBox.retrieve("editor").toggle();a.data.fullDescription=$F(a.fullDescriptionBox)}if(jQuery("#"+a.me._productTreeId).length>0){a.data.categoryIds=[];a.checkedNodes=jQuery("#"+a.me._productTreeId).tree("getChecked");for(a.i=0;a.i<a.checkedNodes.length;a.i++){a.data.categoryIds.push(a.checkedNodes[a.i].id)}}a.data.images=[];a.imgPanel=$(a.me._imgPanelId);a.imgPanel.getElementsBySelector(".product-image").each(function(c){a.img=c.retrieve("data");a.img.imageAssetId=(a.img.imageAssetId?a.img.imageAssetId:"");a.img.active=(c.readAttribute("active")==="1");a.data.images.push(a.img)});a.me.saveItem(b,a.data,function(c){if(!c.url){throw"System Error: no return product url"}a.me._item=c.item;a.me.refreshParentWindow();a.me.showModalBox('<strong class="text-success">Saved Successfully!</strong>',"Saved Successfully!",true);window.location=c.url});return a.me},_getItemDiv:function(){var a={};a.me=this;a.newDiv=new Element("div").insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("div",{"class":"col-sm-4"}).insert({bottom:a.me._getImagesPanel(a.me._item)}).insert({bottom:a.me._getCategoryPanel(a.me._item)})}).insert({bottom:new Element("div",{"class":"col-sm-8"}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:a.me._getSummaryDiv(a.me._item).wrap(new Element("div",{"class":"col-sm-12"}))}).insert({bottom:a.me._getListPanel("Prices:",a.me._item.prices,{type:"Type",value:"Price",start:"From",end:"To"},a.me._priceTypes,function(b){a.selectedPriceType=null;a.selBox=b.target;a.me._priceTypes.each(function(c){if(c.id===$F(a.selBox)){a.selectedPriceType=c}});a.selRow=$(a.selBox).up(".list-panel-row");a.startBox=a.selRow.down('[list-panel-row="start"]');a.endBox=a.selRow.down('[list-panel-row="end"]');if(a.selectedPriceType!==null&&a.selectedPriceType.needTime===false){a.startBox.writeAttribute("disabled",true).writeAttribute("value","0001-01-01 00:00:00");a.endBox.writeAttribute("disabled",true).writeAttribute("value","9999-12-31 23:59:59");a.selRow.down('[list-panel-row="value"]').select()}else{a.endBox.writeAttribute("disabled",false).writeAttribute("value","");a.startBox.writeAttribute("disabled",false).writeAttribute("value","").select()}}).wrap(new Element("div",{"class":"col-sm-12 prices-panel"}))}).insert({bottom:a.me._getListPanel("Suppliers:",a.me._item.supplierCodes,{type:"Supplier",value:"Code"},a.me._suppliers).wrap(new Element("div",{"class":"col-sm-4 suppliers-panel"}))}).insert({bottom:a.me._getListPanel("Codes:",a.me._item.productCodes,{type:"Type",value:"Code"},a.me._codeTypes).wrap(new Element("div",{"class":"col-sm-4 codes-panel"}))}).insert({bottom:a.me._getListPanel("Locations:",a.me._item.locations,{type:"Type",value:"value"},a.me._locationTypes).wrap(new Element("div",{"class":"col-sm-4 locations-panel"}))})}).insert({bottom:new Element("div",{"class":"row"}).insert({bottom:new Element("span",{"class":"btn btn-primary pull-right col-sm-4","data-loading-text":"saving ..."}).update("Save").observe("click",function(){a.me._submitSave(this)})})})})});return a.newDiv},_bindDatePicker:function(){var a={};a.me=this;$$(".datepicker").each(function(b){if(!b.hasClassName("datepicked")){a.me._signRandID(b);a.picker=new Prado.WebUI.TDatePicker({ID:b.id,InputMode:"TextBox",Format:"yyyy-MM-dd 00:00:00",FirstDayOfWeek:1,CalendarStyle:"default",FromYear:2009,UpToYear:2024,PositionMode:"Bottom",ClassName:"datepicker-layer-fixer"});b.store("picker",a.picker)}});return a.me},bindAllEventNObjects:function(){var a={};a.me=this;a.me._bindDatePicker();$$("textarea.rich-text-editor").each(function(b){a.me._loadRichTextEditor(b)});return a.me},refreshParentWindow:function(){var a={};a.me=this;if(!window.opener){return}a.parentWindow=window.opener;a.row=$(a.parentWindow.document.body).down("#"+a.parentWindow.pageJs.resultDivId+" .product_item[product_id="+a.me._item.id+"]");if(a.row){a.row.replace(a.parentWindow.pageJs._getResultRow(a.me._item));if(a.row.hasClassName("success")){a.row.addClassName("success")}}}});