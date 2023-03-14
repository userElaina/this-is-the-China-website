// ==UserScript==
// @name 百度搜索美化
// @namespace userElaina
// @version 2023.03.14.159
// @description 中国人就用百度搜索
// @author somereason userElaina
// @license MIT
// @match *://*.google.com/
// @match *://*.google.com/search*
// @match *://*.google.com/imghp*
// @match *://*.google.com.hk/
// @match *://*.google.com.hk/search*
// @match *://*.google.com.hk/imghp*
// @grant none
// ==/UserScript==

(function () {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    let RNNXgb = document.getElementsByClassName('RNNXgb');
    if (RNNXgb.length <= 0) {
        RNNXgb = document.getElementsByClassName('o6juZc');
    }
    if (RNNXgb.length > 0) {
        let searchStyle = RNNXgb[0].style;
        searchStyle.boxShadow = "0 0 0 0";
        searchStyle.border = 0;
        searchStyle.borderRadius = 0;
        searchStyle.background = '#4e6ef21f';
    } else {
        console.log("ERROR: change search style failed.");
    }

    function SearchButton() {
        let Tg7LZd = document.getElementsByClassName('Tg7LZd');
        if (Tg7LZd.length <= 0) {
            Tg7LZd = document.getElementsByClassName('rCGXm');
        }
        if (Tg7LZd.length > 0) {
            let height = Tg7LZd[0].clientHeight;
            Tg7LZd[0].innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/search.png">';
        } else {
            console.log("ERROR: change search button failed.");
        }
    }

    function BigLogo(str) {
        let bannerLogo = document.querySelector("[alt='" + str + "']");
        if (bannerLogo !== null) {
            bannerLogo.src = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/bd_logo1.png";
            bannerLogo.removeAttribute("srcset");
            bannerLogo.width = 270;
            bannerLogo.height = 129;
            let paddingTop = bannerLogo.style.paddingTop.replace("px", "");
            let paddingTopInt = parseInt(paddingTop);
            bannerLogo.style.paddingTop = (paddingTopInt - 20) + "px";
        }
    }

    if (window.location.href.indexOf("/search") > -1) {

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
            console.log("ERROR: change search logo failed.");
        } else {
            let img = logo.querySelector("img");
            if (img === null) {
                logo.childNodes[0].innerHTML = '<img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png" style="background:none" height="30" width="92" data-atf="1" data-frt="0"></img>';
            } else {
                img.src = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png';
            }
        }

        /*
        document.querySelectorAll("a h3").forEach(a => {
            a.style.color = "#0000cc";
        });
        document.querySelectorAll("span.st").forEach(a => {
            a.style.color = "#333333";
        });
        document.querySelectorAll("em, .rbt b, .c b, .fl b").forEach(a => {
            a.style.color = "#CC0000";
        });
        */

        document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度搜索");
        SearchButton();

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
    } else if (window.location.href.indexOf("/imghp") > -1) {

        BigLogo('Google Images');
        document.title = "百度图片, 发现多彩世界";
        SearchButton();

        let T8VaVe = document.getElementsByClassName("T8VaVe");
        if (T8VaVe.length > 0) {
            T8VaVe[0].innerHTML = '';
        }

    } else {

        BigLogo('Google');
        document.title = "百度一下, 你就知道";

        document.querySelectorAll('a.gb_d, a.gb_p, a.gb_q').forEach(v => {
            if (v.dataset.pid === '2') {
                v.innerText = '百度识图';
                if (v.href.indexOf("google.cn") > -1) {
                    v.href = 'https://images.google.com.hk/imghp';
                }
            } else if (v.dataset.pid === '23') {
                v.innerHTML = '百度邮箱';
            }
        });

        document.getElementsByName("btnK").forEach(v => {
            v.value = "百度搜索";
        });

        let footnote = document.getElementById("SIvCob");
        if (footnote !== null) {
            footnote.innerHTML = '百度提供: ' + footnote.innerHTML.slice(footnote.innerHTML.indexOf('<'));
        }

        /*
        document.getElementsByClassName("Fx4vi").forEach(v =>{
            v.innerHTML = v.innerHTML.replace(/Google\s?/, "百度");
        });
        */
    }

})();
