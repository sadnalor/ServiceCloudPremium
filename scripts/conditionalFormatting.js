class MutationObserverRegistry{constructor(t){this.functionsForAnyMutation=[],this.functionsForNodeAddition=[],this.observerName=t}addFunctionForAnyMutation=t=>this.functionsForAnyMutation.push(t);addFunctionForNodeAddition=t=>this.functionsForNodeAddition.push(t);observer=new MutationObserver((t=>{const e=Date.now();for(let e in t){let s=t[e];if(s.addedNodes&&s.addedNodes.length>0){let t=Array.from(s.addedNodes);for(let e in t){let s=t[e];for(let t in this.functionsForNodeAddition){(0,this.functionsForNodeAddition[t])(s,this.observerName)}}}for(let t in this.functionsForAnyMutation){(0,this.functionsForAnyMutation[t])(s,this.observerName)}}const s=Date.now();GLOBAL.totalTimeSpentInRolandUImodsScript+=s-e}))}class ConditionalFormatting{constructor(){this.textMatchStyles=JSON.parse(GLOBAL.settingsManager.settings.textMatchStyles)}run=()=>{GLOBAL.mutationObserverRegistry.addFunctionForAnyMutation(this.processMutation),GLOBAL.mutationObserverRegistry.addFunctionForNodeAddition(this.processTextNode),GLOBAL.mutationObserverRegistry.addFunctionForNodeAddition(this.accessLinkMod),GLOBAL.mutationObserverRegistry.addFunctionForNodeAddition(this.defectRequestMod)};processMutation=(t,e)=>{this.expandEmailInput(t),this.monitorActiveCaseWhenUrlChanges(t),this.listenForAttachedImages(t)};listenForAttachedImages=t=>{const e=$(t.target);if(e.hasClass("forceContentModalPreviewPlayer")){GLOBAL.imageContainerDiv=e.find("div.thumbnail img.pageImg").parent();let t=e.find("div.thumbnail img.pageImg").attr("src"),s=e.find("img.pageImg").attr("src");t&&GLOBAL.attachedImageUrls.push(t),GLOBAL.imageUrlResolvedCallback&&(t||s)&&GLOBAL.imageUrlResolvedCallback(t)}};expandEmailInput=t=>{const e=$(t.target);if(e.hasClass("uiInput")){const t=e.find("iframe");if(t.length>0){const e="#cke_1_contents",s=$(t[0]).contents().find(e),n=$(t[0]).contents().find("iframe");if(n.length>0){const t=$(n[0]).contents().find("body");t.length>0&&(s.height(t.outerHeight()+20),GLOBAL.keyPressedOn=Date.now())}}}};tryToFindFileLinks=()=>{console.log("trying to find links");let t=$("a:not('.tabHeader')[href*=\"/ContentDocument/\"] span.itemTitle.desktop");t.length>0&&(GLOBAL.fileLinks=t),console.log(t)};monitorActiveCaseWhenUrlChangesOld=()=>{if(window.location.pathname!=GLOBAL.pathname){GLOBAL.pathname=window.location.pathname,GLOBAL.fileLinks=null,console.log("links cleared"),this.tryToFindFileLinks();let t=GLOBAL.pathname.split("/");t.length>3&&"case"==t[t.length-3].toLowerCase()?GLOBAL.activeCaseId=t[t.length-2]:GLOBAL.activeCaseId=null,Object.keys(GLOBAL.caseIdNumberPairs).includes(GLOBAL.activeCaseId)&&(GLOBAL.activeCaseNumber=GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseId].caseNumber,this.highlightActiveCase())}};monitorActiveCaseWhenUrlChanges=()=>{if(window.location.pathname!=GLOBAL.pathname){GLOBAL.pathname=window.location.pathname;let t=GLOBAL.pathname.split("/");t.length>4&&"case"==t[3].toLowerCase()?(console.log(GLOBAL.activeCaseId),console.log(t[4]),GLOBAL.activeCaseId!=t[4]&&GLOBAL.activeCaseId&&(GLOBAL.fileLinks=null,console.log("links cleared")),GLOBAL.activeCaseId=t[4]):GLOBAL.activeCaseId=null,Object.keys(GLOBAL.caseIdNumberPairs).includes(GLOBAL.activeCaseId)&&(GLOBAL.activeCaseNumber=GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseId].caseNumber,this.highlightActiveCase())}};highlightActiveCase=()=>{if(!GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseNumber].highlighted){for(let t in GLOBAL.caseIdNumberPairs)GLOBAL.caseIdNumberPairs[t].highlighted=!1;GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseNumber].highlighted=!0,$(".conditional-formatting-highlighted-case").css("background-color",""),$(".conditional-formatting-highlighted-case").removeClass(".conditional-formatting-highlighted-case");let t=GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseNumber].textNode,e=$(t).closest(".slds-split-view__list-item");if(e.length>0){let t=this.getStyleBasedOnTextArray(this.getTextFromNode(e.get(0))),s=null!=t.bgColor?t.bgColor:"";for(let t in this.textMatchStyles){let e=this.textMatchStyles[t];if(e.text==GLOBAL.activeCaseStatus){s=e.bgColor;break}}e.addClass("conditional-formatting-highlighted-case"),e.css("background-color",s)}}};getStyleBasedOnTextArray=t=>{for(let e in t){let s=t[e];for(let t in this.textMatchStyles){let e=this.textMatchStyles[t];if(e.text==s)return e}}return null};getTextFromNode=t=>{let e,s=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null,!1);for(;e=n.nextNode();)s.push(e.textContent);return s};processTextNode=t=>{const e=Date.now();let s,n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null,!1);for(;s=n.nextNode();)this.clickOnInternalOnly(s),this.color(s),this.gatherCaseIdNumberPairs(s),GLOBAL.settingsManager.settings.allUrlHyperlinkingBeta?this.allUrlHyperlinking(s):this.defectRequestIssueInTableHyperlinking(s),this.findFilesSection(s),this.findEscalatedToT3OrDevWarning(s),this.supportScoreHighlightInPanels(s),this.supportScoreInTableHighlighting(s),this.supportScoreInReportsHighlighting1(s),this.supportScoreInReportsHighlighting2(s),this.closeTheAccessLinkRequestPopup(s),this.changepointIdHyperlinking(s),this.agilePlaceIdHyperlinking(s),this.tasktopJiraIdHyperlinking(s),this.tasktopZendeskIdHyperlinking(s),this.tasktopJiraIdHyperlinkingManyIds(s);const i=Date.now();GLOBAL.totalTimeSpent+=i-e};closeTheAccessLinkRequestPopup=t=>{if("Access Link Request"==t.textContent){let e=$(t.parentNode).closest("div.modal-container").find('button[title="Close this window"]');e.length>0&&e.click()}};displayTimeSpent=()=>{setTimeout((()=>{console.log("Time spent:",GLOBAL.totalTimeSpent),this.displayTimeSpent()}),1e3)};supportScoreHighlightInPanels=t=>{if("Support Score"==t.textContent){let e=$(t.parentNode).closest("div.slds-form-element"),s=e.find("span.uiOutputNumber");this.supportScoreHighlight(e,s.html())}};supportScoreHighlight=(t,e)=>{let s=isNaN(parseFloat(e))?0:parseFloat(e);s>GLOBAL.settingsManager.settings.ssRedThreshold?t.css("background-color","#ea9999"):s>GLOBAL.settingsManager.settings.ssOrangeThreshold?t.css("background-color","#f5b799"):s>GLOBAL.settingsManager.settings.ssYellowThreshold?t.css("background-color","#ffe599"):t.css("background-color","#d9ead3")};findEscalatedToT3OrDevWarning=t=>{if("WARNING!!! This case has already been escalated to Tier 3 or Dev. Do not click save!"==t.textContent){$(t.parentNode).closest("div.uiTabset--base").find('span.title:contains("T3")').closest("li").hide(),$('span.title:contains("Post")').click()}};findFilesSection=t=>{if("Files"==t.textContent){$(t.parentNode).closest(".forceListViewManager").length>0&&this.waitForFileLinks()}};waitForFileLinks=()=>{setTimeout((()=>{let t=$('button[title="Close Files"]');console.log("close button",t),t.length>0&&(GLOBAL.fileTabCloseButton=t);let e=$("a:not('.tabHeader')[href*=\"/ContentDocument/\"] span.itemTitle.desktop");e.length>0?(GLOBAL.fileLinks=e,"function"==typeof GLOBAL.imageUrlResolvedCallback&&GLOBAL.imageUrlResolvedCallback(e)):this.waitForFileLinks()}),100)};allUrlHyperlinking=t=>{if(/^(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=t.textContent,s=/^https:\/\/clarizenint\.atlassian\.net\/browse\/CLZDEV-\d*/.test(e)?e.split("/").pop():e;$(t.parentNode).html(`<a href="${e}" target="_blank">${s}</a>`)}};changepointIdHyperlinking=t=>{if(/^CP(C|E)-20\d{2,2}-\d{5,5}$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=t.textContent,s=`https://desktop.changepoint.com/core/portlet.aspx?ui=p&portletid=dcrequest&Params=action=edit;reqnum=${e}`;setTimeout((()=>{$(t.parentNode).html(`<a href="${s}" target="_blank">${e}</a>`)}),100)}};agilePlaceIdHyperlinking=t=>{if(/^planview\.leankit\.com\/card\/\d{10}$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=t.textContent.split("/").reverse()[0],s=`https://${t.textContent}`;setTimeout((()=>{$(t.parentNode).html(`<a href="${s}" target="_blank">${e}</a>`)}),100)}};tasktopZendeskIdHyperlinking=t=>{if(/^TT-\d\d*\d$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=`https://tasktopsupport.zendesk.com/agent/tickets/${t.textContent.split("-")[1]}`;setTimeout((()=>{$(t.parentNode).html(`<a href="${e}" target="_blank">${t.textContent}</a>`)}),100)}};tasktopJiraIdHyperlinking=t=>{if(/^(VIZ|APPS|CON|viz|con|apps)\-\d*$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=t.textContent,s=`https://tasktop${window.location.href.includes("planview.lightning")?"":"-sandbox"}.atlassian.net/browse/${e}`;setTimeout((()=>{$(t.parentNode).html(`<a href="${s}" target="_blank">${e}</a>`)}),100)}};tasktopJiraIdHyperlinkingManyIds=t=>{if(/^((VIZ|APPS|CON|viz|con|apps)\-\d*\,).*(VIZ|APPS|CON|viz|con|apps)\-\d*$/.test(t.textContent)&&!$(t.parentNode).is("a")){let e=t.textContent.replaceAll(" ","").replaceAll(",","%2c"),s=`https://tasktop${window.location.href.includes("planview.lightning")?"":"-sandbox"}.atlassian.net/browse/${t.textContent.split(",")[0]}?jql=key%20in%20(${e})`;setTimeout((()=>{$(t.parentNode).html(`<a href="${s}" target="_blank">${t.textContent}</a>`)}),100)}};supportScoreInReportsHighlighting1=t=>{if("Support Score"==t.textContent){let e=$(t.parentNode),s=e.closest("th"),n=e.closest("table");if(s.length>0){let t=s.index()+1,e=n.find(`td:nth-child(${t}) span.css-13whmom`);e.length,e.each(((t,e)=>{let s=(e=$(e)).closest("td");this.supportScoreHighlight(s,e.html())}))}}};supportScoreInReportsHighlighting2=t=>{if(/^\d*\.\d*$/.test(t.textContent)){let e=$(t.parentNode),s=this.supportScoreTd(e);s&&this.supportScoreHighlight(s,e.html())}};supportScoreTd=t=>{let e=t.closest("td"),s=e.attr("data-column-index"),n=t.closest("table").find('span[data-tooltip="Support Score"]').closest("th").attr("data-column-index");return!(!s||!n||s!=n)&&e};supportScoreInTableHighlighting=t=>{if(!isNaN(t.textContent)){let e=$(t.parentNode).closest("table");if(e.length>0){let t=$(e).find('th[title="Support Score"]');if(t.length>0){let s=t.index()+1;e.find(`td:nth-child(${s}) span.slds-truncate.uiOutputNumber`).each(((t,e)=>{e=$(e),this.supportScoreHighlight(e.parent().parent(),e.html())}))}}}};defectRequestIssueInTableHyperlinking=t=>{if(/^https:\/\//.test(t.textContent)){let e=$(t.parentNode).closest("table");if(e.length>0){let t=$(e).find('th[title="Defect Request Issue"]');if(t.length>0){let s=t.index()+1;e.find(`td:nth-child(${s}) span.slds-truncate.uiOutputText`).each(((t,e)=>{let s=$(e).html();if(/^https:\/\//.test(s)){let t=/^https:\/\/clarizenint\.atlassian\.net\/browse\/CLZDEV-\d*/.test(s)?s.split("/").pop():s;$(e).html(`<a href="${s}" target="_blank">${t}</a>`)}}))}}}};clickOnInternalOnly=t=>{"Internal Only"==t.textContent&&JSON.parse(GLOBAL.settingsManager.settings.autoClickInternalUpdatesTab)&&$(t.parentNode).click()};color=t=>{for(let e in this.textMatchStyles){let s=this.textMatchStyles[e];if(s.exactMatch&&s.text==t.textContent||!s.exactMatch&&t.textContent.includes(s.text))if(s.ancestorToHighlight&&Array.isArray(s.ancestorToHighlight)){let e=!1;for(let n in s.ancestorToHighlight){let i=s.ancestorToHighlight[n],o=$(t.parentNode).closest(i);if(o.length>0){e=!0,this.styleThis(o,s);break}}!e&&s.highlightIfAncestorNotFound&&this.styleThis($(t.parentNode),s)}else this.styleThis($(t.parentNode),s)}};styleThis=(t,e)=>{t.css("background-color",e.bgColor),t.css("color",e.textColor)};gatherCaseIdNumberPairs=t=>{if(/^\d{8}$/.test(t.textContent)&&$(t.parentNode).hasClass("uiOutputText")&&$(t.parentNode.parentNode).hasClass("test-splitViewCardData")){let e=$(t.parentNode).closest("a").attr("data-recordid");GLOBAL.caseIdNumberPairs[t.textContent]={caseNumber:t.textContent,caseId:e,textNode:t,highlighted:!1},GLOBAL.caseIdNumberPairs[e]={caseNumber:t.textContent,caseId:e,textNode:t,highlighted:!1},this.monitorActiveCasesAsTheyAppear()}};monitorActiveCasesAsTheyAppear=()=>{GLOBAL.activeCaseId=GLOBAL.pathname.split("/")[GLOBAL.pathname.split("/").length-2],Object.keys(GLOBAL.caseIdNumberPairs).includes(GLOBAL.activeCaseId)&&(GLOBAL.activeCaseNumber=GLOBAL.caseIdNumberPairs[GLOBAL.activeCaseId].caseNumber,this.highlightActiveCase())};defectRequestMod=t=>{const e="Defect Request Issue",s=`span:contains('${e}')`,n=$(t).find(s).filter((function(){return $(this).text()==e}));if(n.length>0){const t=n.parent().siblings().find("span span");if(t.length>0){let e=t.html();if(/^http.*\:\/\/.*\./.test(e)&&!e.includes(" ")){let s=/^https:\/\/clarizenint\.atlassian\.net\/browse\/CLZDEV-\d*/.test(e)?e.split("/").pop():e;t.html(`<a href='${e}' target='_blank'>${s}</a>`)}}}};accessLinkMod=t=>{const e="Access Link",s=$(t).find("span:contains('Access Link')").filter((function(){return $(this).text()==e}));if(s.length>0){const e=s.parent().siblings().find("span.uiOutputTextArea"),n="string"!=typeof e.html()||""==e.html().replace(/<a.*<\/a>/g,"").replace(/<\!--.*-->/g,""),i=s.parent().siblings().find("a");if(n&&1==i.length){const e=i.attr("href"),s=this.accessLinkExpiration(e);let n=s.label,o=s.color;/^((https|http|HTTPS|HTTP):\/\/.*(EXP|exp).*(CSIG|csig)[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|])$/g.test(e)?/^((https|http|HTTPS|HTTP):\/\/.*(EXP|exp).*(CSIG|csig)[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|])$/g.test(e)&&(o="green"):(n="Invalid access link",o="red"),i.html(n),i.css("color",o),s.expired||this.keepALupdated(t)}else(!n||i.length>1)&&(e.html("Invalid access link"),e.css("color","red"))}};accessLinkExpiration=t=>{let e="exp%3D",s=t.search(e);-1==s&&(e="exp=",s=t.search(e));const n=Number(t.substring(s+e.length,s+e.length+14)),i=new Date(new Date(n).setFullYear(new Date(n).getFullYear()-1969)),o=new Date;let a,l="red",r=!1;if(i>o){let t=Math.abs(i-o)/1e3;const e=Math.floor(t/86400);t-=86400*e;const s=Math.floor(t/3600)%24;t-=3600*s;t-=60*(Math.floor(t/60)%60);Math.floor(t);a=`Access link (expires in ${e} days ${s} hours)`,e>5?l="green":e>=1&&(l="orange")}else a=`Access link expired on ${i}`,r=!0;return{label:a,color:l,expired:r}};keepALupdated=t=>{setTimeout((()=>{this.accessLinkMod(t)}),36e5)}}class WhosLooking{constructor(){this.cooldown=1e3,this.caseIdSent=null,this.lastMouseActivitySent=null,this.lastKeyboardActivitySent=null,this.payload=null,this.callDetails=null}check=()=>{setTimeout((()=>{if(GLOBAL.settingsManager.settings.userName&&GLOBAL.activeCaseId&&GLOBAL.mouseMovedOn&&(GLOBAL.activeCaseId!=this.caseIdSent||GLOBAL.mouseMovedOn!=this.lastMouseActivitySent||GLOBAL.keyPressedOn!=this.lastKeyboardActivitySent)){let t=GLOBAL.keyPressedOn&&GLOBAL.keyPressedOn>GLOBAL.mouseMovedOn?GLOBAL.keyPressedOn:GLOBAL.mouseMovedOn;this.payload={caseId:GLOBAL.activeCaseId,name:GLOBAL.settingsManager.settings.userName,lastActivityTimestamp:t,lastKeypressTimestamp:GLOBAL.keyPressedOn,lastMouseMovement:GLOBAL.mouseMovedOn,backgroundColor:GLOBAL.settingsManager.settings.avatarColor,version:GLOBAL.version},this.callDetails={method:"POST",url:"http://whoslookingatcases.herokuapp.com/statusUpdate",data:JSON.stringify(this.payload),onload:this.updateUI},GM_xmlhttpRequest(this.callDetails)}this.check()}),this.cooldown)};updateUI=t=>{200==t.status?(GLOBAL.whosLookingResponse={response:JSON.parse(t.response),timestamp:Date.now()},this.caseIdSent=this.payload.caseId,this.lastMouseActivitySent=this.payload.lastMouseMovement,this.lastKeyboardActivitySent=this.payload.lastKeypressTimestamp):console.log("API error detected. Please get in touch with rpumputis@planview.com for support.")}}class SettingsManager{constructor(){this.settingsList=null,this.settings=null,this.defaultSettings={textMatchStyles:JSON.stringify([{text:"New",exactMatch:!0,bgColor:"#FFB648",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Initial",exactMatch:!0,bgColor:"#FFB648",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Active",exactMatch:!0,bgColor:"#E34F32",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Needs Reply",exactMatch:!0,bgColor:"#E34F32",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Pending Internal Team Response",exactMatch:!0,bgColor:"#E34F32",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Pending Customer",exactMatch:!0,bgColor:"#3091EC",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"In Development",exactMatch:!0,bgColor:"#949494",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Pending Release",exactMatch:!0,bgColor:"#2F3941",textColor:"#ffffff",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"Solution Provided",exactMatch:!0,bgColor:"#2F3941",textColor:"#D8DCDE",ancestorToHighlight:[],highlightIfAncestorNotFound:!0},{text:"1 - Flagged to Case Owner",exactMatch:!0,bgColor:"#d9ead3",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"1 - Watching",exactMatch:!0,bgColor:"#d9ead3",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"2 - Elevated to Manager",exactMatch:!0,bgColor:"#ffe599",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"3 - Escalated to Development",exactMatch:!0,bgColor:"#f5b799",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"3 - Escalated to PM/Infrastructure team",exactMatch:!0,bgColor:"#f5b799",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"4 - Global XCAR",exactMatch:!0,bgColor:"#ea9999",textColor:"#000000",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!0},{text:"To: Internal",exactMatch:!0,bgColor:"#FFF6D9",textColor:"",ancestorToHighlight:[".cuf-element"],highlightIfAncestorNotFound:!1},{text:"Case status updated",exactMatch:!0,bgColor:"#FFF6D9",textColor:"",ancestorToHighlight:[".cuf-element"],highlightIfAncestorNotFound:!1},{text:"Case updated",exactMatch:!0,bgColor:"#FFF6D9",textColor:"",ancestorToHighlight:[".cuf-element"],highlightIfAncestorNotFound:!1},{text:"Case created",exactMatch:!0,bgColor:"#FFF6D9",textColor:"",ancestorToHighlight:[".cuf-element"],highlightIfAncestorNotFound:!1},{text:"...",exactMatch:!0,bgColor:"#FFF6D9",textColor:"",ancestorToHighlight:[".cuf-element"],highlightIfAncestorNotFound:!1},{text:"Elite",exactMatch:!1,bgColor:"#ffcb2a",textColor:"",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!1},{text:"Premium",exactMatch:!1,bgColor:"#bababa",textColor:"",ancestorToHighlight:[".slds-form-element"],highlightIfAncestorNotFound:!1}]),avatarColor:"#E34F32",autoClickInternalUpdatesTab:JSON.stringify(!1),userName:null,scrollbarWidth:3,listRefreshRate:60,reportRefreshRate:0,disableListRefresh:!1,closeAllTabsUsingCtrlQ:!1,openAllImagesUsingCtrlI:!1,allUrlHyperlinkingBeta:!1,ssRedThreshold:90,ssOrangeThreshold:80,ssYellowThreshold:70},this.run()}getSettingsList=()=>(this.settingsList=GM_listValues(),this.settingsList);getSettings=()=>{let t={};for(let e in this.settingsList){let s=this.settingsList[e];t[s]=GM_getValue(s)}return this.settings=t,this.settings};update=(t,e)=>(GM_setValue(t,e),this.settingsList.push(t),this.settings[t]=e,this.settings);applyDefaultSettings=()=>{"v20220420"==GLOBAL.version&&"v20220420"!=this.settings.clearedTextMatchStylesInVersion&&(this.update("clearedTextMatchStylesInVersion","v20220420"),this.update("textMatchStyles",JSON.stringify(JSON.parse(this.defaultSettings.textMatchStyles),void 0,4)),this.getSettingsList(),this.getSettings(),console.log(this.settings));for(let t in this.defaultSettings)Object.keys(this.settings).includes(t)||(this.settings[t]=this.defaultSettings[t]);return this.settings};run=()=>{this.getSettingsList(),this.getSettings(),this.applyDefaultSettings()}}class UIinjector{constructor(){this.userName=null,this.addStyles(),this.uiEvents(),this.whosLookingText=null,this.whosLookingResponseTimestamp=null}addStyles=()=>{GM_addStyle(GM_getResourceText("popupStyleCSS")),GM_addStyle(`\n            ::-webkit-scrollbar {\n                width: ${GLOBAL.settingsManager.settings.scrollbarWidth}px;\n                height: ${GLOBAL.settingsManager.settings.scrollbarWidth}px;\n            }\n            .big-blue-button {\n            background-color: rgb(1, 118, 211);\n            color: white;\n            padding: 10px;\n            font-size: large;\n            font-weight: bolder;\n            border-radius: 0.25rem;\n            cursor: pointer;\n                display: inline-block;\n                margin-right: 10px;\n        }\n        #roland-ui-mods-header-buttons {\n            left: 100px;\n            position: absolute;            \n        }`),GM_addStyle(`.roland-ui-mods-whoslooking-indicator {\n            background-color: ${GLOBAL.settingsManager.settings.avatarColor};\n            color: white;\n            padding: 3px 7px 1px 7px;\n            font-size: medium;\n            font-weight: bolder;\n            border-radius: 0.25rem;\n            cursor: help;\n            margin-right: 3px;\n            display: inline-block;\n        }\n        .tiblock {\n            align-items: center;\n            display: flex;\n            height: 8px;\n        }\n        .ticontainer .tidot {\n            background-color: white;\n        }\n        .tidot {\n            -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;\n            border-radius: 2px;\n            display: inline-block;\n            height: 4px;\n            margin: 2px;\n            width: 3px;\n        }\n        .roland-hide{\n            opacity: 0;\n        }\n        @-webkit-keyframes mercuryTypingAnimation{\n        0%{\n        -webkit-transform:translateY(0px)\n        }\n        28%{\n        -webkit-transform:translateY(-5px)\n        }\n        44%{\n        -webkit-transform:translateY(0px)\n        }\n        }\n        .tidot:nth-child(1){\n        -webkit-animation-delay:200ms;\n        }\n        .tidot:nth-child(2){\n        -webkit-animation-delay:300ms;\n        }\n        .tidot:nth-child(3){\n        -webkit-animation-delay:400ms;\n        }`),GM_addStyle(".big-blue-button:hover {\n            background-color: rgb(1, 68, 134);\n        }"),GM_addStyle('\n        .roland-ui-mods-form-heading {\n            font-weight: bold;\n            font-style: italic;\n            border-bottom: 2px solid #ddd;\n            margin-bottom: 20px;\n            font-size: 15px;\n            padding-bottom: 3px;\n        }\n        .roland-ui-mods-form label{\n            display: block;\n            margin: 0px 0px 15px 0px;\n        }\n        .roland-ui-mods-form label > span{\n            width: 340px;\n            font-weight: bold;\n            float: left;\n            padding-top: 8px;\n            padding-right: 5px;\n        }\n        .roland-ui-mods-form input.roland-ui-mods-input-field,\n        .roland-ui-mods-form .roland-ui-mods-textarea-field {\n            box-sizing: border-box;\n            -webkit-box-sizing: border-box;\n            -moz-box-sizing: border-box;\n            border: 1px solid #C2C2C2;\n            box-shadow: 1px 1px 4px #EBEBEB;\n            -moz-box-shadow: 1px 1px 4px #EBEBEB;\n            -webkit-box-shadow: 1px 1px 4px #EBEBEB;\n            border-radius: 3px;\n            -webkit-border-radius: 3px;\n            -moz-border-radius: 3px;\n            padding: 7px;\n            outline: none;\n        }\n        .roland-ui-mods-form .roland-ui-mods-input-field:focus,\n        .roland-ui-mods-form .roland-ui-mods-textarea-field:focus {\n            border: 1px solid #0C0;\n        }\n        .roland-ui-mods-form .roland-ui-mods-textarea-field{\n            height:300px;\n            width: 100%;\n            margin-top: 10px;\n        }\n        .roland-ui-mods-form input[type="checkbox"] {margin-top: 10px;}')};showWhosLooking=()=>{setTimeout((()=>{this.whosLookingText!=GLOBAL.whosLookingText&&(this.whosLookingText=GLOBAL.whosLookingText),GLOBAL.whosLookingResponse&&(this.whosLookingResponseTimestamp=GLOBAL.whosLookingResponse.timestamp,this.injectWhosLookingIndicator()),this.showWhosLooking()}),1e3)};injectWhosLookingIndicator=()=>{let t=$("div.feedActions.slds-grid");$(".roland-ui-mods-whoslooking-indicator").remove();for(let e in GLOBAL.whosLookingResponse.response){let s=GLOBAL.whosLookingResponse.response[e],n=~~(Date.now()/1e3)-~~(s.lastActivityTimestamp/1e3),i=100,o=300,a=1-.8*(n/i<1?n/i:1);t.prepend(this.whosLookingIndicatorTemplate({title:`${s.name} was active on this case ${n}s ago`,initials:this.nameToInitials(s.name),opacity:a,show:!(o<n),isTyping:Date.now()-s.lastKeypressTimestamp<5e3,backgroundColor:s.backgroundColor}))}};nameToInitials=t=>{let e=t.split(" "),s="";for(let t in e)s+=e[t].charAt(0);return s.toUpperCase()};setUserName=t=>{this.userName=t,this.injectSettingsButton(),this.showWhosLooking()};whosLookingIndicatorTemplate=t=>t.show?`<div class='roland-ui-mods-whoslooking-indicator' style='opacity: ${t.opacity}; background-color: ${t.backgroundColor}' title='${t.title}'>\n        <div>${t.initials}</div>\n           <div class="ticontainer ${t.isTyping?"":"roland-hide"}">\n               <div class="tiblock">\n                   <div class="tidot"></div>\n                   <div class="tidot"></div>\n                   <div class="tidot"></div>\n               </div>\n           </div>\n       </div>`:"";settingsButtonTemplate=()=>"<div class=\"big-blue-button\" id='roland-ui-mods-settings-button'>Service Cloud Premium</div>";headerButtonsTemplate=()=>`<div id="roland-ui-mods-header-buttons">${this.settingsButtonTemplate()}</div>`;settingsMenuTemplate=()=>`<div class="roland-ui-mods-form">\n        <div class="roland-ui-mods-form-heading">Release notes for version: ${GLOBAL.version}</div>\n        <ul>\n          <li>&bull;&nbsp;Added release notes section to this panel.</li>\n          <br>\n          <li>&bull;&nbsp;Jason White request: Support for multiple Tasktop Jira ID hyperlinking</li>\n          <br>\n          <li>&bull;&nbsp;Josh Santos request: Report refresh rate setting that defaults to 0 seconds (i.e. never refresh, no change in behaviour until this value is changed). Changes apply after refreshing the browser window.</li>\n          <br>\n        </ul>\n        <div class="roland-ui-mods-form-heading">Settings</div>\n        <form>\n          <label><span>Avatar color</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="avatarColor" id="avatar-color-input" value="${GLOBAL.settingsManager.settings.avatarColor}"/></label>\n          <label><span>Scrollbar width</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="scrollbarWidth" id="scrollbar-width-input" value="${GLOBAL.settingsManager.settings.scrollbarWidth}"/></label>\n          <label><span>Auto-click "Internal Only"</span><input class="roland-ui-mods-settings-input" data-id="autoClickInternalUpdatesTab" type="checkbox" ${JSON.parse(GLOBAL.settingsManager.settings.autoClickInternalUpdatesTab)?"checked":""}/></label>\n          <label><span>Disable list refresh (Bobby's meeting mode)</span><input class="roland-ui-mods-settings-input" data-id="disableListRefresh" type="checkbox" ${JSON.parse(GLOBAL.settingsManager.settings.disableListRefresh)?"checked":""}/></label>\n          <label><span>List refresh rate (in seconds)</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="listRefreshRate" value="${GLOBAL.settingsManager.settings.listRefreshRate}"/></label>\n          <label><span>Report refresh rate (in seconds)</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="reportRefreshRate" value="${GLOBAL.settingsManager.settings.reportRefreshRate}"/></label>\n          <label><span>Use CTRL+Q to close all tabs</span><input class="roland-ui-mods-settings-input" data-id="closeAllTabsUsingCtrlQ" type="checkbox" ${JSON.parse(GLOBAL.settingsManager.settings.closeAllTabsUsingCtrlQ)?"checked":""}/></label>\n          <label><span>Use CTRL+I to open all images</span><input class="roland-ui-mods-settings-input" data-id="openAllImagesUsingCtrlI" type="checkbox" ${JSON.parse(GLOBAL.settingsManager.settings.openAllImagesUsingCtrlI)?"checked":""}/></label>\n          <label><span>Hyperlink URLs when possible (<span style="text-decoration: underline; color: blue;" title='If you notice issues with links not working, please disable and refresh.'>BETA</span>)</span><input class="roland-ui-mods-settings-input" data-id="allUrlHyperlinkingBeta" type="checkbox" ${JSON.parse(GLOBAL.settingsManager.settings.allUrlHyperlinkingBeta)?"checked":""}/></label>\n          <label><span>Support Score red threshold</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="ssRedThreshold" value="${GLOBAL.settingsManager.settings.ssRedThreshold}"/></label>\n          <label><span>Support Score orange threshold</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="ssOrangeThreshold" value="${GLOBAL.settingsManager.settings.ssOrangeThreshold}"/></label>\n          <label><span>Support Score yellow threshold</span><input type="text" class="roland-ui-mods-input-field roland-ui-mods-settings-input" data-id="ssYellowThreshold" value="${GLOBAL.settingsManager.settings.ssYellowThreshold}"/></label>\n          <label><span>Text match styles</span><textarea class="roland-ui-mods-textarea-field  roland-ui-mods-settings-input" data-id="textMatchStyles">${JSON.stringify(JSON.parse(GLOBAL.settingsManager.settings.textMatchStyles),void 0,4)}</textarea></label>\n        </form>\n      </div>`;injectSettingsButton=t=>{$("div.slds-global-header > div:nth-child(1)").length>0?(console.log("header found, injecting button..."),GLOBAL.headerFound=!0,$("div.slds-global-header > div:nth-child(1)").after(this.headerButtonsTemplate())):t?console.log("failed to find the header..."):(console.log("header not found, retrying in 5s..."),setTimeout((()=>{this.injectSettingsButton(!0)}),5e3))};uiEvents=()=>{$(document).ready((()=>{$(document).off("click","#roland-ui-mods-settings-button").on("click","#roland-ui-mods-settings-button",(t=>{this.settingsButtonClicked(t)})),document.addEventListener("mousemove",this.saveMouseMovementTime,!1),document.addEventListener("keydown",this.saveKeypressTime)})),document.onkeydown=this.keyPress};keyPress=t=>{let e=window.event?event:t;if(81==e.keyCode&&e.ctrlKey&&GLOBAL.settingsManager.settings.closeAllTabsUsingCtrlQ&&this.closeTabs(),73==e.keyCode&&e.ctrlKey&&GLOBAL.settingsManager.settings.openAllImagesUsingCtrlI){let t=$('a[href*="AttachedContentDocuments"] .view-all-label');GLOBAL.fileLinks?this.openImages():t.length>0&&(t.click(),this.waitForFileLinks())}};waitForFileLinks=async()=>{GLOBAL.fileLinks||(GLOBAL.fileLinks=await new Promise((t=>{GLOBAL.imageUrlResolvedCallback=t}))),this.openImages()};tryToFindFileLinks=()=>{console.log("trying to find links");let t=$("a:not('.tabHeader')[href*=\"/ContentDocument/\"] span.itemTitle.desktop");t.length>0&&(GLOBAL.fileLinks=t),console.log(t)};openImages=async()=>{GLOBAL.attachedImageUrls=[];let t=[];GLOBAL.fileLinks.each(((e,s)=>{t.push(s)}));for(let e in t){t[e].click(),await new Promise((t=>{GLOBAL.imageUrlResolvedCallback=t})),$('div.forceContentBasePreviewToolbar button[title="Close"]').click()}let e=this.addImagesToDiv(GLOBAL.imageContainerDiv,GLOBAL.attachedImageUrls);this.showImagePopup(e)};showImagePopup=t=>{let e={title:"Images",content:`<div style="padding: 15px;text-align:center;">${t}</div>`,buttons:{Close:{handler:null}},keyEvents:{13:{handler:null},27:{handler:null}},dim:!0,expandStepDuration:500,collapseStepDuration:300,expandCallback:null,collapseCallback:this.closeFilesTab},s=new Popup(e);s.keyEvents[13].handler=s.collapse,s.keyEvents[27].handler=s.collapse,s.buttons.Close.handler=s.collapse,$("body").append('<div id="roland-ui-mods-image-viewer-popup" style="padding:5px;position:fixed;width:90%;height:90%;top:5%;left:5%;z-index:9000;"></div>'),s.render("roland-ui-mods-image-viewer-popup"),s.expand()};closeFilesTab=()=>{GLOBAL.fileTabCloseButton&&GLOBAL.fileTabCloseButton.click(),console.log("close")};addImagesToDiv=(t,e)=>{let s="";for(let t in e)s+=`<img style="border: 1px solid #333;" src='${e[t]}'><br><br>`;return t.html(s),this.styleDiv(t),s};styleDiv=t=>{t.css({display:"block",overflow:"scroll","text-align":"center",padding:"100px"})};closeTabs=()=>{let t=$('button.slds-button.slds-button_icon.slds-button_icon-x-small.slds-button_icon-container[title^="Close "]');t.length>0&&t.click()};toggleWidenModeButtonClicked=()=>{console.log("toggle");let t=$('a:contains("Contact Details")');this.toggleOffsetAncestor(t,"[id^='leftColumn-']")};toggleOffsetAncestor=(t,e)=>(console.log(t),t.is(e)?(console.log("toggling"),t.hide(),t.next().css("width","100%"),!0):t.offsetParent().length>0?(console.log("looking deeper"),this.toggleOffsetAncestor(t.offsetParent(),e)):(console.log("fail"),!1));saveMouseMovementTime=()=>{GLOBAL.mouseMovedOn=Date.now()};saveKeypressTime=()=>{GLOBAL.keyPressedOn=Date.now()};settingsButtonClicked=t=>{let e={title:`Service Cloud Premium ${GLOBAL.version}`,content:`<div style="padding: 15px;">${this.settingsMenuTemplate()}</div>`,buttons:{Cancel:{handler:null},Save:{handler:null}},keyEvents:{13:{handler:null},27:{handler:null}},dim:!0,expandStepDuration:500,collapseStepDuration:300,expandCallback:null,collapseCallback:null},s=new Popup(e);s.keyEvents[27].handler=s.collapse,s.buttons.Save.handler=partial(this.saved,s.collapse),$("body").append('<div id="roland-ui-mods-settings-popup" style="padding:5px;position:fixed;width:70%;height:70%;top:15%;left:15%;z-index:9000;"></div>'),s.render("roland-ui-mods-settings-popup"),s.expand(t)};saved=t=>{let e;$(".roland-ui-mods-settings-input").each(((t,s)=>{let n,i=$(s),o=i.attr("data-id");i.is('input[type="text"]')?n=i.val():i.is('input[type="checkbox"]')?n=i.is(":checked"):i.is("textarea")&&(n=i.val()),e=GLOBAL.settingsManager.update(o,n)})),t()}}const GLOBAL={totalTimeSpentInRolandUImodsScript:0,totalTimeSpent:0,mutationObserverRegistry:null,activeCaseNumber:null,activeCaseId:null,activeCaseElementToHighlight:null,caseIdNumberPairs:{},activeCaseStatus:null,userName:null,profileButton:null,pathname:window.location.pathname,mouseMovedOn:null,keyPressedOn:null,headerFound:!1,imageOpenerButtonsList:{},attachedImageUrls:[],imageUrlResolvedCallback:null,imageContainerDiv:null,fileLinks:null,fileTabCloseButton:null,version:"v20221223"},rolandUImods=()=>{console.log("Service Cloud Premium version:",GLOBAL.version),GLOBAL.settingsManager=new SettingsManager,GLOBAL.mutationObserverRegistry=new MutationObserverRegistry("Global"),GLOBAL.mutationObserverRegistry.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0}),GLOBAL.conditionalFormatting=new ConditionalFormatting,GLOBAL.uiInjector=new UIinjector,GLOBAL.conditionalFormatting.run(),GLOBAL.mutationObserverRegistry.addFunctionForNodeAddition(detectUserName),exposeUserName();(new WhosLooking).check(),overrideListRefreshRate(),refreshLists(),refreshReports()},overrideListRefreshRate=()=>{setTimeout((()=>{refreshListsInSeconds?refreshListsInSeconds=2e6:overrideListRefreshRate()}),1e3)},refreshLists=()=>{isNaN(parseFloat(GLOBAL.settingsManager.settings.listRefreshRate))||setTimeout((()=>{if(!GLOBAL.settingsManager.settings.disableListRefresh){let t=$($("button",$("force-list-view-manager-button-bar"))[0]);t.length>0&&t.click()}refreshLists()}),1e3*parseFloat(GLOBAL.settingsManager.settings.listRefreshRate))},refreshReports=()=>{!isNaN(parseFloat(GLOBAL.settingsManager.settings.reportRefreshRate))&&GLOBAL.settingsManager.settings.reportRefreshRate>0&&setTimeout((()=>{let t=$($(".report-action-refreshReport")[0]);t.length>0&&t.click(),refreshReports()}),1e3*parseFloat(GLOBAL.settingsManager.settings.reportRefreshRate))};function partial(t){var e=Array.prototype.slice.call(arguments,1);return function(){var s=e.concat(Array.prototype.slice.call(arguments));return t.apply(this,s)}}const detectUserName=t=>{const e=$(t).find("h1.profile-card-name a");e.length>0&&null!=GLOBAL.profileButton&&null==GLOBAL.settingsManager.settings.userName&&(GLOBAL.settingsManager.update("userName",e.html()),GLOBAL.uiInjector.setUserName(GLOBAL.settingsManager.settings.userName),setTimeout((()=>{GLOBAL.profileButton.click()}),100))},exposeUserName=()=>{if(null==GLOBAL.settingsManager.settings.userName){const t=$("button.branding-userProfile-button");t.length>0?(GLOBAL.profileButton=t.get(0),tryOpeningProfilePopupToLookForName()):setTimeout((()=>{exposeUserName()}),15e3)}else GLOBAL.uiInjector.setUserName(GLOBAL.settingsManager.settings.userName)},tryOpeningProfilePopupToLookForName=()=>{null==GLOBAL.settingsManager.settings.userName&&(GLOBAL.profileButton.click(),setTimeout((()=>{0==$("h1.profile-card-name").length&&tryOpeningProfilePopupToLookForName()}),15e3))};