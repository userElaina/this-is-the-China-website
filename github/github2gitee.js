// ==UserScript==
// @name 码云美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2025.03.18.01
// @description 中国人就用码云
// @author userElaina
// @license MIT
// @match *://*.github.com/*
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
    if (document.title.startsWith('GitHub')) {
        document.title = document.title.slice(6);
        if (document.title === '') {
            document.title = '基于 Git 的代码托管和研发协作平台';
        }
    }
    document.title = document.title + ': 欢迎关注和订阅国内流量最高的开放源代码...';

    // change icon
    await f_succ(() => {
        let icon = document.querySelector('link[rel="icon"]');
        if (icon === null) {
            return false;
        }
        icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/github/gitee.ico';
        return true;
    });

    // change logo on top left
    f_succ(() => {
        let logo = document.querySelector('a[class="AppHeader-logo ml-1 "]');
        if (logo === null) {
            logo = document.querySelector('a[class="AppHeader-logo ml-2"]');
            if (logo === null) {
                return false;
            }
        }
        logo.innerHTML = '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#c71d23" r="16"/><path d="m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0002135l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044-.0000066.0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.79011894l.0012251-1.97521881c.0007606-.43637034-.3527683-.79033806-.7891389-.79060871-.0001634-.0000001-.0003268-.00000015-.0004901.00048976h-11.0617654c-3.27278051 0-5.92589329 2.65311278-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z" fill="#fff"/></g></svg>';
        return true;
    });

})();
