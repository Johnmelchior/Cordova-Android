
if(jQuery.isLithium!==true){jQuery=LITHIUM.jQuery;}
;(function($LITH){LITHIUM.InformationBox=function(params){var component=$LITH(params.componentSelector);var $doc=$LITH(document);if(params.faceLinkUrl){component.click(function(){window.location.href=params.faceLinkUrl;});}
if(params.closeLinkSelector){var closeLink=$LITH(params.closeLinkSelector);if(closeLink.exists()){closeLink.click(function(){component.remove();return false;});}}
if($doc.data('li-information-box-hide-init')===undefined){$doc.data('li-information-box-hide-init',true);$doc.on(params.updateFeedbackEvent,function(event){$LITH(params.feedbackSelector).hide();});}};})(LITHIUM.jQuery);
;(function($LITH){LITHIUM.AjaxFeedback=function(feedbackSelector,hideFeedbackEvent,persistSelector){if(LITHIUM.AjaxFeedback.init!==true){LITHIUM.AjaxFeedback.init=true;$LITH(document).on(hideFeedbackEvent,function(){$LITH(feedbackSelector).not(persistSelector).children().hide();});}}})(LITHIUM.jQuery);
;(function($LITH){if(LITHIUM.InputEditForm===undefined){var forms=[];var bindPageShowOnce=false;LITHIUM.InputEditForm=function(formId,options){var liaBodyElement=$LITH(options.liaBodyTagId);var form=$LITH("#"+formId);forms.push(form);if(options.swallowEnterEvent){form.find(":input:not(:hidden,:submit,textarea)").keypress(function(event){return event.which!=13;});}
var formOptions=LITHIUM.jQuery.extend({useUnsavedDataWarning:false,unloadMessage:"",warnUnsavedDataActionCssClasses:[],ignoreDisableFormDuringSubmitCssClasses:[],ignoreOnChangeCssClasses:[],submitOnChange:false},options||{});var submitFormOnChange=function(event){var $target=$LITH(event.target);liaBodyElement.data("selectedSearchFilter",{value:$target.val(),type:$target.attr('type'),name:$target.attr('name')});var ignoreOnChange=false;var input=$LITH(event.target);$LITH.each(formOptions.ignoreOnChangeCssClasses,function(){if(input.hasClass(this)||input.closest("."+this).length>0){ignoreOnChange=true;return false;}});if(ignoreOnChange===false){form.data("lastUpdated",input);form.submit();}};if(formOptions.submitOnChange==true){var isOperaMini=(navigator.userAgent.indexOf('Opera Mini')>-1);if(isOperaMini){$LITH(":input",form).change(function(event){submitFormOnChange(event);});}else{$LITH(form).on("change",":input",function(event){submitFormOnChange(event);});}
if($LITH.browser.msie){$LITH(form).on("mousedown click",":input",function(event){var input=$LITH(event.target);var inputType=input.prop("type");var ignoreOnChange=false;$LITH.each(formOptions.ignoreOnChangeCssClasses,function(){if(input.hasClass(this)||input.closest("."+this).length>0){ignoreOnChange=true;return false;}});if(ignoreOnChange===false){if(event.type=="mousedown"){if(inputType==="radio"){input.data("alreadyChecked",$LITH(this).filter(":checked").length>0);}else if(inputType==="select-one"){input.data("alreadyChecked",true);}}else{var alreadyChecked=input.data("alreadyChecked");if(alreadyChecked===undefined||alreadyChecked===false){input.change();}}}});}}
var disableFormDuringSubmit=options.disableFormOnSubmit;var baseButtonCssSelector="."+LITHIUM.Css.BASE_BUTTON;var baseTabLiCssSelector="."+LITHIUM.Css.BASE_TABS_STANDARD+" li";var formActionButtons=form.find(baseButtonCssSelector,baseTabLiCssSelector);var clickElement;if(LITHIUM.useCheckOnline===true){formActionButtons.click(function(){clickElement=$LITH(this);});}
form.submit(function(event,verifiedOnline){var action;if(formOptions.hasOwnProperty("blockUI")){$LITH.blockUI({message:formOptions.blockUI,css:{border:'none','font-size':'12px','font-family':'arial','font-weight':'bold',padding:'20px',backgroundColor:'#EAE8E6','-webkit-border-radius':'5px','-moz-border-radius':'5px','border-radius':'5px',opacity:1.0,color:'#212721'}});}
if(disableFormDuringSubmit==true){$LITH.each(formOptions.ignoreDisableFormDuringSubmitCssClasses,function(){if($LITH(event.target).hasClass(this)){disableFormDuringSubmit=false;return false;}});}
if(disableFormDuringSubmit==true){disableFormActionButtons(formActionButtons,form);}
if(LITHIUM.useCheckOnline===true){if(clickElement!==undefined){action=form.find("input[name='"+clickElement.attr("name")+"X"+"']").val();}
if(action==="Submit"&&verifiedOnline!==true&&!event.isPropagationStopped()){event.stopImmediatePropagation();event.preventDefault();form.trigger("LITHIUM:checkOnline",{offline:function(){reenableFormActionButtons(formActionButtons,form,false);},online:function(){form.trigger("submit",true);}});}}});form.bind(formOptions.enableFormEvent,function(event){if(disableFormDuringSubmit==true){reenableFormActionButtons(formActionButtons,form,event.memo.useDisableAttr||false);}
if(formOptions.hasOwnProperty("blockUI")){$LITH.unblockUI();}});if(bindPageShowOnce===false){bindPageShowOnce=true;$LITH(window).bind("pageshow",function(event){if(event.originalEvent.persisted){for(i=0;i<forms.length;i++){forms[i].trigger(formOptions.enableFormEvent);}}});}
form.bind(options.disableFormEvent,function(event){if(event.memo.form===formId&&disableFormDuringSubmit){disableFormActionButtons(formActionButtons,form,event.memo.useDisableAttr||false);}});formActionButtons.click(function(){var clickElement=$LITH(this);$LITH.each(formOptions.ignoreDisableFormDuringSubmitCssClasses,function(){if(clickElement.hasClass(this)){disableFormDuringSubmit=false;return false;}});});if(formOptions.useUnsavedDataWarning===true){LITHIUM.FormWatch(form,formOptions.unloadMessage,formActionButtons,formOptions.warnUnsavedDataActionCssClasses,formOptions.buttonWrapperSelector,formOptions.showUnsavedDataWarningDataKey);}
var disableFormActionButtons=function(formActionButtons,form,useDisableAttr){if(form.data("validator")&&form.data("validator").numberOfInvalids()>0){return;}
$LITH(form).addClass(LITHIUM.Css.BASE_FORM_SUBMITTING);$LITH(formActionButtons).each(function(){var overlay=$LITH("<div/>").addClass(LITHIUM.Css.BASE_BUTTON_OVERLAY);var button=$LITH(this);button.addClass(LITHIUM.Css.BASE_DISABLED).after(overlay);var positionAnchor=this;if(button.hasClass(LITHIUM.Css.BASE_BUTTON)){positionAnchor=button.closest(options.buttonWrapperSelector).addClass(LITHIUM.Css.BASE_DISABLED).get(0)||this;}
overlay.clonePosition(positionAnchor);if(useDisableAttr===true){button.prop("disabled",true);}});};var reenableFormActionButtons=function(formActionButtons,form,useDisableAttr){$LITH(formActionButtons).each(function(){var button=$LITH(this);var overlay=button.siblings("div."+LITHIUM.Css.BASE_BUTTON_OVERLAY);if(overlay&&!overlay.prop("disabled")){overlay.remove();button.removeClass(LITHIUM.Css.BASE_DISABLED);button.closest(options.buttonWrapperSelector).removeClass(LITHIUM.Css.BASE_DISABLED);}
if(useDisableAttr===true){button.prop("disabled",false);}});$LITH(form).removeClass(LITHIUM.Css.BASE_FORM_SUBMITTING);};form.bind(options.disableFormButtonEvent,function(event){disableFormActionButtons([event.target],form,event.memo.useDisableAttr||false);});form.bind(options.enableFormButtonEvent,function(event){reenableFormActionButtons([event.target],form,event.memo.useDisableAttr||false);});var lastFilter=liaBodyElement.data("selectedSearchFilter");if(lastFilter){form.find(":input:not(:hidden)").each(function(){var $input=$LITH(this);if($input.attr('type')===lastFilter.type&&$input.attr('name')===lastFilter.name&&$input.val()===lastFilter.value){$input.focus();return false;}});liaBodyElement.removeData("selectedSearchFilter");}};LITHIUM.FormWatch=function(form,message,formActionButtons,warnUnsavedDataActionCssClasses,buttonWrapperSelector,showUnsavedDataWarningDataKey){var formActionIgnoresWarnUnsaved=false;var clickElement;formActionButtons.click(function(){clickElement=this;});form.submit(function(){formActionIgnoresWarnUnsaved=true;$LITH.each(warnUnsavedDataActionCssClasses,function(){if($LITH(clickElement).hasClass(this)){formActionIgnoresWarnUnsaved=false;}});});var formInputs=form.find(":input");formInputs.change(function(){form.data(showUnsavedDataWarningDataKey,true);});if($LITH.browser.msie){formInputs.focusout();}
$LITH(window).bind("beforeunload",function(){var showUnsavedDataWarning=form.data(showUnsavedDataWarningDataKey);if(formActionIgnoresWarnUnsaved===false&&showUnsavedDataWarning===true){form.removeClass(LITHIUM.Css.BASE_FORM_SUBMITTING);formActionButtons.each(function(){var element=$LITH(this);if(!element.prop("disabled")){element.removeClass(LITHIUM.Css.BASE_DISABLED);element.closest(buttonWrapperSelector).removeClass(LITHIUM.Css.BASE_DISABLED);}});form.find("."+LITHIUM.Css.BASE_BUTTON_OVERLAY).remove();return message;}});};LITHIUM.InputEditForm.fieldsetToggle=function(triggerSelector,fieldGroupSelector,triggerValue,triggerEvent){var triggerElements=$LITH(triggerSelector);var fieldsetElement=$LITH(fieldGroupSelector);triggerElements.bind(triggerEvent,function(){var element=$LITH(this);var inputType=element.prop("type");if(inputType=="checkbox"||inputType=="radio"){if(element.filter(":checked").val()==triggerValue){fieldsetElement.find(":input").prop("disabled",false);fieldsetElement.show();}else{fieldsetElement.hide();fieldsetElement.find(":input").prop("disabled",true);}}else{if(element.val()==triggerValue){fieldsetElement.find(":input").prop("disabled",false);fieldsetElement.show();}else{fieldsetElement.hide();fieldsetElement.find(":input").prop("disabled",true);}}});triggerElements.each(function(){var element=$LITH(this);var inputType=element.prop("type");if(inputType=="checkbox"||inputType=="radio"){if(element.filter(":checked").val()==triggerValue){fieldsetElement.find(":input").prop("disabled",false);fieldsetElement.safeShow();return false;}else{fieldsetElement.find(":input").prop("disabled",true);}}else{if(element.val()==triggerValue){fieldsetElement.find(":input").prop("disabled",false);fieldsetElement.safeShow();}else{fieldsetElement.find(":input").prop("disabled",true);}}});};}})(LITHIUM.jQuery);