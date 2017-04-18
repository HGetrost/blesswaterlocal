(function(e){function t(t){this.browser=t,this.propertyInput=t.parents(".property-font-family-select"),this.hiddenInput=this.propertyInput.find("input.property-hidden-input"),this.setup=function(){var t=this;this.browser.find(".tab-content").each(function(){var n=e(this).find(".fonts-list ul"),r=_.debounce(function(){t.scrollWebFontLoader(n)},100);n.bind("scroll",r),t.initQuickSearch(e(this)),t.initPreview(e(this)),t.initSorting(e(this)),n.delegate(".use-font","click",function(){var n=e(this).parents("li").first(),r=e(this).parents(".tab-content").data("font-webfont-provider"),i=n.data("value"),s=e(this).siblings(".font-family").text(),o=n.css("font-family"),u=n.data("variants"),a="";u&&u.indexOf("regular")===-1&&(a="|"+u.join(","));var f=r!=0?r+"|"+i+a:i,l=t.propertyInput.find(".font-name");l.css("font-family",o),l.text(s),t.browser.find(".selected-font").removeClass("selected-font"),n.addClass("selected-font"),fontBrowserClose({data:{fontBrowser:t.browser}}),dataHandleDesignEditorInput({hiddenInput:t.hiddenInput,value:f,stack:o})})}),this.browser.tabs({selected:0,activate:function(n,r){var i=e(r.newPanel);if(i.data("fonts-loaded"))return;t.retrieveRemoteFonts(i,"popularity",!0,!0)}}),this.changeToSelectedFontProviderTab()},this.retrieveRemoteFonts=function(t,n,r,i){if(!t.data("font-load-with-ajax"))return;var s=this;createCog(t.find(".fonts-loading"),!0),t.find(".fonts-list ul").fadeOut(300),t.find(".fonts-loading").fadeIn(300),t.find(".fonts-filter").attr("disabled","disabled"),e.post(Headway.ajaxURL,{security:Headway.security,action:"headway_visual_editor",method:"fonts_list",sortby:n,provider:t.data("font-webfont-provider")},function(e){t.find(".fonts-loading").fadeOut(300),t.find("ul").hide().html(e).fadeIn(300,function(){s.scrollWebFontLoader(t.find("ul"))}),t.find(".fonts-filter").val(""),t.data("quicksearch").cache(),t.find(".fonts-filter").removeAttr("disabled");if(typeof i!="undefined"&&i&&s.hiddenInput.val().match(/\|/g)){var n=t.find('li[data-value="'+s.hiddenInput.val().split("|")[1]+'"]');n.length&&(n.addClass("selected-font"),t.find(".fonts-list ul").scrollTop(n.position().top))}else t.find(".fonts-list ul").scrollTop(0);t.data("fonts-loaded",!0)})},this.scrollWebFontLoader=function(t){var n=e(t.parents(".tab-content").get(0)),r=n.data("font-webfont-provider");if(t.parents(".font-provider-tab-content.ui-tabs-hide").length||!r)return;var i=[],s=t.scrollTop(),o=s+t.outerHeight();t.find("li").each(function(){var n=e(this).position().top+t.scrollTop(),r=n+e(this).outerHeight();if(!e(this).is(":visible")||e(this).data("loadedFont"))return;if(!(n<=o))return;if(!(r>=s))return;if(r>o)return!1;var u="";e(this).data("variants").indexOf("regular")===-1&&(u=":"+e(this).data("variants").join(",")),i.push(e(this).data("value")+u)});if(i.length){var u={},a="";_.each(i,function(e){var n=t.find('li[data-value="'+e+'"]');n.data("loadedFont",!0),a+=e.replace(" ","+")+"|"}),e("<link>").attr("type","text/css").attr("rel","stylesheet").attr("href","//fonts.googleapis.com/css?family="+a.substr(0,a.length-1)).appendTo("head").bind("load",function(){_.each(i,function(e){var n=t.find('li[data-value="'+e.split(":")[0]+'"]');n.find("span.font-family, span.font-preview-text").show().css("opacity",1)})})}},this.initQuickSearch=function(e){var t=e.attr("id"),n=e.find(".fonts-filter").quicksearch("#"+t+" .fonts-list ul li",{delay:750,noResults:"#"+t+" .fonts-list .fonts-noresults",loader:"#"+t+" .fonts-list .fonts-loading",bind:"keyup",onBefore:function(){e.find(".fonts-list ul").fadeOut(100)},onAfter:function(){e.find(".fonts-list ul").trigger("scroll").fadeIn(100)},prepareQuery:function(e){return new RegExp(e,"i")},testQuery:function(e,t,n){return e.test(jQuery.trim(t.replace("the quick brown fox jumps over the lazy dog.","")))}});e.data("quicksearch",n)},this.initPreview=function(t){var n=this;previewHtml=e('<div class="font-preview-overlay" style="display:none;"><span class="close-preview"></span><header><h4></h4><p><i class="icon-edit">&nbsp;</i><strong>click anywhere</strong> in preview text to edit and add your own</p></header><div class="editable allow-backspace-key" contenteditable="true"></div><footer><div class="tools"><span title="Reset Preview Text" class="reset-preview"></span><span title="Decrease Preview Size" class="size-down"></span><span title="Increase Preview Size" class="size-up"></span><span title="Use This Font" class="use-font"></span></div></footer></div>'),t.find(".fonts-list").after(previewHtml),this.defaultPreviewText="The quick brown fox jumps over the lazy dog.",this.defaultPreviewSize="24px",this.previewResize=function(e,t){var n=e.find(".editable"),r=n.css("font-size"),i=parseFloat(r,10)*t;n.css("font-size",i),localStorage.fontPreviewSize=n.css("font-size")},this.previewLoadFromStorage=function(e){var t=e.find(".editable");localStorage.getItem("fontPreviewText")?t.html(localStorage.fontPreviewText):t.html(n.defaultPreviewText),localStorage.getItem("fontPreviewSize")&&t.css("font-size",localStorage.fontPreviewSize)},this.previewSaveText=function(){localStorage.fontPreviewText=e(this).text()},this.previewReset=function(e){e.find(".editable").html(n.defaultPreviewText),e.find(".editable").css("font-size",n.defaultPreviewSize),localStorage.fontPreviewText=n.defaultPreviewText,localStorage.fontPreviewSize=n.defaultPreviewSize},t.find(".fonts-list ul").delegate("li .preview-font","click",function(){var t=e(this).parents("li").data("value"),r=e(this).parents("li").css("font-family"),i=e(this).parents(".fonts-list").siblings(".font-preview-overlay");i.data("font-value",t),i.data("font-name",e(this).parent().find(".font-family").text()),i.data("font-variants",e(this).parents("li").data("variants")),i.fadeIn(750),i.css("font-family",r),i.find("h4").html(e(this).parent().find(".font-family").text()+" <span>(Preview)</span>"),n.previewLoadFromStorage(i)}),t.find(".font-preview-overlay .size-up").on("click",function(){n.previewResize(e(this).parents(".font-preview-overlay"),1.1)}),t.find(".font-preview-overlay .size-down").on("click",function(){n.previewResize(e(this).parents(".font-preview-overlay"),.9)}),t.find(".font-preview-overlay .reset-preview").on("click",function(){n.previewReset(e(this).parents(".font-preview-overlay"))}),t.find(".font-preview-overlay .close-preview").on("click",function(){e(this).parents(".font-preview-overlay").fadeOut(750)}),t.find(".font-preview-overlay .editable").on("blur",this.previewSaveText),t.find(".font-preview-overlay .use-font").on("click",function(){var t=e(this).parents(".tab-content").data("font-webfont-provider"),r=e(this).parents(".font-preview-overlay").data("font-value"),i=e(this).parents(".font-preview-overlay").data("font-name"),s=e(this).parents(".font-preview-overlay").css("font-family"),o=e(this).parents(".font-preview-overlay").data("font-variants"),u="";o&&o.indexOf("regular")===-1&&(u="|"+o.join(","));var a=t!=0?t+"|"+r+u:r,f=n.propertyInput.find(".font-name");f.css("font-family",s),f.text(i),n.browser.find(".selected-font").removeClass("selected-font"),n.browser.find('li[data-value="'+r+'"]').addClass("selected-font"),fontBrowserClose({data:{fontBrowser:n.browser}}),dataHandleDesignEditorInput({hiddenInput:n.hiddenInput,value:a,stack:s})})},this.initSorting=function(t){var n=this;t.find(".fonts-search select").bind("change",function(){var t=e(this).val();n.retrieveRemoteFonts(e(this).parents(".tab-content"),t,!0)})},this.changeToSelectedFontProviderTab=function(){var e=this.hiddenInput.val();if(!e||!e.match(/\|/g)){var t=this.browser.find("#traditional-fonts"),n=t.find('li[data-value="'+e+'"]');n.length&&(n.addClass("selected-font"),setTimeout(function(){t.find(".fonts-list ul").scrollTop(n.position().top)},100))}else{var r=e.split("|");selectTab(+r[0]+"-fonts",this.browser)}}}(function(e,t,n,r){e.fn.quicksearch=function(n,r){var i,s,o,u,a="",f=this,l=e.extend({delay:100,selector:null,stripeRows:null,loader:null,noResults:"",matchedResultsCount:0,bind:"keyup",onBefore:function(){return},onAfter:function(){return},show:function(){this.style.display=""},hide:function(){this.style.display="none"},prepareQuery:function(e){return e.toLowerCase().split(" ")},testQuery:function(e,t,n){for(var r=0;r<e.length;r+=1)if(t.indexOf(e[r])===-1)return!1;return!0}},r);return this.go=function(){var e=0,t=0,n=!0,r=l.prepareQuery(a),i=a.replace(" ","").length===0;for(var e=0,u=o.length;e<u;e++)i||l.testQuery(r,s[e],o[e])?(l.show.apply(o[e]),n=!1,t++):l.hide.apply(o[e]);return n?this.results(!1):(this.results(!0),this.stripe()),this.matchedResultsCount=t,this.loader(!1),l.onAfter(),this},this.search=function(e){a=e,f.trigger()},this.currentMatchedResults=function(){return this.matchedResultsCount},this.stripe=function(){if(typeof l.stripeRows=="object"&&l.stripeRows!==null){var t=l.stripeRows.join(" "),n=l.stripeRows.length;u.not(":hidden").each(function(r){e(this).removeClass(t).addClass(l.stripeRows[r%n])})}return this},this.strip_html=function(t){var n=t.replace(new RegExp("<[^<]+>","g"),"");return n=e.trim(n.toLowerCase()),n},this.results=function(t){return typeof l.noResults=="string"&&l.noResults!==""&&(t?e(l.noResults).hide():e(l.noResults).show()),this},this.loader=function(t){return typeof l.loader=="string"&&l.loader!==""&&(t?e(l.loader).show():e(l.loader).hide()),this},this.cache=function(){u=e(n),typeof l.noResults=="string"&&l.noResults!==""&&(u=u.not(l.noResults));var t=typeof l.selector=="string"?u.find(l.selector):e(n).not(l.noResults);return s=t.map(function(){return f.strip_html(this.innerHTML)}),o=u.map(function(){return this}),a=a||this.val()||"",!0},this.trigger=function(){return this.loader(!0),l.onBefore(),t.clearTimeout(i),i=t.setTimeout(function(){f.go()},l.delay),this},this.cache(),this.results(!0),this.stripe(),this.loader(!1),this.each(function(){e(this).bind(l.bind,function(){a=e(this).val(),f.trigger()})})}})(jQuery,this,document),fontBrowserOpen=function(n){var r=e(this).siblings(".font-browser"),i=e(this).parents(".design-editor-property-font-family").offset();r.css({top:i.top-r.outerHeight(!0),left:i.left});var s=parseInt(r.css("left").replace("px","")),o=s+r.outerWidth(!0);if(o>e(window).width()){var u=e(window).width()-o;r.css({left:s+u-20})}e("div.sub-tabs-content-container").css("overflow-y","hidden"),r.data("setup")!==!0&&(r.data("obj",new t(r)),r.data("obj").setup(),r.data("setup",!0)),r.data("visible")!==!0?(r.fadeIn(150),r.data("visible",!0),e(document).bind("mousedown",{fontBrowser:r},fontBrowserClose),Headway.iframe.contents().bind("mousedown",{fontBrowser:r},fontBrowserClose),e(window).bind("resize",{fontBrowser:r},fontBrowserClose)):(r.fadeOut(150),r.data("visible",!1),e("div.sub-tabs-content-container").css("overflow-y","auto"),e(document).unbind("mousedown",fontBrowserClose),Headway.iframe.contents().unbind("mousedown",fontBrowserClose),e(window).unbind("resize",fontBrowserClose))},fontBrowserClose=function(t){if(e(t.target).parents(".design-editor-property-font-family").length===1)return;var n=t.data.fontBrowser;n.fadeOut(150),n.data("visible",!1),e("div.sub-tabs-content-container").css("overflow-y","auto"),e(document).unbind("mousedown",fontBrowserClose),Headway.iframe.contents().unbind("mousedown",fontBrowserClose),e(window).unbind("resize",fontBrowserClose)},webFontQuickLoad=function(e){if(!e.match(/\|/g))return;var t=e.split("|"),n=e,r=t[0],e=t[1],i="";if(typeof t[2]!="undefined"&&t[2])var i=":"+t[2];var s={fontactive:function(e,t){jQuery("span.font-name[data-webfont-value='"+n+"']").animate({opacity:1})}};return s[r]={families:[e+i]},WebFont.load(s)}})(jQuery);