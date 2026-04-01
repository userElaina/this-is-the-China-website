// ==UserScript==
// @name 超级AI搜索
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2026.04.01.01
// @description 最强国产超级AI搜索
// @author userElaina somereason
// @license MIT
// @match *://*.google.com/
// @match *://*.google.com/webhp*
// @match *://*.google.com/search*
// @match *://*.google.com/imghp*
// @match *://scholar.google.com/*
// @match *://*.google.com.hk/
// @match *://*.google.com.hk/webhp*
// @match *://*.google.com.hk/search*
// @match *://*.google.com.hk/imghp*
// @match *://scholar.google.com.hk/*
// @match *://*.google.com.tw/
// @match *://*.google.com.tw/webhp*
// @match *://*.google.com.tw/search*
// @match *://*.google.com.tw/imghp*
// @match *://scholar.google.com.tw/*
// @match *://*.google.co.jp/
// @match *://*.google.co.jp/webhp*
// @match *://*.google.co.jp/search*
// @match *://*.google.co.jp/imghp*
// @match *://scholar.google.co.jp/*
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
    // change icon
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google2what/what.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    if (window.location.href.indexOf("/search") > -1) {
        // search page

        // change search logo
        f_succ(() => {
            let logo = document.getElementById("logo");
            let logoArr;
            let img_src = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google2what/what_small.png";
            let img_str = '<img src="' + img_src + '" style="background:none" width="96" height="32" data-atf="1" data-frt="0"></img>';
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
                let svg = logo.querySelector("svg");
                if (svg === null) {
                    if (logo.childElementCount <= 0) {
                        return false;
                    }
                    logo.innerHTML = img_str;
                } else {
                    logo.innerHTML = img_str;
                }
            } else {
                img.src = img_src;
            }
            return true;
        });

        document.title = document.title.replace(/\s-[\s\S]*/g, " - 超级AI搜索");

        document.querySelectorAll("span.SJajHc").forEach(v => {
            let parent = v.parentElement;
            v.remove();
            parent.innerHTML = '&nbsp;&nbsp;' + parent.innerHTML + '&nbsp;&nbsp;';
        });

    } else if (window.location.href.indexOf("scholar") > -1) {

        if (window.location.href.indexOf("/scholar?") > -1) {
            document.title = document.title.replace(/\s-[\s\S]*/g, " - 超级AI学术搜索");
            f_succ(() => {
                let gs_hdr_lgo = document.getElementById("gs_hdr_lgo");
                if (gs_hdr_lgo === null) {
                    return false;
                }
                gs_hdr_lgo.remove();
                return true;
            });
        } else {
            document.title = "最强国产超级AI学术搜索";
            f_succ(() => {
                let gs_hdr_hp_lgo = document.getElementById("gs_hdr_hp_lgo");
                if (gs_hdr_hp_lgo === null) {
                    return false;
                }
                gs_hdr_hp_lgo.srcset = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google2what/what_small.png";
                return true;
            });
        }

    } else if (window.location.href.indexOf("/imghp") > -1) {
        // Google Images

        // change big logo
        f_succ(() => {
            let bigLogo = document.querySelector("div[class='k1zIA rSk4se']");
            if (bigLogo === null) {
                return false;
            }
            bigLogo.innerHTML = '<style>.rSk4se{max-height:92px;position:relative}.lnXdpd{max-height:100%;max-width:100%;object-fit:contain;object-position:center bottom;width:auto}</style><img class="lnXdpd" alt="Google Images" src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google2what/what_small.png" width="256" height="85">';
            return true;
        });

        // 'images' word under logo
        f_succ(() => {
            let T8VaVe = document.getElementsByClassName("T8VaVe");
            if (T8VaVe.length <= 0) {
                return false;
            }
            T8VaVe[0].innerHTML = '';
            return true;
        });

        document.title = "最强国产超级AI识图";

        document.querySelectorAll('span.gb_Id').forEach(v => {
            v.innerHTML = '登陆';
        });

        document.querySelectorAll("a.pHiOh, div.ayzqOc.pHiOh").forEach(v => {
            // v.innerHTML = v.innerHTML.replace(/\s?Google\s?/, "百度");
            v.innerHTML = v.innerHTML.replace("About", "关于超级AI搜索");
            v.innerHTML = v.innerHTML.replace("Advertising", "投放广告");
            v.innerHTML = v.innerHTML.replace("Business", "商务合作");
            v.innerHTML = v.innerHTML.replace("How Search works", "运作原理");
            v.innerHTML = v.innerHTML.replace("Privacy", "隐私");
            v.innerHTML = v.innerHTML.replace("Terms", "条款");
            v.innerHTML = v.innerHTML.replace("Settings", "设置");
        });

        f_succ(() => {
            let btnK = document.getElementsByName("btnK")
            if (btnK.length <= 0) {
                return false;
            }
            btnK.forEach(v => {
                v.value = "超级AI搜索";
            });
            return true;
        });

        f_succ(() => {
            let btnI = document.getElementsByName("btnI")
            if (btnI.length <= 0) {
                return false;
            }
            btnI.forEach(v => {
                v.value = "今日运势";
            });
            return true;
        });

        f_succ(() => {
            let footnote = document.getElementById("SIvCob");
            if (footnote === null) {
                return false;
            }
            footnote.innerHTML = '超级AI搜索提供: ' + footnote.innerHTML.slice(footnote.innerHTML.indexOf('<'));
            return true;
        });

        document.querySelectorAll("div.uU7dJb").forEach(v => {
            v.innerHTML = "广公网信备11011101111101号  广IPC证01048576号  互联网信息新闻服务许可证〔2025〕33550226号";
        });

        // } else if (window.location.href.indexOf("/webhp") > -1) {
        // same as main page, reached by clicking on the logo
    } else {
        // main page

        // change big logo
        f_succ(() => {
            let bigLogo = document.querySelector("div[class='k1zIA rSk4se']");
            if (bigLogo === null) {
                return false;
            }
            // bigLogo.removeAttribute("srcset");
            bigLogo.innerHTML = '<style>.rSk4se{max-height:92px;position:relative}.lnXdpd{max-height:100%;max-width:100%;object-fit:contain;object-position:center bottom;width:auto}</style><img class="lnXdpd"  aria-label="Google" role="img" src="https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google2what/what_small.png" width="256" height="85">';
            return true;
        });

        document.title = "最强国产超级AI搜索";

        document.querySelectorAll('a.gb_d, a.gb_p, a.gb_q, a.gb_F, a.gb_H, a.gb_Z').forEach(v => {
            if (v.dataset.pid === '2') {
                v.innerText = '超级AI识图';
                if (v.href.indexOf("google.cn") > -1) {
                    v.href = 'https://images.google.com/imghp';
                }
            } else if (v.dataset.pid === '23') {
                v.innerHTML = '超级AI邮箱';
            }
        });

        document.querySelectorAll('span.lTxWLe').forEach(v => {
            v.innerHTML = 'AI 模式';
        });

        document.querySelectorAll('span.gb_Id').forEach(v => {
            v.innerHTML = '登录';
        });

        document.querySelectorAll("a.pHiOh, div.ayzqOc.pHiOh").forEach(v => {
            // v.innerHTML = v.innerHTML.replace(/\s?Google\s?/, "百度");
            v.innerHTML = v.innerHTML.replace("About", "关于超级AI搜索");
            v.innerHTML = v.innerHTML.replace("Advertising", "投放广告");
            v.innerHTML = v.innerHTML.replace("Business", "商务合作");
            v.innerHTML = v.innerHTML.replace("How Search works", "运作原理");
            v.innerHTML = v.innerHTML.replace("Privacy", "隐私");
            v.innerHTML = v.innerHTML.replace("Terms", "条款");
            v.innerHTML = v.innerHTML.replace("Settings", "设置");
        });

        f_succ(() => {
            let btnK = document.getElementsByName("btnK")
            if (btnK.length <= 0) {
                return false;
            }
            btnK.forEach(v => {
                v.value = "超级AI搜索";
            });
            return true;
        });

        f_succ(() => {
            let btnI = document.getElementsByName("btnI")
            if (btnI.length <= 0) {
                return false;
            }
            btnI.forEach(v => {
                v.value = "今日运势";
            });
            return true;
        });

        f_succ(() => {
            let footnote = document.getElementById("SIvCob");
            if (footnote === null) {
                return false;
            }
            footnote.innerHTML = '超级AI搜索提供: ' + footnote.innerHTML.slice(footnote.innerHTML.indexOf('<'));
            return true;
        });

        // Google 区域改为 ICP 备
        document.querySelectorAll("div.uU7dJb").forEach(v => {
            v.innerHTML = "广公网信备11011101111101号  广IPC证01048576号  互联网信息新闻服务许可证〔2025〕33550226号";
        });

    }

})();
