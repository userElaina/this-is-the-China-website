// ==UserScript==
// @name 百度百科美化
// @namespace userElaina
// @version 2022.10.15.1
// @description 中国人就用百度百科
// @author userElaina
// @license MIT
// @match *://*.wikipedia.org/*/*
// @grant none
// ==/UserScript==

(function () {
    document.querySelector('link[rel="icon"]').href = 'https://www.baidu.com/favicon.ico';
    document.title = document.title.replace(/\s-[\s\S]*/g, "_百度百科");
    var bigLogo = document.querySelector('a[class="mw-wiki-logo"]');
    bigLogo.innerHTML = '<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png" alt="Baidu" data-atf="3" height="100px" width="160px">';
    bigLogo.className = '';
    document.getElementById("siteSub").innerText = '百度百科或许会倒闭, 但一定不会变质!'
})();
