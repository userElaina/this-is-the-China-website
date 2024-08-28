// ==UserScript==
// @name 百度百科美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2023.09.22.01
// @description 中国人就用百度百科
// @author userElaina
// @license MIT
// @match *://*.wikipedia.org/*
// @grant none
// ==/UserScript==

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function f_succ(f, msSleep = 500, maxCount = 10) {
    let count = 0;
    while (true) {
        try {
            if (f()) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
        count++;
        if (count > maxCount) {
            return false;
        }
        await sleep(msSleep);
    }
}

(async function () {
    // change title
    document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度百科");

    // change icon
    await f_succ(() => {
        let icon = document.querySelector('link[rel="icon"]');
        if (icon === null) {
            return false;
        }
        icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/wikipedia/baidu.ico';
        return true;
    });

    // change searchbox
    f_succ(() => {
        let searchBox = document.querySelector('input.vector-search-box-input');
        if (searchBox === null) {
            searchBox = document.querySelector('input.cdx-text-input__input')
        }
        if (searchBox === null) {
            return false;
        }
        searchBox.placeholder = '搜索百度百科';
        return true;
    });

    // change sitesub
    f_succ(() => {
        let siteSub = document.getElementById("siteSub");
        if (siteSub === null) {
            return false;
        }
        siteSub.innerText = '百度百科, 全球领先的中文百科全书!';
        return true;
    });

    // change logo
    f_succ(() => {
        let logo = document.querySelector('a.mw-wiki-logo');
        if (logo === null) {
            logo = document.querySelector('a.mw-logo');
        }
        if (logo === null) {
            return false;
        }
        logo.innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/wikipedia/baidu_big.png" style="padding:10px;padding-top:40px;width:-webkit-fill-available;">';
        logo.className = '';
        return true;
    });

})();
