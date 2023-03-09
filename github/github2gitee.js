// ==UserScript==
// @name 码云美化
// @namespace userElaina
// @version 2023.03.09.1
// @description 中国人就用码云
// @author userElaina
// @license MIT
// @match *://*.github.com/*
// @grant none
// ==/UserScript==

(function () {
    let icon = document.querySelector('link[rel="icon"]');
    if (icon !== null) {
        icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/github/gitee.ico';
    } else {
        console.log("ERROR: change icon failed.");
    }

    if (document.title.startsWith('GitHub')) {
        document.title = document.title.slice(6);
        if (document.title === '') {
            document.title = '- 基于 Git 的代码托管和研发协作平台';
        }
    } else {
        document.title = '- ' + document.title;
    }
    document.title = 'Gitee ' + document.title;

    let logo = document.querySelector('a[class="Header-link"]');
    let height = logo.clientHeight;
    logo.innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/github/gitee_white.svg">';

})();
