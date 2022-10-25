// ==UserScript==
// @name 码云美化
// @namespace userElaina
// @version 2022.10.24.1
// @description 中国人就用码云
// @author userElaina
// @license MIT
// @match *.github.com/*
// @grant none
// ==/UserScript==

(function () {
    document.querySelector('link[rel="icon"]').href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/github/gitee.ico';
    if (document.title.startsWith('GitHub')) {
        document.title = document.title.slice(6);
        if(document.title == ''){
            document.title ='- 基于 Git 的代码托管和研发协作平台';
        }
    } else {
        document.title = '- ' + document.title;
    }
    document.title = 'Gitee ' + document.title;
    var bigLogo = document.querySelector('a[class="Header-link"]');
    var height = bigLogo.clientHeight;
    bigLogo.innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/github/gitee_white.svg">';
})();
