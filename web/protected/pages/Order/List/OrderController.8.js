var PageJs=new Class.create();PageJs.prototype=Object.extend(new BPCPageJs(),{resultDivId:"",searchDivId:"",totalNoOfItemsId:"",_pagination:{pageNo:1,pageSize:10},_searchCriteria:{},_infoTypes:{},orderStatuses:[],_loadChosen:function(){jQuery(".chosen").chosen({disable_search_threshold:10,no_results_text:"Oops, nothing found!",width:"95%"});return this},_bindSearchKey:function(){var a={};a.me=this;$("searchDiv").getElementsBySelector("[search_field]").each(function(b){b.observe("keydown",function(c){a.me.keydown(c,function(){$(a.me.searchDivId).down("#searchBtn").click()})})});return this},_loadStatuses:function(b){this.orderStatuses=b;var a={};a.me=this;a.statusBox=$(a.me.searchDivId).down("#orderStatusId");a.me.orderStatuses.each(function(c){a.statusBox.insert({bottom:new Element("option",{value:c.id}).update(c.name)})});return this},setSearchCriteria:function(b){var a={};a.me=this;a.searchPanel=$(a.me.searchDivId);$H(b).each(function(c){a.field=c.key;a.value=c.value;a.fieldBox=a.searchPanel.down('[search_field="'+a.field+'"]');if(a.fieldBox){a.optlength=a.fieldBox.options.length;for(a.i=0;a.i<a.optlength;a.i++){if(a.value.indexOf(a.fieldBox.options[a.i].value*1)>=0){a.fieldBox.options[a.i].selected=true}}}});a.me._loadChosen()._bindSearchKey();return this},getSearchCriteria:function(){var a={};a.me=this;if(a.me._searchCriteria===null){a.me._searchCriteria={}}a.nothingTosearch=true;$(a.me.searchDivId).getElementsBySelector("[search_field]").each(function(b){a.me._searchCriteria[b.readAttribute("search_field")]=$F(b);if(($F(b) instanceof Array&&$F(b).size()>0)||(typeof $F(b)==="string"&&!$F(b).blank())){a.nothingTosearch=false}});if(a.nothingTosearch===true){a.me._searchCriteria=null}return this},getResults:function(c,a){var b={};b.me=this;b.reset=(c||false);if(b.me._searchCriteria===null){alert("Nothing to search!");return}if(b.reset===true){b.me._pagination.pageNo=1}b.me._pagination.pageSize=(a||b.me._pagination.pageSize);b.me.postAjax(b.me.getCallbackId("getOrders"),{pagination:b.me._pagination,searchCriteria:b.me._searchCriteria},{onLoading:function(){jQuery("#"+b.me.searchDivId+" #searchBtn").button("loading")},onSuccess:function(d,g){try{b.result=b.me.getResp(g,false,true);if(!b.result){return}$(b.me.totalNoOfItemsId).update(b.result.pageStats.totalRows);b.resultDiv=$(b.me.resultDivId);if(b.reset===true){b.titleRow={orderNo:"Order Info.",custName:"Customer Name",shippingAddr:"Shipping Address",invNo:"Invoice No.",status:{name:"Status"},totalDue:"Total Due",passPaymentCheck:"Payment Cleared?"};b.resultDiv.update(b.me._getResultRow(b.titleRow,true).wrap(new Element("thead")))}b.resultDiv.getElementsBySelector(".paginWrapper").each(function(e){e.remove()});b.tbody=$(b.resultDiv).down("tbody");if(!b.tbody){$(b.resultDiv).insert({bottom:b.tbody=new Element("tbody")})}b.result.items.each(function(e){b.tbody.insert({bottom:b.me._getResultRow(e)})});if(b.result.pageStats.pageNumber<b.result.pageStats.totalPages){b.resultDiv.insert({bottom:b.me._getNextPageBtn().addClassName("paginWrapper")})}b.resultDiv.getElementsBySelector(".popovershipping.newPopover").each(function(e){e.removeClassName("newPopover");b.rowData=e.up(".order_item").retrieve("data");jQuery("#"+e.id).popover({container:"body",title:'<div class="row"><div class="col-xs-10">Details for: '+b.rowData.orderNo+'</div><div class="col-xs-2"><a class="pull-right" href="javascript:void(0);" onclick="jQuery(\'#'+e.id+"').popover('hide');\"><strong>&times;</strong></a></div></div>",content:jQuery(".popover_content",jQuery("#"+e.id)).html(),html:true,placement:"right",trigger:"manual"})})}catch(f){alert(f)}jQuery("#"+b.me.searchDivId+" #searchBtn").button("reset")}})},_getNextPageBtn:function(){var a={};a.me=this;return new Element("tfoot").insert({bottom:new Element("tr").insert({bottom:new Element("td",{colspan:"5","class":"text-center"}).insert({bottom:new Element("span",{"class":"btn btn-primary","data-loading-text":"Fetching more results ..."}).update("Show More").observe("click",function(){a.me._pagination.pageNo=a.me._pagination.pageNo*1+1;jQuery(this).button("loading");a.me.getResults()})})})})},_getOrderDetailsDiv:function(a){var b={};b.me=this;b.custName=a.infos[b.me._infoTypes.custName][0].value;b.custEmail=a.infos[b.me._infoTypes.custEmail][0].value;return new Element("div").insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-user" title="Customer Name"></span>: '+b.custName)}).insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-envelope" title="Customer Email"></span>: <a href="mailto:'+b.custEmail+'">'+b.custEmail+"</a>")}).insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-shopping-cart" title="Order Date"></span>: '+a.orderDate)}).insert({bottom:new Element("div").update("<strong>Shipping</strong>:")}).insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-user" title="Customer Name"></span>: '+a.address.shipping.contactName)}).insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-phone-alt" title="Phone"></span>: '+a.address.shipping.contactNo)}).insert({bottom:new Element("div").update('<span class="glyphicon glyphicon-map-marker" title="Address"></span>: '+a.address.shipping.full)})},_getTitledDiv:function(b,a){return new Element("div",{"class":"field_div"}).insert({bottom:new Element("span",{"class":"inlineblock title"}).update(b)}).insert({bottom:new Element("span",{"class":"inlineblock divcontent"}).update(a)})},_openDetailsPage:function(b){var a={};a.me=this;jQuery.fancybox({width:"95%",height:"95%",autoScale:false,autoDimensions:false,fitToView:false,autoSize:false,type:"iframe",href:"/orderdetails/"+b.id+".html",beforeClose:function(){if($(a.me.resultDivId).down(".order_item[order_id="+b.id+"]")){$(a.me.resultDivId).down(".order_item[order_id="+b.id+"]").replace(a.me._getResultRow($$("iframe.fancybox-iframe").first().contentWindow.pageJs._order))}}});return a.me},_getOpenDetailBtn:function(b){var a={};a.me=this;return new Element("a",{href:"javascript: void(0)",title:"Click to view the order"}).insert({bottom:new Element("span",{"class":"glyphicon glyphicon-new-window"})}).observe("click",function(){a.me._openDetailsPage(b)})},_getOrderInfoCell:function(b){var a={};a.me=this;a.quantity="n/a";a.custName="n/a";a.custEmail="n/a";if(b.infos&&b.infos!==null){if(a.me._infoTypes.qty in b.infos&&b.infos[a.me._infoTypes.qty].length>0){a.quantity=b.infos[a.me._infoTypes.qty][0].value}if(a.me._infoTypes.custName in b.infos&&b.infos[a.me._infoTypes.custName].length>0){a.custName=b.infos[a.me._infoTypes.custName][0].value}if(a.me._infoTypes.custEmail in b.infos&&b.infos[a.me._infoTypes.custEmail].length>0){a.custEmail=b.infos[a.me._infoTypes.custEmail][0].value}}return new Element("div").insert({bottom:a.me._getOpenDetailBtn(b)}).insert({bottom:" "}).insert({bottom:new Element("span").insert({bottom:new Element("a",{id:"orderno-btn-"+b.id,"class":"orderNo visible-xs visible-sm visible-md visible-lg newPopover popovershipping",href:"javascript:void(0);"}).update(b.orderNo).insert({bottom:new Element("div",{style:"display: none;","class":"popover_content"}).update(a.me._getOrderDetailsDiv(b))}).observe("click",function(){jQuery(this).popover("show");jQuery(".popovershipping").not(this).popover("hide")}).observe("dblclick",function(){jQuery(this).popover("hide");a.me._openDetailsPage(b)})})})},_getPaymentCell:function(b){var a={};a.me=this;return new Element("a",{href:"javascript: void(0);"}).insert({bottom:(!b.passPaymentCheck?"":new Element("span",{title:(b.totalDue===0?"Full Paid":"Short Paid"),"class":(b.totalDue===0?"text-success":"text-danger")}).update(new Element("span",{"class":"glyphicon "+(b.totalDue===0?"glyphicon-ok-sign":"glyphicon-warning-sign")})))}).insert({bottom:" "}).insert({bottom:new Element("span").update(a.me.getCurrency(b.totalDue)).writeAttribute("title","Total Due Amount:"+a.me.getCurrency(b.totalDue))}).observe("click",function(){a.me._openDetailsPage(b)})},_getPurchasingCell:function(b){var a={};a.me=this;a.statusId_stockchecked=["4","5","6","7","8"];a.statusId_stockchecked_not_passed=["4","6"];a.hasCheckedStock=(a.statusId_stockchecked.indexOf(b.status.id)>=0);a.stockChkedWIssues=(a.statusId_stockchecked_not_passed.indexOf(b.status.id)>=0);return new Element("div").insert({bottom:(!a.hasCheckedStock?"":new Element("a",{href:"javascript: void(0);","class":(!a.stockChkedWIssues?"text-success":"text-danger"),title:(!b.stockChkedWIssues?"Stock checked":"insufficient stock")}).update(new Element("span",{"class":"glyphicon "+(!a.stockChkedWIssues?"glyphicon-ok-sign":"glyphicon-warning-sign")})).observe("click",function(){a.me._openDetailsPage(b)}))})},_getWarehouseCell:function(b){var a={};a.me=this;a.statusId_whchecked=["6","7","8"];a.statusId_whchecked_not_passed=["6"];a.hasChecked=(a.statusId_whchecked.indexOf(b.status.id)>=0);a.chkedWIssues=(a.statusId_whchecked_not_passed.indexOf(b.status.id)>=0);return new Element("div").insert({bottom:(!a.hasChecked?"":new Element("a",{href:"javascript: void(0);","class":(!a.chkedWIssues?"text-success":"text-danger"),title:(!b.chkedWIssues?"Stock Handled successfully":"insufficient stock")}).update(new Element("span",{"class":"glyphicon "+(!a.chkedWIssues?"glyphicon-ok-sign":"glyphicon-warning-sign")})).observe("click",function(){a.me._openDetailsPage(b)}))})},_getResultRow:function(c,a){var b={};b.me=this;b.isTitle=(a||false);b.row=new Element("tr",{"class":(b.isTitle===true?"":"order_item"),order_id:c.id}).store("data",c).insert({bottom:new Element("td",{"class":"orderInfo"}).update(b.isTitle?c.orderNo:b.me._getOrderInfoCell(c))}).insert({bottom:new Element("td",{"class":"status col-middle",order_status:c.status.name}).update(c.status?c.status.name:"")}).insert({bottom:new Element("td",{"class":"text-right",payment:true}).update(b.isTitle?"Payments":b.me._getPaymentCell(c))}).insert({bottom:new Element("td",{"class":"text-center",purchasing:true}).update(b.isTitle?"Purchasing":b.me._getPurchasingCell(c))}).insert({bottom:new Element("td",{"class":"text-center",warehouse:true}).update(b.isTitle?"Warehouse":b.me._getWarehouseCell(c))});return b.row}});