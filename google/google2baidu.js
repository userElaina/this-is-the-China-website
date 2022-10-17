// ==UserScript==
// @name 百度搜索美化
// @namespace userElaina
// @version 2022.10.16.20
// @description 中国人就用百度搜索
// @author somereason userElaina
// @license MIT
// @match *.google.com/search*
// @match *.google.com.*/search*
// @match *.google.com/
// @match *.google.com.*/
// @grant none
// ==/UserScript==

(function () {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    if (window.location.href.indexOf("/search") > -1) {
        var logo = document.getElementById("logo");
        var logoArr;
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
            console.log("oops, pls wait for update");
        } else {
            var imgSize = getImgSize(logo);
            logo.innerHTML = '<a href="/" data-hveid="7"><img src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/baidu_big.png" alt="Baidu" data-atf="3" height="' + imgSize.height + 'px" width="' + imgSize.width + 'px"></a>';

            document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度搜索");
        }
        document.querySelectorAll("a h3").forEach(a => a.style.color = "#0000cc");
        document.querySelectorAll("span.st").forEach(a => a.style.color = "#333333")
        document.querySelectorAll("em, .rbt b, .c b, .fl b").forEach(a => a.style.color = "#CC0000")

        var Tg7LZd = document.getElementsByClassName('Tg7LZd')[0];
        var height = Tg7LZd.clientHeight;
        Tg7LZd.innerHTML = '<img height=' + height + ' src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/search.png">';

        var searchStyle=document.getElementsByClassName('RNNXgb')[0].style;
        searchStyle.boxShadow="0 0 0 0";
        searchStyle.border=0;
        searchStyle.borderRadius=0;
        searchStyle.background='#4e6ef21f';

        var navTabSpans = document.getElementsByClassName("SJajHc");
        for (var i = 0; i < navTabSpans.length; i++) {
            var naviImageUrl = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/icons.png";
            navTabSpans[i].style.width = "22px";
            if (i === 0) {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat 0px 0px';
            } else if (i == navTabSpans.length - 1) {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat 0px 0px';
            } else if (navTabSpans[i].classList.contains("NVbCr")) {
                navTabSpans[i].style.background = i % 2 == 1 ? 'url("' + naviImageUrl + '") no-repeat -144px -288px' : 'url("' + naviImageUrl + '") no-repeat -144px -282px'; //让页面底部的百度脚丫子错落有致,感谢Raka-loah 
            } else {
                navTabSpans[i].style.background = 'url("' + naviImageUrl + '") no-repeat -96px -288px';
            }
        }
    } else {
        let bannerLogo = document.querySelector("[alt=Google]")
        bannerLogo.src = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/bd_logo1.png";
        bannerLogo.removeAttribute("srcset");
        bannerLogo.width = 270;
        bannerLogo.height = 129;
        let paddingTop = bannerLogo.style.paddingTop.replace("px", "");
        let paddingTopInt = parseInt(paddingTop);
        bannerLogo.style.paddingTop = (paddingTopInt - 20) + "px";

        var searchBtns = document.getElementsByName("btnK");
        for (var x = 0; x < searchBtns.length; x++) {
            searchBtns[x].value = searchBtns[x].value.replace(/Google\s?/, "百度");
        }

        document.title = document.title.replace(/Google/g, "百度一下，你就知道");
        var footnote = document.getElementById("SIvCob");
        if (footnote !== null) {
            footnote.innerHTML = footnote.innerHTML.replace(/Google\s?/, "百度");
        }
        var footElements = document.getElementsByClassName("Fx4vi");
        for (var u = 0; u < footElements.length; u++) {
            footElements[u].innerHTML = footElements[u].innerHTML.replace(/Google\s?/, "百度");
        }
    }

    function getImgSize(elLogo) {
        var elImg = elLogo.querySelector("img");
        if (elImg === null) {
            return { height: 30, width: 92 }
        } else {
            return { height: elImg.height, width: elImg.width }
        }
    }
})();
