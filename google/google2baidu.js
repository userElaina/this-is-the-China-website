// ==UserScript==
// @name 百度搜索美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2024.01.18.01
// @description 中国人就用百度搜索
// @author somereason userElaina
// @license MIT
// @match *://*.google.com/
// @match *://*.google.com/webhp*
// @match *://*.google.com/search*
// @match *://*.google.com/imghp*
// @match *://*.google.com.hk/
// @match *://*.google.com.hk/webhp*
// @match *://*.google.com.hk/search*
// @match *://*.google.com.hk/imghp*
// @match *://*.google.com.tw/
// @match *://*.google.com.tw/webhp*
// @match *://*.google.com.tw/search*
// @match *://*.google.com.tw/imghp*
// @match *://*.google.co.jp/
// @match *://*.google.co.jp/webhp*
// @match *://*.google.co.jp/search*
// @match *://*.google.co.jp/imghp*
// @grant none
// ==/UserScript==

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function f_succ(f, msSleep = 500, maxCount = 10) {
    let count = 0;
    while (true) {
        if (f()) {
            return true;
        }
        count++;
        if (count > maxCount) {
            return false;
        }
        await sleep(msSleep);
    }
}

(async function () {
    // change icon
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    // change search style
    f_succ(() => {
        let RNNXgb = document.getElementsByClassName('RNNXgb');
        if (RNNXgb.length <= 0) {
            RNNXgb = document.getElementsByClassName('o6juZc');
        }
        if (RNNXgb.length <= 0) {
            return false;
        }
        let searchStyle = RNNXgb[0].style;
        searchStyle.boxShadow = "0 0 0 0";
        searchStyle.border = 0;
        searchStyle.borderRadius = 0;
        searchStyle.background = '#4e6ef21f';
        return true;
    });

    // func: change search button
    async function SearchButton(s0) {
        await f_succ(() => {
            let Tg7LZd = document.getElementsByClassName('Tg7LZd');
            if (Tg7LZd.length <= 0) {
                Tg7LZd = document.getElementsByClassName('rCGXm');
            }
            if (Tg7LZd.length <= 0) {
                return false;
            }
            let height = Tg7LZd[0].clientHeight;
            Tg7LZd[0].innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/' + s0 + '.png">';
            return true;
        });
    }

    // func: change big logo
    async function BigLogo(str) {
        await f_succ(() => {
            let bannerLogo = document.querySelector("[alt='" + str + "']");
            if (bannerLogo === null) {
                return false;
            }
            bannerLogo.src = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png";
            bannerLogo.removeAttribute("srcset");
            bannerLogo.width = 117 * 2;
            bannerLogo.height = 38 * 2;
            /*
            let paddingTop = bannerLogo.style.paddingTop.replace("px", "");
            let paddingTopInt = parseInt(paddingTop);
            bannerLogo.style.paddingTop = (paddingTopInt - 20) + "px";
            */
            return true;
        });
    }

    if (window.location.href.indexOf("/search") > -1) {
        // search page

        // change search logo
        f_succ(() => {
            let logo = document.getElementById("logo");
            let logoArr;
            if (logo === null) {
                logoArr = document.getElementsByClassName("logo");
                if (logoArr.length <= 0) {
                    logoArr = document.getElementsByClassName("logocont");
                    if (logoArr.length <= 0) {
                        logoArr = document.getElementsByClassName("qlS7ne");
                    }
                }
                if (logoArr.length > 0) {
                    logo = logoArr[0];
                }
            }
            if (logo === null) {
                return false;
            }
            let img = logo.querySelector("img");
            if (img === null) {
                if (logo.childElementCount <= 0) {
                    return false;
                }
                logo.childNodes[0].innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png" style="background:none" height="30" width="92" data-atf="1" data-frt="0"></img>';
            } else {
                img.src = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png';
            }
            return true;
        });

        document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度搜索");
        SearchButton('search');

        let naviImageUrl = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/icons.png";
        let navTabSpans = document.getElementsByClassName("SJajHc");
        for (let i = 0; i < navTabSpans.length; i++) {
            navTabSpans[i].style.width = "22px";
            if (i === 0) {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat 0px 0px';
            } else if (i == navTabSpans.length - 1) {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat 0px 0px';
            } else if (navTabSpans[i].classList.contains("NVbCr")) {
                navTabSpans[i].style.background = i % 2 == 1 ? 'url("' + naviImageUrl + '") no-repeat -144px -288px' : 'url("' + naviImageUrl + '") no-repeat -144px -282px';
            } else {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat -96px -288px';
            }
        }

        /*
        // Help Send feedback Privacy Terms
        document.getElementsByClassName("Fx4vi").forEach(v =>{
            v.innerHTML = v.innerHTML.replace(/Google\s?/, "百度");
        });
        */

    } else if (window.location.href.indexOf("/imghp") > -1) {
        // Google Images

        BigLogo('Google Images');
        document.title = "百度图片, 发现多彩世界";
        SearchButton('imghp');
        f_succ(() => {
            let T8VaVe = document.getElementsByClassName("T8VaVe");
            if (T8VaVe.length <= 0) {
                return false;
            }
            T8VaVe[0].innerHTML = '';
            return true;
        });

        // } else if (window.location.href.indexOf("/webhp") > -1) {
        // same as main page, reached by clicking on the logo
    } else {
        // main page

        BigLogo('Google');
        document.title = "百度一下, 你就知道";

        document.querySelectorAll('a.gb_d, a.gb_p, a.gb_q, a.gb_F').forEach(v => {
            if (v.dataset.pid === '2') {
                v.innerText = '百度识图';
                if (v.href.indexOf("google.cn") > -1) {
                    v.href = 'https://images.google.com.hk/imghp';
                }
            } else if (v.dataset.pid === '23') {
                v.innerHTML = '百度邮箱';
            }
        });

        document.querySelectorAll('span.gb_Id').forEach(v => {
            v.innerHTML = '登录';
        });

        // 关于百度 广告 商务 百度搜索的运作方式 隐私权 条款 设置
        document.querySelectorAll("a.pHiOh").forEach(v => {
            v.innerHTML = v.innerHTML.replace(/\s?Google\s?/, "百度");
        });

        f_succ(() => {
            let btnK = document.getElementsByName("btnK")
            if (btnK.length <= 0) {
                return false;
            }
            btnK.forEach(v => {
                v.value = "百度搜索";
            });
            return true;
        });

        f_succ(() => {
            let footnote = document.getElementById("SIvCob");
            if (footnote === null) {
                return false;
            }
            footnote.innerHTML = '百度提供: ' + footnote.innerHTML.slice(footnote.innerHTML.indexOf('<'));
            return true;
        });

    }

})();
