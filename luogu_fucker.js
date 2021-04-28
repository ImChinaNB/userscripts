// ==UserScript==
// @name        Luogu Fucker
// @namespace   Luogu Scripts
// @match       *://www.luogu.com.cn/*
// @grant       none
// @version     1.1
// @author      ImChinaNB
// @description Fuck up Luogu so it selects C++17 and enables O2 by default.
// @require https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant       GM_addStyle
// @grant       GM.getValue
// @run-at      document-idle
// ==/UserScript==
//
function main($) {
  const w = (x) => { return () => { return $(x); } } ;
  const _ = {
      "sb" : w(".side > div:last-of-type:visible"),
      "lang": w("div[currenttemplate=ProblemShow] .combo-wrapper.lang-select:visible > div.text"),
      "langul": w("div[currenttemplate=ProblemShow] .combo-wrapper.lang-select:visible ul"),
      "o2box": w("div[currenttemplate=ProblemShow] .combo-wrapper.lang-select:visible + div input[type=checkbox]"),
      "watch": "div[currenttemplate=ProblemShow]",
      "style": {"type": "button", 'class': 'lfe-form-sz-small', 'style': "margin-left: 1cm; border-color: rgb(52, 152, 219); color: white; background-color: rgb(52, 152, 219);"}
  };
  waitForKeyElements(".side > div:last-of-type", () => {
    let ad = _.sb();
    if (ad.text().indexOf("洛谷推荐") != -1) {
      console.log("%c[LGFk> AdRemover]%c hiding ad", "color:cyan", "color:white", ad[0]);
      ad.hide();
    }
  });

  const l = () => {
    try {
      let a = _.lang(), b = _.langul(), c = _.o2box();
      if (a.text() == "自动识别语言" || a.text() == "C++11") {
        console.log("%c[LGFk> SubmitHelper]%c language set to C++17.","color:cyan", "color:white");
        b.children(10).click();
      }
      if (c[0] && !c.is(":checked")) {
          console.log("%c[LGFk> SubmitHelper]%c enabled -O2.","color:cyan", "color:white");
          c.click();
      }
    }
    catch (e) {
      console.warn("%c[LGFk> SubmitHelper]%c uncaught exception:","color:cyan", "color:white", e);
    }
    try {
        let a = $(".form-layout .row .search"), b = $(document.createElement("button"));
        if (!a[0] || $(".form-layout .row .search button").text().indexOf("导出题单") != -1) return;
        for (let key in _.style) b.attr(key, _.style[key]);
        console.log("%c[LGFk> ProbExport]%c created the export button.","color:cyan", "color:white");
        a.append(b.text("导出题单").click(() => {
            let a = $(".problem-order .drag-order .wrapper .content>span");
            let b = [];
            a.toArray().forEach((x) => {
                x = x.innerHTML;
                b.push(x.slice(0, x.indexOf(' ')));
            });
            console.log(b);
            prompt("复制下面的题目列表.", /*JSON.stringify(b)*/b.toString());
        }));
    }
    catch (e) {
      console.warn("%c[LGFk> ProbExport]%c uncaught exception:", "color:cyan", "color:white", e);
    }
  };
  // new MutationObserver(l).observe($("body")[0], { attributes: true, childList: true, subtree: true });
  setInterval(l, 200);
}

this.$ = this.jQuery = jQuery.noConflict(true);

console.log("%c[LGFk]%c loading LG Fucker with jQuery ", "color:cyan", "color:white", this.$);
main(this.$);
