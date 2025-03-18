// ==UserScript==
// @name 百度贴吧美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2025.03.18.01
// @description 中国人就用百度贴吧
// @author userElaina
// @license MIT
// @match *://*.reddit.com/*
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
    await f_succ(() => {
        let urls = window.location.href.split('/');
        if (urls.length <= 4) {
            document.title = '百度贴吧——全球领先的中文社区';
            return true;
        }

        if (urls.length <= 6 && urls[3] == 'r') {
            document.title = urls[4] + '吧-百度贴吧--' + document.title + '--全球领先的中文社区';
            return true;
        }

        if (urls[3] == 'user') {
            document.title = urls[4] + '的贴吧-百度贴吧--全球领先的中文社区';
            return true;
        }

        if (urls[3] == 'r') {
            document.title = document.title.split(' : r/')[0] + '【' + urls[4] + '吧】_百度贴吧';
            return true;
        }

        document.title = '百度贴吧——全球领先的中文社区';
        return true;
    });

    // change icon
    await f_succ(() => {
        let icon = document.head.querySelector('[rel="icon shortcut"]');
        if (icon === null) {
            return false;
        }
        icon.type = 'image/x-icon';
        icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/reddit/baidu.ico';
        // document.getElementsByTagName('head')[0].appendChild(icon);
        return true;
    });

    // change logo
    f_succ(() => {
        let logo = document.getElementById('reddit-logo');
        if (logo === null) {
            return false;
        }
        document.getElementById('reddit-logo').innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/reddit/teiba_big.png" style="background:none" height="45" width="135" data-atf="1" data-frt="0"></img>';
        return true;
    });

})();
