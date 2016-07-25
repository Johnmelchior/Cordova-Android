
if(typeof LITHIUM=='undefined'){var LITHIUM={};};

LITHIUM.Loader=(function(){var functionCache=[];var loaded=false;return{"onLoad":function(func){if(typeof func==="function"){if(loaded===true){func();}else{functionCache.push(func);}}},getOnLoadFunctions:function(){return functionCache;},setLoaded:function(){loaded=true;},isLoaded:function(){return loaded;}}})();

if(typeof LITHIUM.Components==='undefined'){LITHIUM.Components={};}
LITHIUM.Components.render=function(componentId,data,optionsParam){var runner=function(){var requestUrl=LITHIUM.Components.renderUrl(componentId);var options={type:"GET",dataType:"json"};LITHIUM.jQuery.extend(options,optionsParam||{});if(!options.hasOwnProperty("url")){LITHIUM.jQuery.extend(options,{url:requestUrl});}
options.data=data;LITHIUM.jQuery.ajax(options);};if(LITHIUM.Loader.isLoaded()===true){runner();}else{LITHIUM.Loader.onLoad(runner);}};LITHIUM.Components.renderUrl=function(componentId,parameters){var url=LITHIUM.Components.RENDER_URL;LITHIUM.jQuery.each({"component-id":componentId},function(key,value){url=url.replace(new RegExp("#{"+key+"}","g"),value);});if(typeof parameters!=="undefined"){url+="?"+LITHIUM.jQuery.param(parameters);}
return url;};LITHIUM.Components.renderInPlace=function(componentId,parametersParam,optionsParam,shellClientId,scriptElementSelector,containerSelector){var placeHolderId;var placeholderDiv;if(shellClientId){placeHolderId=shellClientId;}else if(LITHIUM.Loader.isLoaded()===false){placeHolderId=new Date().getTime().toString()+Math.floor(Math.random()*10000000+1);placeholderDiv="<div id='@id' class='@class'></div>".replace("@id",placeHolderId).replace("@class",LITHIUM.Css.BASE_LAZY_LOAD);document.write(placeholderDiv);}
var loadRunner=function(){var parameters=parametersParam||{};var options=optionsParam||{};LITHIUM.jQuery.extend(parameters,{"renderedScripts":LITHIUM.RenderedScripts.toString(),"component-id":componentId});LITHIUM.jQuery.extend(options,{"success":function(data){var content=data.content;if(LITHIUM.AngularSupport.isAngularEnabled()){content=LITHIUM.AngularSupport.compile(content);}
LITHIUM.jQuery("#"+placeHolderId).replaceWith(content);LITHIUM.AjaxSupport.ScriptsProcessor.handleScriptEvaluation(data);if(containerSelector){LITHIUM.jQuery(containerSelector).trigger("LITHIUM:ajaxSuccess:renderInPlace",{"componentId":componentId});}
if(scriptElementSelector){setTimeout(function(){LITHIUM.jQuery(scriptElementSelector).remove();},10);}},"error":function(request,textStatus,errorThrown){var placeholder=LITHIUM.jQuery("#"+placeHolderId);if(request.readyState==0||request.status==0){placeholder.html("");}
else{placeholder.html("<span class=\"lia-ajax-error-text\">"+optionsParam.errorMessage+"</span>");}
placeholder.removeClass(LITHIUM.Css.BASE_LAZY_LOAD);}});LITHIUM.Components.render(componentId,parameters,options);};if(LITHIUM.Loader.isLoaded()===false){LITHIUM.Loader.onLoad(loadRunner);}else{loadRunner();}};

LITHIUM.LiModernizr=function(){var docElement=document.documentElement;docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(" js");}();

function AC_AddExtension(src,ext)
{if(src.indexOf('?')!=-1)
return src.replace(/\?/,ext+'?');else
return src+ext;}
function AC_Generateobj(objAttrs,params,embedAttrs)
{var str='<object ';for(var i in objAttrs)
str+=i+'="'+objAttrs[i]+'" ';str+='>';for(var i in params)
str+='<param name="'+i+'" value="'+params[i]+'" /> ';str+='<embed ';for(var i in embedAttrs)
str+=i+'="'+embedAttrs[i]+'" ';str+=' ></embed></object>';document.write(str);}
function AC_FL_RunContent(){var ret=AC_GetArgs
(arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs);}
function AC_SW_RunContent(){var ret=AC_GetArgs
(arguments,".dcr","src","clsid:166B1BCA-3F9C-11CF-8075-444553540000",null);AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs);}
function AC_GetArgs(args,ext,srcParamName,classid,mimeType){var ret=new Object();ret.embedAttrs=new Object();ret.params=new Object();ret.objAttrs=new Object();for(var i=0;i<args.length;i=i+2){var currArg=args[i].toLowerCase();switch(currArg){case"classid":break;case"pluginspage":ret.embedAttrs[args[i]]=args[i+1];break;case"src":case"movie":args[i+1]=AC_AddExtension(args[i+1],ext);ret.embedAttrs["src"]=args[i+1];ret.params[srcParamName]=args[i+1];break;case"onafterupdate":case"onbeforeupdate":case"onblur":case"oncellchange":case"onclick":case"ondblClick":case"ondrag":case"ondragend":case"ondragenter":case"ondragleave":case"ondragover":case"ondrop":case"onfinish":case"onfocus":case"onhelp":case"onmousedown":case"onmouseup":case"onmouseover":case"onmousemove":case"onmouseout":case"onkeypress":case"onkeydown":case"onkeyup":case"onload":case"onlosecapture":case"onpropertychange":case"onreadystatechange":case"onrowsdelete":case"onrowenter":case"onrowexit":case"onrowsinserted":case"onstart":case"onscroll":case"onbeforeeditfocus":case"onactivate":case"onbeforedeactivate":case"ondeactivate":case"type":case"codebase":ret.objAttrs[args[i]]=args[i+1];break;case"width":case"height":case"align":case"vspace":case"hspace":case"class":case"title":case"accesskey":case"name":case"id":case"tabindex":ret.embedAttrs[args[i]]=ret.objAttrs[args[i]]=args[i+1];break;default:ret.embedAttrs[args[i]]=ret.params[args[i]]=args[i+1];}}
ret.objAttrs["classid"]=classid;if(mimeType)ret.embedAttrs["type"]=mimeType;return ret;}
var AC_runMinavox=function(width,height,cid,pid,vid,outpt){return AC_FL_RunContent('codebase','https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0','width',width,'height',height,'src','http://www1.savisys.com/saviUsr/publicViewer_Ipsos?cid='+cid+'&uid=1&pid='+pid+'&iid='+vid+'&inpt=0&outpt='+outpt+'&srv=www1.savisys.com&fms=media1.savisys.com&a=0&b=0&c=0&d=0&q=&g=','quality','high','pluginspage','https://www.macromedia.com/go/getflashplayer','wmode','transparent','allowScriptAccess','sameDomain','id','public','bgcolor','#FFFFFF','name','singleViewer','menu','false','movie','http://www1.savisys.com/saviUsr/publicViewer_Ipsos?cid='+cid+'&uid=1&pid='+pid+'&iid='+vid+'&inpt=0&outpt='+outpt+'&srv=www1.savisys.com&fms=media1.savisys.com&a=0&b=0&c=0&d=0&q=&g=','salign','');}
;(function(){LITHIUM.Globals=function(){var globals={};function preventGlobals(globalNames){for(var i=0;i<globalNames.length;i++){var globalName=globalNames[i];if(window.hasOwnProperty(globalName)&&window[globalName]!==undefined){globals[globalName]=window[globalName];window[globalName]=undefined;}}}
function restoreGlobals(globalNames){for(var i=0;i<globalNames.length;i++){var globalName=globalNames[i];if(globals.hasOwnProperty(globalName)){window[globalName]=globals[globalName];}}}
return{preventGlobals:preventGlobals,restoreGlobals:restoreGlobals};}();})();
;(function($){if(Element&&!Element.prototype.matches){var proto=Element.prototype;proto.matches=proto.matchesSelector||proto.mozMatchesSelector||proto.msMatchesSelector||proto.oMatchesSelector||proto.webkitMatchesSelector;}})(LITHIUM.jQuery);
;(function(){LITHIUM.AngularSupport=function(){var app;var injector;var options={coreModule:'li.community',coreModuleDeps:[],noConflict:true,bootstrapElementSelector:'.lia-page .min-width .lia-content',bootstrapApp:true,debugEnabled:false,angularEscapeBracketElements:'.lia-message-body, .lia-message-editor',useCsp:true}
var escapeAttrs=['alt','title','caption','value','addthis:title','href','src'];var replaceChar='__li__ng_escape__}';var replaceRegex=new RegExp(/__li__ng_escape__}/g);function init(){var options=getOptions();var bootModules=[];var bootstrapElement=document.querySelector(options.bootstrapElementSelector);bootModules.push(options.coreModule);if(options.customerModules&&options.customerModules.length>0){bootModules.concat(options.customerModules);}
if(options.useCsp){bootstrapElement.setAttribute('ng-csp','no-unsafe-eval');}
app=LITHIUM.angular.module(options.coreModule,options.coreModuleDeps);app.config(['$locationProvider','$provide','$injector','$logProvider',function($locationProvider,$provide,$injector,$logProvider){var baseElm=document.createElement('base');baseElm.setAttribute('href',location.pathname);document.getElementsByTagName('head')[0].appendChild(baseElm);if(window.history&&window.history.pushState){$locationProvider.html5Mode({enabled:true,requireBase:true,rewriteLinks:false}).hashPrefix('!');}
$logProvider.debugEnabled(options.debugEnabled);if($injector.has('$uibModal')){$provide.decorator('$uibModal',function($delegate){var open=$delegate.open;$delegate.open=function(opts){opts.backdropClass=(opts.backdropClass?opts.backdropClass+' ':'')+'lia-modal-backdrop';opts.windowClass=(opts.windowClass?opts.windowClass+' ':'')+'lia-modal-window';return open(opts);}
return $delegate;});}
if($injector.has('uibDropdownConfig')){var uibDropdownConfig=$injector.get('uibDropdownConfig');uibDropdownConfig.openClass='lia-dropdown-open';}}]);if(options.bootstrapApp){safeCompile([bootstrapElement],function(){injector=LITHIUM.angular.bootstrap(bootstrapElement,bootModules);});}else{LITHIUM.Loader.onLoad(function(){injector=LITHIUM.angular.element(bootstrapElement).injector();});}
LITHIUM.Angular={app:app}
if(options.noConflict){}}
function isAngularEnabled(){return app!==undefined;}
function compile(content){var compiled;if(content===undefined||content===''){return content;}
injector.invoke(['$rootScope','$compile',function($rootScope,$compile){var $elm;try{$elm=LITHIUM.angular.element(content);}catch(e){$elm=LITHIUM.angular.element('<li:safe-wrapper>'+content+'</li:safe-wrapper>');}
safeCompile($elm,function(){compiled=$compile($elm)($rootScope);});$rootScope.$digest();}]);return compiled;}
function updateLocationUrl(url,replaceState){injector.invoke(['$location','$rootScope','$browser',function($location,$rootScope,$browser){url=(url==='')?'?':url;$location.url(url,replaceState);$rootScope.$apply();}]);}
function setOptions(newOptions){return extend(options,newOptions)}
function getOptions(){return options;}
function initGlobal(angular){LITHIUM.angular=angular;}
function extend(target,source){target=target||{};for(var prop in source){if(typeof source[prop]==='object'){target[prop]=extend(target[prop],source[prop]);}else{target[prop]=source[prop];}}
return target;}
function escapeBrackets(nodes){LITHIUM.angular.forEach(nodes,function(node){if(node.nodeType!==3){if(!node.hasAttribute('ng-non-bindable')){LITHIUM.angular.forEach(escapeAttrs,function(escapeAttr){var attrVal=node.getAttribute(escapeAttr);if(attrVal&&attrVal.indexOf('}')>-1){node.setAttribute(escapeAttr,escapeBracket(attrVal));}});if(node.nodeValue&&node.nodeValue.indexOf('}')){node.nodeValue=escapeBracket(node.nodeValue);}}}else if(node.nodeValue&&node.nodeValue.indexOf('}')){node.nodeValue=escapeBracket(node.nodeValue);}});}
function escapeBracket(str){return str&&str.replace(/}/g,replaceChar);}
function unescapeBrackets(nodes){LITHIUM.angular.forEach(nodes,function(node){if(node.nodeType!==3){if(!node.hasAttribute('ng-non-bindable')){LITHIUM.angular.forEach(escapeAttrs,function(escapeAttr){var attrVal=node.getAttribute(escapeAttr);if(attrVal&&attrVal.indexOf(replaceChar)>-1){node.setAttribute(escapeAttr,unescapeBracket(attrVal));}});}
if(node.nodeValue&&node.nodeValue.indexOf(replaceChar)){node.nodeValue=unescapeBracket(node.nodeValue);}}else if(node.nodeValue&&node.nodeValue.indexOf(replaceChar)){node.nodeValue=unescapeBracket(node.nodeValue);}});}
function unescapeBracket(str){return str&&str.replace(replaceRegex,'}');}
function textNodesUnder(elm){var node;var nodes=[];var walker=document.createTreeWalker(elm,NodeFilter.SHOW_TEXT,null,false);while(node=walker.nextNode()){nodes.push(node);}
return nodes;}
function safeCompile(elms,fn){var textNodes=[];LITHIUM.angular.forEach(elms,function(elm){var parentElms;if(elm&&elm.matches&&elm.matches(options.angularEscapeBracketElements)){parentElms=[elm];}else if(elm&&elm.querySelectorAll){parentElms=elm.querySelectorAll(options.angularEscapeBracketElements);}
LITHIUM.angular.forEach(parentElms,function(parentElm){if(parentElm.matches('img,input,li-image,a')||!parentElm.hasChildNodes()){textNodes.push(parentElm);}
textNodes=textNodes.concat(textNodesUnder(parentElm));});});escapeBrackets(textNodes);fn();unescapeBrackets(textNodes);}
return{preventGlobals:LITHIUM.Globals.preventGlobals,restoreGlobals:LITHIUM.Globals.restoreGlobals,init:init,compile:compile,isAngularEnabled:isAngularEnabled,updateLocationUrl:updateLocationUrl,setOptions:setOptions,getOptions:getOptions,initGlobal:initGlobal}}();})();
