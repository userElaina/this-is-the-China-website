// ==UserScript==
// @name 百度搜索美化
// @namespace userElaina
// @version 2023.03.09.1
// @description 中国人就用百度搜索
// @author somereason userElaina
// @license MIT
// @match *://*.google.com
// @match *://*.google.com/search*
// @match *://*.google.com.hk
// @match *://*.google.com.hk/search*
// @grant none
// ==/UserScript==

(function () {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    let searchList = document.getElementsByClassName('RNNXgb');
    if (searchList.length > 0) {
        let searchStyle = searchList[0].style;
        searchStyle.boxShadow = "0 0 0 0";
        searchStyle.border = 0;
        searchStyle.borderRadius = 0;
        searchStyle.background = '#4e6ef21f';
    } else {
        console.log("ERROR: change search style failed.");
    }

    if (window.location.href.indexOf("/search") > -1) {
        let logo = document.getElementById("logo");
        let logoArr;
        if (logo === null) {
            logoArr = document.getElementsByClassName("logo");
            if (logoArr.length > 0) {
                logo = logoArr[0];
            }
        }
        if (logo === null) {
            logoArr = document.getElementsByClassName("logocont");
            if (logoArr.length > 0) {
                logo = logoArr[0];
            }
        }
        if (logo === null) {
            console.log("ERROR: change search logo failed.");
        } else {
            let imgSize = getImgSize(logo);
            logo.innerHTML = '<a href="/" data-hveid="7"><img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png" alt="Baidu" data-atf="3" height="' + imgSize.height + 'px" width="' + imgSize.width + 'px"></a>';
            document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度搜索");
        }
        document.querySelectorAll("a h3").forEach(a => {
            a.style.color = "#0000cc";
        });
        document.querySelectorAll("span.st").forEach(a => {
            a.style.color = "#333333";
        });
        document.querySelectorAll("em, .rbt b, .c b, .fl b").forEach(a => {
            a.style.color = "#CC0000";
        });

        let Tg7LZd = document.getElementsByClassName('Tg7LZd')[0];
        let height = Tg7LZd.clientHeight;
        Tg7LZd.innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/search.png">';

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
    } else {
        let bannerLogo = document.querySelector("[alt=Google]");
        if (bannerLogo !== null) {
            bannerLogo.src = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/bd_logo1.png";
            bannerLogo.removeAttribute("srcset");
            bannerLogo.width = 270;
            bannerLogo.height = 129;
            let paddingTop = bannerLogo.style.paddingTop.replace("px", "");
            let paddingTopInt = parseInt(paddingTop);
            bannerLogo.style.paddingTop = (paddingTopInt - 20) + "px";
        }

        document.title = "百度一下, 你就知道";
        document.querySelectorAll('a.gb_d, a.gb_p, a.gb_q').forEach(v => {
            if (v.dataset.pid === '2') {
                v.innerText = '百度识图';
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

    function getImgSize(elLogo) {
        let elImg = elLogo.querySelector("img");
        if (elImg === null) {
            return { height: 30, width: 92 }
        } else {
            return { height: elImg.height, width: elImg.width }
        }
    }

})();
