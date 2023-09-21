// ==UserScript==
// @name 蒸汽平台美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2023.03.09.1
// @description 中国人就用蒸汽平台
// @author userElaina
// @license MIT
// @match *://*.steampowered.com/*
// @match *://*.steamcommunity.com/*
// @grant none
// ==/UserScript==

(function () {
    document.title = document.title.replace(' Steam', 'Steam').replace('Steam ', 'Steam').replace('Steam', '蒸汽平台');
    let logo = document.getElementById("logo_holder");
    if (logo !== null) {
        logo.childNodes[1].childNodes[1].src = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/steam/logo.svg';
    } else {
        console.log("ERROR: change logo failed.");
    }

    let giftcard = document.getElementsByClassName('home_page_gutter_giftcard');
    if (giftcard.length > 0) {
        giftcard[0].height = 0;
    }

})();
