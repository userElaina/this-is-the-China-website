// ==UserScript==
// @name Steam 美化
// @namespace userElaina
// @version 2023.03.08.1
// @description 中国人就用蒸汽平台
// @author userElaina
// @license MIT
// @match *://*.store.steampowered.com/*
// @grant none
// ==/UserScript==

(function () {
    document.title = document.title.replace(' Steam', 'Steam').replace('Steam ', 'Steam').replace('Steam', '蒸汽平台');
    document.getElementById("logo_holder").childNodes[1].childNodes[1].src = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/steam/logo.svg';
    document.getElementsByClassName('home_page_gutter_giftcard')[0].height = 0;
})();
