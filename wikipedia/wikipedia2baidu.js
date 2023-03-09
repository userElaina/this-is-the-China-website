// ==UserScript==
// @name 百度百科美化
// @namespace userElaina
// @version 2023.03.09.1
// @description 中国人就用百度百科
// @author userElaina
// @license MIT
// @match *://*.wikipedia.org/*
// @grant none
// ==/UserScript==

(function () {
    document.querySelector('link[rel="icon"]').href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/wikipedia/baidu.ico';
    document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度百科");

    let searchBox = document.querySelector('input.vector-search-box-input');
    if (searchBox !== null) {
        searchBox.placeholder = '搜索百度百科';
    } else {
        console.log("ERROR: change search box failed.");
    }

    let siteSub = document.getElementById("siteSub");
    if (siteSub !== null) {
        siteSub.innerText = '百度百科, 全球领先的中文百科全书!';
    } else {
        console.log("ERROR: change site sub failed.");
    }

    let logo = document.querySelector('a.mw-wiki-logo');
    if (logo !== null) {
        logo.innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/wikipedia/baidu_big.png" style="padding:10px;padding-top:40px;width:-webkit-fill-available;">';
        logo.className = '';
    }
    logo = document.querySelector('a.mw-logo');
    if (logo !== null) {
        logo.innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/wikipedia/baidu_big.png" style="padding:10px;padding-top:20px;width:-webkit-fill-available;">';
        logo.className = '';
    }

})();
