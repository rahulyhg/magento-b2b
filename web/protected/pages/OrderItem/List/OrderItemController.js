var PageJs=new Class.create();PageJs.prototype=Object.extend(new BPCPageJs(),{resultDivId:"",searchDivId:"",searchBtnId:"searchBtn",totalNoOfItemsId:"",_pagination:{pageNo:1,pageSize:30},_searchCriteria:{},_loadChosen:function(){$$(".chosen").each(function(a){a.store("chosen",new Chosen(a,{disable_search_threshold:10,no_results_text:"Oops, nothing found!"}))});return this},_bindSearchKey:function(){var a={};a.me=this;$(a.me.searchDivId).getElementsBySelector("[search_field]").each(function(b){b.observe("keydown",function(c){a.me.keydown(c,function(){$("searchBtn").click()})})});return this},init:function(){this._bindSearchKey()._loadChosen();return this},setSearchCriteria:function(b){var a={};a.me=this;$(a.me.searchDivId).getElementsBySelector("[search_field]").each(function(c){a.field=c.readAttribute("search_field");if(b[a.field]){$(c).setValue(b[a.field])}});return this},getSearchCriteria:function(){var a={};a.me=this;a.me._searchCriteria={};a.nothingTosearch=true;$(a.me.searchDivId).getElementsBySelector("[search_field]").each(function(b){a.me._searchCriteria[b.readAttribute("search_field")]=$F(b);if(($F(b) instanceof Array&&$F(b).size()>0)||(typeof $F(b)==="string"&&!$F(b).blank())){a.nothingTosearch=false}});if(a.nothingTosearch===true){a.me._searchCriteria=null}return this},_getResultRow:function(c,a){var b={};b.me=this;b.newDiv=new Element("div",{"class":"row",item_id:c.id}).store("data",c).insert({bottom:new Element("span",{"class":"cell  productsku"}).update(c.product.sku)}).insert({bottom:new Element("span",{"class":"cell  productname"}).update(c.product.name)}).insert({bottom:new Element("span",{"class":"cell  orderno"}).update(b.isTitle?c.order.orderNo:new Element("div",{"class":"orderNolink cuspntr"}).update(c.order.orderNo).observe("click",function(){jQuery.fancybox({width:"80%",height:"90%",autoScale:true,type:"iframe",href:"/orderdetails/"+c.id+".html",beforeClose:function(){b.items=$$("iframe.fancybox-iframe").first().contentWindow.pageJs._orderItems;if(b.items&&b.items.size()>0){b.items.each(function(d){b.itemRow=$(b.me.resultDivId).down(".row[item_id="+c.id+"]");if(b.itemRow){b.itemRow.replace(b.me._getResultRow(d))}})}}})}))}).insert({bottom:new Element("span",{"class":"cell  orderstatus"}).update(c.order.status.name)}).insert({bottom:new Element("span",{"class":"cell  qty"}).update(c.qtyOrdered)}).insert({bottom:new Element("span",{"class":"cell  isordered"}).update(a===true?c.isOrdered:(c.isOrdered?new Element("span",{"class":"ticked inlineblock"}):""))}).insert({bottom:new Element("span",{"class":"cell  eta"}).update(c.eta)}).insert({bottom:new Element("span",{"class":"cell  comments"}).update(a===true?"Comments":"")});return b.newDiv},_getNextPageBtn:function(){var a={};a.me=this;return new Element("div",{"class":"pagination"}).insert({bottom:new Element("span",{"class":"button"}).update("Show More").observe("click",function(){a.me._pagination.pageNo=a.me._pagination.pageNo*1+1;$(this).update("Fetching more results ...").addClassName("disabled");a.me.getResults()})})},getResults:function(c,a){var b={};b.me=this;if(b.me._searchCriteria===null){alert("Nothing to search!");return}b.me.postAjax(b.me.getCallbackId("getOrderitems"),{searchCriteria:b.me._searchCriteria,pagination:b.me._pagination},{onLoading:function(d,e){$(b.me.searchBtnId).store("orignValue",$F(b.me.searchBtnId)).addClassName("disabled").setValue("searching ...").disabled=true},onComplete:function(d,g){try{b.result=b.me.getResp(g,false,true);b.resultDiv=$(b.me.resultDivId);b.resultDiv.getElementsBySelector(".paginWrapper").each(function(e){e.remove()});if(c===true){b.resultDiv.update(b.me._getResultRow({order:{orderNo:"ORDER NO",status:{name:"Order Status"}},product:{sku:"SKU",name:"Product Name"},qtyOrdered:"QTY",eta:"ETA",isOrdered:"Ordered?"},true).addClassName("header"))}b.result.items.each(function(e){b.resultDiv.insert({bottom:b.me._getResultRow(e)})});if(b.result.pageStats.pageNumber<b.result.pageStats.totalPages){b.resultDiv.insert({bottom:b.me._getNextPageBtn().addClassName("paginWrapper")})}}catch(f){alert(f)}$(b.me.searchBtnId).removeClassName("disabled").setValue($(b.me.searchBtnId).retrieve("orignValue")).disabled=false}})}});