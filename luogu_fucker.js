// ==UserScript==
// @name        Luogu Fucker
// @namespace   LuoguScripts
// @match       *://www.luogu.com.cn/*
// @grant       none
// @version     1.0
// @author      Cnnb
// @description Fuck up Luogu so it selects C++17 and enables O2 by default.
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant       GM_addStyle
// @run-at      document-idle
// ==/UserScript==
//
function main($) {
  try {
    let removeADInterval = setInterval(function(){
        let sidebar = $(".side")[0];
        if (sidebar == undefined){
            return;
        }
        clearInterval(removeADInterval);
        const callback = function(mutationsList, observer) {
            let ad = $(".side > div:last-of-type");
            if (ad[0] == undefined) return;
            if (ad[0].innerText.indexOf("洛谷推荐") != -1) {
                console.info("%c[LGFk> AdRemover]%c hiding ad", "color:cyan", "color:white", ad[0]);
                ad.hide();
            }
        };
        let observer = new MutationObserver(callback);
        observer.observe(sidebar, { attributes: false, childList: true, subtree: false });
        callback();
    }, 50);
}
catch (e) {
  console.warn("[%cLGFk> AdRemover]%c uncaught exception:", "color:cyan", "color:white", e);
}
$(".operation button").click(() => {
  try {
    if ($(".combo-wrapper.lang-select")[0] && ($(".combo-wrapper.lang-select")[0].innerText == "自动识别语言" || $(".combo-wrapper.lang-select")[0].innerText == "C++11")) {
      console.info("%c[LGFk> SubmitHelper]%c language set to C++17.","color:cyan", "color:white");
      $(".combo-wrapper.lang-select ul")[0].children[10].click();
    }
    if ($("div[currenttemplate=ProblemShow] input[type=checkbox]")[0] && !$("div[currenttemplate=ProblemShow] input[type=checkbox]")[0].checked) {
        console.info("%c[LGFk> SubmitHelper]%c enabled -O2.","color:cyan", "color:white");
        $("div[currenttemplate=ProblemShow] input[type=checkbox]")[0].click();
    }
  }
  catch (e) {
    console.warn("%c[LGFk> SubmitHelper]%c uncaught exception:","color:cyan", "color:white", e);
  }
  try {
      let a = document.querySelector(".form-layout .row .search");
      let b = document.createElement("button"), c = {"type": "button", 'class': 'lfe-form-sz-small', 'style': "margin-left: 1cm; border-color: rgb(52, 152, 219); color: white; background-color: rgb(52, 152, 219);"};
      if (!a || !b || !c) return;
      for (var key in c) b.setAttribute(key, c[key]);
      b.innerText = "导出题单"; a.appendChild(b);
      b.onclick = function() {
          let a = document.querySelectorAll(".problem-order .drag-order .wrapper .content>span");
          var b = [];
          a.forEach((x) => {
              x = x.innerHTML;
              b.push(x.slice(0, x.indexOf(' ')));
          });
          console.log(b);
          prompt("复制下面的题目列表.", /*JSON.stringify(b)*/b.toString());
      }
  }
  catch (e) {
    console.warn("%c[LGFk> ProbExport]%c uncaught exception:", "color:cyan", "color:white", e);
  }
});
}

console.log("%c[LGFk]%c loading LG Fucker with jQuery ", "color:cyan", "color:white", jQuery);
main(jQuery);
