(function(){var f=YAHOO.util.Dom,j=YAHOO.util.Event;var b=Alfresco.util.encodeHTML;Alfresco.dashlet.DynamicWelcome=function h(l,m,p,n,o,q){Alfresco.dashlet.DynamicWelcome.superclass.constructor.call(this,"Alfresco.dashlet.DynamicWelcome",l,["button"]);this.name="Alfresco.dashlet.DynamicWelcome";this.dashboardUrl=m;this.createSite=null;this.dashboardType=p;this.site=n;this.siteTitle=decodeURIComponent(o);this.docsEdition=q;this.services.preferences=new Alfresco.service.Preferences();return this};YAHOO.extend(Alfresco.dashlet.DynamicWelcome,Alfresco.component.Base,{site:"",dashboardType:"",dashboardUrl:"",closeDialog:null,docsEdition:"",createSite:null,onReady:function d(){this.widgets.hideButton=Alfresco.util.createYUIButton(this,"hide-button",this.onHideButtonClick);if(this.dashboardType=="user"){j.addListener(this.id+"-get-started-panel-container","click",function(){location.href=this.msg("welcome.user.clickable-content-link",this.docsEdition)},this,true)}j.addListener(this.id+"-createSite-button","click",this.onCreateSiteLinkClick,this,true);j.addListener(this.id+"-requestJoin-button","click",this.onRequestJoinLinkClick,this,true)},onCreateSiteLinkClick:function a(l){if(this.createSite===null){this.createSite=Alfresco.module.getCreateSiteInstance()}this.createSite.show();j.stopEvent(l)},onRequestJoinLinkClick:function e(l){Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.PROXY_URI+"api/sites/"+encodeURIComponent(Alfresco.constants.SITE)+"/invitations",dataObj:{invitationType:"MODERATED",inviteeUserName:Alfresco.constants.USERNAME,inviteeComments:"",inviteeRoleName:"SiteConsumer"},successCallback:{fn:this._requestJoinSuccess,scope:this},failureCallback:{fn:this._failureCallback,obj:this.msg("message.request-join-failure",Alfresco.constants.USERNAME,this.siteTitle),scope:this}});this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:this.msg("message.request-joining",Alfresco.constants.USERNAME,this.siteTitle),spanClass:"wait",displayTime:0});j.stopEvent(l)},_requestJoinSuccess:function k(l){if(this.widgets.feedbackMessage){this.widgets.feedbackMessage.destroy();this.widgets.feedbackMessage=null}Alfresco.util.PopupManager.displayPrompt({title:this.msg("message.success"),text:this.msg("message.request-join-success",Alfresco.constants.USERNAME,this.siteTitle),buttons:[{text:this.msg("button.ok"),handler:function m(){this.destroy();window.location=Alfresco.constants.URL_CONTEXT},isDefault:true}]})},_failureCallback:function i(m,l){if(this.widgets.feedbackMessage){this.widgets.feedbackMessage.destroy();this.widgets.feedbackMessage=null}if(l){Alfresco.util.PopupManager.displayPrompt({title:this.msg("message.failure"),text:l})}},onCloseConfirm:function c(n){if(this.dashboardType=="user"){Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.URL_SERVICECONTEXT+"components/dashlets/dynamic-welcome",dataObj:{dashboardUrl:this.dashboardUrl},successCallback:{fn:function(){document.location.href=Alfresco.constants.URL_PAGECONTEXT+""+this.dashboardUrl},scope:this},failureMessage:this.msg("message.saveFailure"),failureCallback:{fn:function(){this.widgets.feedbackMessage.destroy()},scope:this}})}else{var l=this.site.substring(1).replace(/\/|\./g,"-");this.services.preferences.set("org.alfresco.share.siteWelcome."+l,false,{successCallback:{fn:function m(){document.location.reload(true)}}})}},onHideButtonClick:function g(o,l){var p=this;var n=this.msg(this.dashboardType+".panel.delete.msg");Alfresco.util.PopupManager.displayPrompt({title:this.msg(this.dashboardType+".panel.delete.header"),text:n,buttons:[{text:this.msg("button.ok"),handler:function(){this.destroy();p.onCloseConfirm()}},{text:this.msg("button.cancel"),handler:function(){this.destroy()},isDefault:true}],noEscape:true});var m=f.getElementsByClassName("yui-button","span","prompt");f.addClass(m[0],"alf-primary-button");j.stopEvent(o)}})})();