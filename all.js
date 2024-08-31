// ==UserScript==
// @name 超级下载器
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2024.08.28.02
// @description 中国人就用中国网站
// @author userElaina
// @license MIT
// @match *://*.youtube.com/*
// @match *://*.wikipedia.org/*
// @match *://*.github.com/*
// @match *://*.steampowered.com/*
// @match *://*.steamcommunity.com/*
// @match *://*.twitter.com/*
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
// @match *://*.x.com/*
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
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('__CN_web__', {
            createHTML: (string, sink) => string
        });
    }

    if (document.domain.search('google') != -1) {

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

        } else if (window.location.href.indexOf("scholar") > -1) {

            if (window.location.href.indexOf("/scholar?") > -1) {
                document.title = document.title.replace(/\s-[\s\S]*/g, " - 百度学术");
                f_succ(() => {
                    let gs_hdr_lgo = document.getElementById("gs_hdr_lgo");
                    if (gs_hdr_lgo === null) {
                        return false;
                    }
                    gs_hdr_lgo.remove();
                    return true;
                });
            } else {
                document.title = "百度学术 - 保持学习的态度";
                f_succ(() => {
                    let gs_hdr_hp_lgo = document.getElementById("gs_hdr_hp_lgo");
                    if (gs_hdr_hp_lgo === null) {
                        return false;
                    }
                    gs_hdr_hp_lgo.srcset = "https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/google/scholar.png";
                    return true;
                });
            }

            // } else if (window.location.href.indexOf("/webhp") > -1) {
            // same as main page, reached by clicking on the logo
        } else {
            // main page

            BigLogo('Google');
            document.title = "百度一下, 你就知道";

            document.querySelectorAll('a.gb_d, a.gb_p, a.gb_q, a.gb_F, a.gb_H').forEach(v => {
                if (v.dataset.pid === '2') {
                    v.innerText = '百度识图';
                    if (v.href.indexOf("google.cn") > -1) {
                        v.href = 'https://images.google.com/imghp';
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

            /*
            document.getElementsByClassName("Fx4vi").forEach(v =>{
                v.innerHTML = v.innerHTML.replace(/Google\s?/, "百度");
            });
            */

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
                footnote.innerHTML = '百度提供: ' + footnote.innerHTML.slice(footnote.innerHTML.indexOf('<'));
                return true;
            });

            // Google 区域改为京 ICP 备
            document.querySelectorAll("div.uU7dJb").forEach(v => {
                v.innerHTML = v.innerHTML.replace(/.*/, "广公网信备11011101111101号  广IPC证01048576号");
            });

        }

    } else if (document.domain.search('youtube') != -1) {

        // change title
        await f_succ(() => {
            let split_num = window.location.href.split('/');
            if (split_num.length < 4 || (split_num.length == 4 && split_num[3].length == 0)) {
                document.title = "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili";
                return true;
            }
            if (document.title.endsWith('YouTube')) {
                document.title = document.title.replace(/\s-\sYouTube*/g, " - 哔哩哔哩");
                return true;
            }
            return false;
        });

        // change icon
        await f_succ(() => {
            let icon = document.querySelector('link[rel="icon"]');
            if (icon === null) {
                return false;
            }
            icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/youtube/bilibili.ico';
            return true;
        });

        // change title loop
        f_succ(() => {
            let split_num = window.location.href.split('/');
            if (split_num.length < 4 || (split_num.length == 4 && split_num[3].length == 0)) {
                document.title = "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili";
            }
            if (document.title.endsWith('YouTube')) {
                document.title = document.title.replace(/\s-\sYouTube*/g, " - 哔哩哔哩");
            }
            return false;
        }, 2000, 2147483647);

        let bili_biglogo = '<svg t="1626764977164" class="icon mini-header__logo" viewBox="0 0 2240 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4404" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M2079.810048 913.566175c-10.01309 0-18.554608 0.799768-26.936172-0.159954-16.987063-1.951433-33.974126-1.567544-50.99318-2.079395-10.972811-0.287916-10.652904-0.287916-11.580634-10.90883-2.71921-32.406582-5.694345-64.781173-8.605499-97.155764-2.527266-28.439735-4.926568-56.91146-7.70976-85.319204-2.527266-26.040432-5.566382-52.016883-8.317583-78.025324-2.623238-24.440897-5.054531-48.913784-7.77374-73.322691a12681.114551 12681.114551 0 0 0-10.684895-92.133223c-3.295042-27.128116-6.558094-54.320213-10.205034-81.416339a20559.272961 20559.272961 0 0 0-17.530905-125.979387c-6.398141-44.723002-14.075909-89.22207-22.105576-133.657156-1.439582-7.965685-1.247637-8.253601 6.36615-9.533229 31.670796-5.406429 63.501545-10.01309 95.716183-9.309295 3.486987 0.095972 7.005964 0.159954 10.460959 0.607823 5.662354 0.703795 8.605499 3.454996 8.925406 10.045081 1.119675 22.969325 2.71921 45.938649 4.414717 68.875983 2.71921 37.589076 5.662354 75.178151 8.477537 112.735236 1.791479 24.184971 3.327033 48.305961 5.150503 72.426951 2.911154 38.772732 5.982261 77.513473 8.925406 116.286205 1.791479 23.705111 3.359024 47.474203 5.182494 71.179313 2.783191 34.805885 5.822308 69.579778 8.637489 104.353672 1.791479 22.137566 3.391014 44.307123 5.278466 66.44469 2.783191 32.79047 5.790317 65.580941 8.63749 98.371411 2.143377 25.592562 4.09481 51.249106 6.270178 77.673426zM853.670395 114.918282c4.638652 0 11.644616-0.511851 18.554607 0.127963 8.797443 0.799768 10.49295 3.071107 11.036793 11.900541 2.527266 40.372267 4.894578 80.776524 7.581796 121.180782 2.943145 43.571337 6.174206 87.078693 9.405267 130.586048 2.975135 39.956388 5.950271 79.912775 9.149341 119.869163 3.486987 43.891244 7.357862 87.718507 10.876839 131.609751 2.655228 33.622229 4.926568 67.244457 7.677768 100.898677 2.623238 31.222926 5.694345 62.38187 8.509527 93.572805 2.399303 26.8402 4.830596 53.71239 7.165918 80.58458 0.735786 8.509527 0.127963 9.053369-9.053369 8.829434-24.025018-0.575833-47.922073-3.391014-71.947091-2.71921-5.502401 0.159954-7.101936-2.367312-8.029666-7.581796-1.983424-11.356699-1.663517-22.905343-2.879163-34.390006-3.295042-30.359177-5.182494-60.846317-7.965685-91.269474-2.495275-27.639967-5.502401-55.215953-8.349574-82.82393-2.527266-25.240664-5.02254-50.481329-7.709759-75.753984-2.687219-24.792795-5.534392-49.61758-8.349573-74.442365-2.591247-22.841362-5.118512-45.682723-7.869713-68.524085-4.062819-33.462275-8.093648-66.92455-12.508365-100.322844-4.062819-30.647093-8.66948-61.198214-12.988225-91.813317-5.886289-41.587914-12.508365-83.079855-19.834236-124.411842a1393.96288 1393.96288 0 0 0-5.310457-28.023856c-0.959721-4.702633-0.095972-7.421843 5.278466-8.157629 14.139891-1.887451 28.24779-4.830596 42.451663-6.206196 14.203872-1.311619 28.407744-3.966847 45.106891-2.71921z m1006.075609 403.33878c27.064134 0 27.703949 0.191944 32.054684 24.536869 5.342447 30.03927 9.08536 60.334465 12.636328 90.62966 3.742912 32.278619 7.517815 64.557238 10.972811 96.867848 2.783191 26.008441 5.118512 52.080864 7.74175 78.089305 2.7512 27.256079 5.662354 54.416185 8.509527 81.640274 1.567544 15.387528 3.039117 30.775056 4.798605 46.130593 0.511851 4.446708-0.831758 6.81402-5.214485 7.325871-9.245313 1.055693-18.426645 2.27134-27.639967 3.263052-16.891091 1.82347-33.814173 3.614949-50.737254 5.182493-8.733462 0.799768-9.309294 0.319907-10.940821-8.125638-14.843686-76.617733-29.719363-153.171485-44.435086-229.821208-9.789155-50.961189-19.322384-101.95437-28.919595-152.915559a805.525894 805.525894 0 0 1-3.582959-21.081873c-0.639814-4.030829 0.44787-6.622075 5.022541-7.70976 30.48714-7.133927 61.294186-12.636328 89.733921-14.011927z m-1137.077537 0c28.951586 0 28.823623 0.095972 33.302322 26.360339 6.909992 40.660183 11.804569 81.544301 16.187295 122.556382 4.286754 39.796434 8.957397 79.560878 13.148179 119.357311 2.847173 27.224088 5.086522 54.512157 7.74175 81.704255 1.887451 19.354375 4.126801 38.644769 6.174206 57.967153 0.255926 2.367312 0.383888 4.734624 0.543842 7.133927 0.415879 9.469248 0 10.237025-9.117351 11.164755-18.074747 1.887451-36.181485 3.454996-54.256232 5.246476-6.558094 0.639814-13.084197 1.599535-19.57831 2.239349-8.63749 0.799768-8.925406 0.767777-10.620913-7.965685-6.078234-30.679084-11.964523-61.422149-17.914793-92.101233-14.267853-73.898523-28.69566-147.733065-42.867542-221.631589-5.662354-29.559409-10.524941-59.246781-16.091323-88.838181-1.023702-5.406429-0.255926-7.933694 5.342447-9.245313 30.199223-7.037955 60.590391-12.540355 88.006423-13.947946z m382.128944 309.861946v124.027954c0 1.183656-0.127963 2.399303 0.03199 3.582959 0.607823 6.014252-1.599535 8.66948-7.805731 8.413555-8.157629-0.351898-16.251277-0.127963-24.408906 0.063981-17.019054 0.319907-34.070098-0.351898-51.057162 1.599535-9.405267 1.087684-9.213322 0.511851-10.141052-9.405266-2.783191-31.222926-5.822308-62.413861-8.669481-93.636787-2.623238-28.823623-4.99055-57.711228-7.677768-86.534851-2.71921-29.655381-5.758326-59.214791-8.509527-88.838181-1.887451-19.770254-3.550968-39.508518-5.214485-59.278772-2.175368-25.720525-4.190782-51.409059-6.462122-77.129585-0.959721-10.844848-0.159954-12.380402 10.588923-13.500076a531.877423 531.877423 0 0 1 83.527724-2.591247c6.941982 0.383888 13.851974 1.727498 20.570022 3.359024 8.477536 2.015414 9.405267 3.263052 9.853137 12.124476 0.92773 17.850812 1.855461 35.701624 2.335321 53.584427 0.543842 19.866226 0.095972 39.764443 0.831758 59.63067 1.855461 54.800074 1.567544 109.664129 2.207359 164.528184z m1134.806197 5.630364v117.437869c0 1.983424-0.063981 3.966847 0.03199 5.982262 0.415879 5.150503-1.983424 6.973973-6.878001 6.941982-12.028504-0.095972-24.025018 0-36.021531 0.159954-13.564058 0.127963-27.096125 0.063981-40.628192 1.535553-8.925406 1.023702-8.989387 0.351898-9.789155-8.509527-3.678931-40.660183-7.549806-81.320366-11.260728-122.04453-3.391014-37.525094-6.526103-75.082179-9.981099-112.639265-3.550968-38.740741-7.421843-77.38551-10.90883-116.09426-1.727498-19.386366-3.16708-38.772732-4.606661-58.159097-0.575833-8.445546 0.351898-9.949109 9.885127-10.716886 16.571184-1.311619 33.078387-3.550968 49.777534-3.263051 16.635165 0.319907 33.302322-0.607823 49.841515 2.559256 14.011928 2.687219 14.715723 3.486987 15.547481 18.458635 2.399303 44.051198 1.663517 88.230358 3.231061 132.281556 1.599535 46.89837 0.479861 93.79674 1.759489 146.069549zM1831.498213 305.135c9.789155 0.575833 17.498914 0.095972 25.176683 1.791479 4.894578 1.119675 7.357862 3.327033 7.837723 8.573509 2.303331 25.240664 4.798605 50.51332 7.32587 75.785975 2.015414 20.50604 4.158791 41.012081 6.238188 61.518121l0.191944 1.183656c1.663517 12.924244 1.279628 13.276142-11.292718 13.979937-11.196746 0.607823-22.361501 1.599535-33.558247 2.27134-7.357862 0.44787-9.693183 1.695507-10.90883-9.021378-4.190782-37.813011-9.053369-75.530049-13.692021-113.311069a1185.0316 1185.0316 0 0 0-4.286754-31.798759c-0.92773-5.982261 1.407591-9.277304 7.005964-9.757164 7.357862-0.671805 14.715723-0.863749 19.962198-1.215647z m-1133.398606 0.159954c7.549806 0.415879 15.323547-0.159954 22.937334 1.599535 4.350736 0.991712 6.558094 2.815182 6.973973 7.773741 0.92773 11.83656 2.7512 23.641129 3.870875 35.477689 3.550968 36.309448 6.909992 72.650886 10.237025 108.992324 0.703795 7.901704 0.543842 8.061657-6.84601 8.605499-13.116188 0.959721-26.264367 1.919442-39.412546 2.463284-7.645778 0.351898-8.605499-0.575833-9.56522-8.381564-3.327033-26.744227-6.462122-53.520446-9.661192-80.296664-2.591247-22.073585-4.766615-44.14717-7.901704-66.156773-0.863749-6.078234 1.119675-7.74175 5.982262-8.733462 7.709759-1.567544 15.451509-1.055693 23.385203-1.343609z m399.147998 100.002936c0 23.001315 0.063981 45.97064-0.031991 69.003946 0 10.332997-0.127963 10.396978-10.396978 10.269016a324.289753 324.289753 0 0 1-36.981252-1.919443c-7.933694-0.991712-8.093648-0.735786-8.317583-9.149341-0.799768-28.119828-1.631526-56.239655-2.207359-84.359483-0.415879-19.034468-0.639814-38.004955-1.791479-57.039422-0.607823-9.821146-0.063981-9.917118 9.373276-10.045081 13.915956-0.159954 27.799921 0.479861 41.619904 2.591247 8.317583 1.279628 8.701471 1.279628 8.733462 10.49295 0.063981 23.385204 0.063981 46.770407 0.063981 70.187602h-0.063981z m1135.38203 0.607824c0 23.033306 0.063981 46.034621-0.031991 69.035936 0 9.661192-0.159954 9.725174-9.853137 9.661192a505.32514 505.32514 0 0 1-38.132917-1.791479c-6.302168-0.479861-8.157629-3.135089-7.74175-8.861425 0.063981-0.799768 0-1.599535 0-2.399302-0.959721-44.403095-1.919442-88.7742-2.815182-133.177296-0.031991-2.367312-0.159954-4.734624-0.063982-7.133926 0.127963-8.957397 0.159954-9.181332 9.149341-9.117351 12.380402 0.063981 24.664832 0.703795 37.013243 1.919442 15.067621 1.503563 12.412393 3.359024 12.476375 15.259566 0.063981 22.169557 0.031991 44.403095 0 66.604643z m-1565.593 54.000306c0.287916 12.636328 0.287916 12.604337-11.804569 15.547481-8.221611 2.015414-16.443221 4.222773-24.728813 6.046243-7.069945 1.599535-8.317583 0.703795-9.53323-6.238187-8.445546-47.090314-16.8591-94.212619-25.240664-141.334924-1.695507-9.757164-1.247637-10.364988 8.349573-12.060495 11.804569-2.079396 23.577148-4.126801 35.381717-5.950271 7.517815-1.183656 8.477536-0.767777 9.9811 7.517815 2.975135 16.731138 5.790317 33.526256 7.997675 50.385357 3.423005 26.680246 6.238187 53.456464 9.309295 80.168701 0.255926 1.951433 0.191944 3.966847 0.287916 5.91828z m1064.138735-136.696273c15.451509-2.527266 31.030982-5.086522 46.610454-7.549806 5.598373-0.863749 7.29388 2.655228 8.029666 7.645778 2.655228 18.426645 5.982261 36.725327 8.157629 55.183962 3.19907 26.744227 7.581797 53.360492 8.413555 80.328655 0.063981 2.7512 0.031991 5.566382 0.095972 8.317583 0.159954 4.286754-1.983424 6.494113-5.950271 7.421843-10.556932 2.367312-21.113864 4.734624-31.638805 7.261889-5.054531 1.215647-6.750038-0.92773-7.581796-5.854298-3.16708-18.746552-6.81402-37.397131-10.045081-56.079702-5.47041-30.775056-10.780867-61.582103-16.091323-92.38915-0.127963-1.119675 0-2.303331 0-4.286754z m-710.64147 108.032603c-0.44787 16.37924 0.543842 30.647093-1.695507 44.914947-0.671805 4.510689-1.983424 7.421843-6.846011 7.837722-10.428969 0.863749-20.825947 1.695507-31.190935 2.7512-5.02254 0.543842-6.430131-1.631526-7.261889-6.558094-2.335321-14.55577-1.919442-29.303484-3.327033-43.923234-2.655228-27.607976-3.774903-55.407897-5.566383-83.111846-0.44787-6.750038-1.119675-13.436095-1.663516-20.186134-0.287916-3.774903 1.215647-5.886289 5.246475-6.046242 13.500077-0.543842 26.936172-3.007126 40.50023-2.527266 7.933694 0.287916 8.605499 0.799768 9.181331 8.797443 0.351898 5.534392 0.255926 11.132765 0.383889 16.699147l2.239349 81.352357z m1134.902169-15.867388c0 19.066459 0.223935 38.132918-0.031991 57.199376-0.159954 9.917118-1.279628 10.780867-10.652904 11.644616-9.277304 0.863749-18.490626 1.567544-27.735939 2.559256-5.214485 0.543842-7.645778-0.991712-7.965685-6.973973-1.34361-25.336637-3.16708-50.673273-4.926568-75.977919-1.3756-20.985901-2.943145-41.939811-4.414717-62.893722-0.159954-2.399303-0.031991-4.798605-0.191944-7.165917-0.223935-4.190782 1.055693-6.654066 5.758326-6.81402 13.116188-0.44787 26.136404-2.975135 39.348564-2.495274 8.061657 0.287916 8.18962 0.415879 8.797444 8.797443 1.951433 27.32006 2.143377 54.704102 2.015414 82.120134zM628.295894 756.171918c16.571184 18.234701 17.402942 39.828425 11.932532 62.413861-5.502401 22.585436-18.042756 41.204025-33.23834 57.903171-25.49659 27.895893-56.303637 48.497905-89.062116 65.99682-56.399609 30.135242-116.190232 50.161422-178.572103 61.997982-44.882956 8.477536-90.053828 15.00364-135.704561 17.498914-13.915956 0.767777-27.799921 1.407591-41.715876 1.311619-10.077071 0-20.186133 0.287916-30.231214-0.063981-8.541518-0.319907-9.789155-1.791479-10.49295-10.716886-2.591247-32.022693-4.798605-64.077378-7.645778-96.100071-3.327033-37.109215-7.229899-74.18644-10.812858-111.295654-2.623238-26.8402-4.894578-53.744381-7.773741-80.520599-3.327033-31.542833-7.069945-63.021684-10.716885-94.564517-3.327033-29.111539-6.526103-58.28706-10.045081-87.430591-3.934856-32.278619-7.997676-64.493257-12.31642-96.707894a8228.968456 8228.968456 0 0 0-13.212161-92.996973 5984.500754 5984.500754 0 0 0-24.312934-152.627642 3243.825263 3243.825263 0 0 0-23.67312-123.740038c-1.151665-5.502401 0.511851-7.709759 5.342448-9.725174C52.335283 47.609843 98.465876 28.063524 144.724432 8.77313c8.605499-3.582959 17.434933-6.590085 26.584274-8.285592 6.334159-1.183656 7.965685 0.127963 7.773741 6.494113-0.479861 16.283268 0.191944 32.630517-1.407591 48.849803a161.393095 161.393095 0 0 0-0.639814 13.084197c-0.735786 58.383032-1.439582 116.798056 0.095972 175.213079 1.34361 51.185124 4.030829 102.338258 7.005964 153.491392 2.335321 40.372267 5.694345 80.744534 9.149341 121.052819 3.391014 39.508518 7.517815 78.953054 11.38869 118.461572 0.735786 7.517815 1.407591 8.221611 9.949108 7.069945a381.329176 381.329176 0 0 1 50.833227-4.190782c52.880632-0.127963 104.897514 7.133927 156.338564 19.322384 45.010919 10.684895 88.806191 24.920757 130.777993 44.818975 20.793957 9.853136 40.692174 21.241827 58.830902 35.701624 6.174206 4.862587 11.676606 10.46096 16.891091 16.315259z m1126.840512-9.597211c20.47405 17.946784 27.927883 39.924397 22.105576 67.116494-4.830596 22.425483-15.771416 41.268006-30.359177 58.127107-23.417194 27.096125-51.856929 47.698138-82.631985 64.909136-60.334465 33.782182-124.603787 55.727804-192.168151 68.396122a1151.089465 1151.089465 0 0 1-111.455609 15.547481c-21.177845 1.82347-42.451662 4.09481-66.220754 2.623238h-27.76793c-5.406429 0-8.477536-1.695507-8.925406-8.125638-2.047405-28.087837-4.414717-56.143683-6.941983-84.19953-2.687219-29.623391-5.662354-59.246781-8.477536-88.870172-2.559256-27.224088-4.926568-54.512157-7.709759-81.736245-2.559256-25.656544-5.502401-51.249106-8.285592-76.873659-2.591247-24.057008-5.086522-48.114017-7.933695-72.139035-3.423005-29.111539-7.037955-58.223079-10.652904-87.334618-3.391014-27.160107-6.750038-54.288222-10.364987-81.416338a6133.577429 6133.577429 0 0 0-12.156467-87.142675c-5.694345-37.653057-11.804569-75.178151-17.818822-112.767227a3259.14881 3259.14881 0 0 0-29.111539-158.993792c-0.44787-2.335321-0.671805-4.734624-1.3756-7.005964-1.663517-5.118512-0.063981-7.837722 4.958559-9.821146C1191.012355 47.641834 1238.61452 24.448575 1288.2321 6.149893c6.494113-2.431293 13.052207-5.150503 20.058171-5.854299 6.302168-0.639814 7.901704 0.383888 7.29388 7.101936-3.327033 36.43741-1.407591 73.066765-3.135089 109.536166-1.407591 29.751354-1.247637 59.598679 0.255926 89.382023 0.351898 7.549806 0.639814 15.131602 0.575832 22.649418-0.383888 35.765606 1.503563 71.499221 3.327033 107.200845 2.335321 47.186286 5.758326 94.276601 9.245313 141.398906 2.527266 34.006117 5.822308 67.948253 9.021379 101.922379 1.695507 18.586598 3.518977 37.141206 5.822308 55.631832 1.247637 10.205034 1.759489 10.301006 11.772578 8.957396 17.658868-2.399303 35.349726-4.350736 53.200539-4.09481 62.637796 0.799768 124.027954 10.684895 184.266447 27.863902 40.788146 11.580634 80.488608 26.040432 117.981712 46.290547a253.55831 253.55831 0 0 1 47.218277 32.438573zM308.676783 922.811488c23.161269-11.068783 135.608589-98.947243 144.533995-113.279078-54.576139-23.513166-109.344222-45.362816-168.239105-63.24562l23.70511 176.524698z m1277.196815-107.520752c2.879163-3.103098 2.559256-5.502401-1.343609-7.229899-7.773741-3.550968-15.4835-7.325871-23.353213-10.556932-42.003793-17.179007-84.19953-33.814173-127.482951-47.37823-3.774903-1.151665-7.645778-3.774903-12.476374-1.535554l23.321222 173.45359c3.454996 0.767777 4.798605-0.831758 6.33416-1.919442 39.316574-28.855614 78.889073-57.35933 116.638102-88.390312 6.36615-5.182494 12.668318-10.396978 18.362663-16.443221z" fill="#00aeec" p-id="4405"></path></svg>';

        // change logo on top left
        f_succ(() => {
            let logo = document.getElementById("logo-icon");
            if (logo === null) {
                return false;
            }
            logo.innerHTML = window.trustedTypes.defaultPolicy.createHTML(bili_biglogo);
            return true;
        });

        // change logo on top left (hide)
        f_succ(() => {
            let logo = document.getElementById('contentContainer').querySelector('ytd-topbar-logo-renderer').querySelector('a').querySelector('div').querySelector('div');
            if (logo === null) {
                return false;
            }
            logo.innerHTML = bili_biglogo;
            return true;
        });

        // sleep(1000).then(() => {});
        // change style loop
        f_succ(() => {
            /*
            use `changeStyle` instead of `query().style=...`
            because some elements are added dynamically
            */

            let s2 = '__bilibili_style__';

            let la = document.head.lastElementChild;
            if (la != null) {
                if (la.innerHTML.toString() == s2) {
                    return false;
                }
            }

            let s1 = 'background-color: #00aeec';

            function changeBgColor(s0) {
                let newStyle = document.createElement("style");
                newStyle.innerHTML = window.trustedTypes.defaultPolicy.createHTML(s2);
                document.head.appendChild(newStyle);
                let newSheet = newStyle.sheet;
                newSheet.addRule(s0, s1);
                newSheet.insertRule(s0 + ' { ' + s1 + ' }', 0);
            }

            // button.ytp-button.ytp-settings-button.ytp-hd-quality-badge::after
            changeBgColor('.ytp-settings-button.ytp-hd-quality-badge:after, .ytp-settings-button.ytp-hdr-quality-badge:after, .ytp-settings-button.ytp-4k-quality-badge:after, .ytp-settings-button.ytp-5k-quality-badge:after, .ytp-settings-button.ytp-8k-quality-badge:after, .ytp-settings-button.ytp-3d-badge-grey:after, .ytp-settings-button.ytp-3d-badge:after');

            // button.ytp-subtitles-button.ytp-button::after
            changeBgColor('.ytp-chrome-controls .ytp-button[aria-pressed]:after');

            /*
            let notice = document.querySelector('div.yt-spec-icon-badge-shape__badge');
            if (notice != null) {
                notice.style.backgroundColor = '#00aeec';
            }
            */
            changeBgColor('.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge');

            /*
            document.querySelectorAll('div.ytp-play-progress.ytp-swatch-background-color').forEach(v => {
                v.style.backgroundColor = '#00aeec';
            });
            document.querySelector('div.ytp-scrubber-button.ytp-swatch-background-color').style.backgroundColor = '#00aeec';
            */
            changeBgColor('.ytp-swatch-background-color');

            /*
            setInterval(() => {
                document.querySelectorAll('[id=progress]').forEach(v => {
                    v.style.backgroundColor = '#00aeec';
                });
            }, 1000);
            */
            changeBgColor('#progress.ytd-thumbnail-overlay-resume-playback-renderer');

            // Settings - Annotations
            changeBgColor('.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox');

            return false;
        }, 2000, 2147483647);

    } else if (document.domain.search('wikipedia.org') != -1) {

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

    } else if (document.domain.search('github') != -1) {

        // change title
        if (document.title.startsWith('GitHub')) {
            document.title = document.title.slice(6);
            if (document.title === '') {
                document.title = '基于 Git 的代码托管和研发协作平台';
            }
        }
        document.title = document.title + ' - Gitee';

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
            let logo = document.querySelector('a[class="AppHeader-logo ml-2"]');
            if (logo === null) {
                return false;
            }
            logo.innerHTML = '<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#c71d23" r="16"/><path d="m24.0987698 14.2225144h-9.0863697c-.4362899.000207-.7900048.3538292-.790326.7901191l-.0005173 1.9752185c-.0003277.4363707.353328.7902117.7896987.790326.0000712 0 .0001424 0 .0002135-.0002135l5.5317648-.0000461c.4363708-.0000102.7901221.3537352.7901257.790106 0 .0000022 0 .0000044-.0000066.0000066v.1975077.1975318c0 1.3091122-1.0612451 2.3703573-2.3703573 2.3703573h-7.5067195c-.4363081-.0000218-.790009-.353713-.7900429-.7900211l-.0002069-7.5059917c-.0001014-1.3091122 1.0611145-2.3703865 2.3702267-2.3704226.0000217 0 .0000435 0 .0000653.0000653h11.0602463c.4361793-.0004902.7898484-.35394.7906091-.79011894l.0012251-1.97521881c.0007606-.43637034-.3527683-.79033806-.7891389-.79060871-.0001634-.0000001-.0003268-.00000015-.0004901.00048976h-11.0617654c-3.27278051 0-5.92589329 2.65311278-5.92589329 5.9258933v11.0612755c0 .4363707.35374837.7901191.7901191.7901191h11.65447149c2.9454379 0 5.3331872-2.3877493 5.3331872-5.3331872v-4.5430682c0-.4363707-.3537484-.7901191-.7901191-.7901191z" fill="#fff"/></g></svg>';
            return true;
        });

    } else if (document.domain.search('steam') != -1) {

        // change title
        document.title = document.title.replace('Steam', '蒸汽平台');

        // change logo on top left
        f_succ(() => {
            let logo = document.getElementById("logo_holder");
            if (logo === null) {
                return false;
            }
            logo.childNodes[1].childNodes[1].src = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/steam/logo.svg';
            return true;
        });

        /*
        let giftcard = document.getElementsByClassName('home_page_gutter_giftcard');
        if (giftcard.length > 0) {
            giftcard[0].height = 0;
        }
        */

        // hide giftcard
        f_succ(() => {
            let giftcard = document.getElementsByClassName('top_promo ds_no_flags app_impression_tracked');
            if (giftcard.length <= 0) {
                return false;
            }
            giftcard[0].innerHTML = '';
            return true;
        });

    } else if (document.domain.search('twitter') != -1 || document.domain.search('x.com') != -1) {

        // change loading logo
        f_succ(() => {
            let loadingLogo = document.querySelector('div[aria-label="Loading…"]');
            if (loadingLogo === null) {
                return false;
            }
            loadingLogo.childNodes[0].childNodes[0].innerHTML = '<svg height="20px" width="20px" version="1.1" viewBox="0 0 512 512" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp" aria-hidden="true" xml:space="preserve"> <path style="fill:#EA533B;" d="M403.51,247.992c12.189-23.721,13.499-45.899,3.546-63.137 c-10.316-17.868-31.605-28.033-59.944-28.622c-20.81-0.427-44.439,4.311-68.131,13.528c8.166-27.851,5.532-49.961-7.876-63.369 c-16.113-16.113-44.899-16.666-81.056-1.558c-33.715,14.088-70.764,40.33-104.325,73.889 c-49.982,49.983-83.19,107.958-84.779,147.93C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622s119.798-13.005,163.656-36.622c45.558-24.53,70.648-57.754,70.648-93.547 C468.609,304.067,445.576,272.184,403.51,247.992z"/> <path style="fill:#D93C1C;" d="M260.338,459.932c-61.677,0-119.798-13.005-163.656-36.622 c-45.558-24.53-70.648-57.754-70.648-93.547c0-3.863,0.318-7.825,0.945-11.787c1.589-39.973,34.797-97.947,84.78-147.93 c33.227-33.226,69.87-59.27,103.314-73.458c-7.854,1.823-16.218,4.566-25.023,8.245c-33.715,14.088-70.764,40.33-104.325,73.889 C35.742,228.707,2.534,286.682,0.945,326.654C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622c48.616,0,95.016-8.086,133.969-23.074 C335.352,454.941,298.529,459.932,260.338,459.932z"/> <path style="fill:#FFFFFF;" d="M364.19,312.032c-2.568-29.565-22.081-55.61-54.944-73.338 c-31.681-17.091-72.302-24.49-114.382-20.835c-42.079,3.656-80.818,17.949-109.076,40.247 c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338c26.389,14.236,58.976,21.748,93.447,21.747 c6.913,0,13.905-0.302,20.934-0.913c42.079-3.654,80.817-17.948,109.075-40.246C352.029,370.616,366.758,341.596,364.19,312.032z"/> <path style="fill:#E5E5E5;" d="M230.36,425.319c-7.029,0.611-14.021,0.913-20.934,0.913c-34.471,0.001-67.059-7.511-93.447-21.747 c-32.863-17.729-52.378-43.774-54.946-73.338c-2.569-29.564,12.161-58.584,41.476-81.715c5.799-4.575,12.046-8.808,18.665-12.687 c-12.993,5.932-24.911,13.095-35.388,21.361c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338 c26.389,14.236,58.976,21.748,93.447,21.747c6.913,0,13.905-0.302,20.934-0.913c33.445-2.905,64.771-12.535,90.41-27.559 C281.994,416.503,256.841,423.019,230.36,425.319z"/> <path style="fill:#333333;" d="M286.65,312.533c-9.507-39.544-55.55-62.508-102.638-51.189 c-47.088,11.32-77.661,52.703-68.156,92.249c4.682,19.473,18.156,35.492,37.943,45.105c12.283,5.967,26.102,9.003,40.355,9.003 c8.042,0,16.221-0.967,24.339-2.918C265.582,393.462,296.157,352.08,286.65,312.533z"/> <circle style="fill:#FFFFFF;" cx="177.898" cy="351.457" r="30.373"/> <g> <path style="fill:#FFA929;" d="M373.152,117.153c-7.189,0-13.017,5.828-13.017,13.017c0,7.189,5.828,13.017,13.017,13.017 	c26.318,0,47.729,21.411,47.729,47.729c0,7.189,5.828,13.017,13.017,13.017s13.017-5.828,13.017-13.017 C446.914,150.243,413.824,117.153,373.152,117.153z"/> <path style="fill:#FFA929;" d="M364.475,43.39c-3.261,0-6.564,0.108-9.817,0.322c-9.564,0.629-16.808,8.893-16.18,18.458 	c0.629,9.564,8.9,16.804,18.458,16.18c2.498-0.164,5.035-0.248,7.539-0.248c62.206,0,112.813,50.608,112.813,112.813 	c0,7.606-0.759,15.204-2.257,22.581c-1.396,6.875,1.691,14.209,7.576,18.025c5.99,3.884,14.111,3.587,19.829-0.675 	c3.388-2.525,5.774-6.307,6.614-10.445c1.958-9.646,2.95-19.566,2.95-29.487C512,109.571,445.82,43.39,364.475,43.39z"/> </g> <circle style="fill:#FFFFFF;" cx="234.305" cy="321.085" r="17.356"/> </svg>';
            return true;
        }, 100, 5);

        // change title
        await f_succ(() => {
            let t = document.title;
            t = t.replace(/[\xA0\u1680\u180e\u2000\u200a\u202f\u205f\u3000]/g, ' ');
            t = t.replace(/\(\d\)/g, '').trim();
            if (t === 'X' || t === 'Twitter') {
                document.title = '微博';
                return true;
            }
            if (t.endsWith(' / X') || t.endsWith(' / Twitter')) {
                document.title = '微博-' + t.substring(0, t.length - 4);
                return true;
            }
            return false;
        });

        // change icon
        await f_succ(() => {
            let icon = document.head.querySelector('[rel="shortcut icon"]');
            if (icon === null) {
                return false;
            }
            icon.href = "data:image/png;base64,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";
            return true;
        });

        // change title loop
        f_succ(() => {
            let t = document.title;
            t = t.replace(/[\xA0\u1680\u180e\u2000\u200a\u202f\u205f\u3000]/g, ' ');
            t = t.replace(/\(\d\)/g, '').trim();
            if (t === 'X' || t === 'Twitter') {
                document.title = '微博';
            } else if (t.endsWith(' / X') || t.endsWith(' / Twitter')) {
                document.title = t.substring(0, t.length - 4) + ' - 微博';
            }
            return false;
        }, 2000, 2147483647);

        // change logo
        f_succ(() => {
            let logo = document.querySelector('h1[class="css-175oi2r r-1awozwy r-1pz39u2 r-1loqt21 r-6koalj r-16y2uox r-1777fci r-4wgw6l"]');
            if (logo === null) {
                return false;
            }
            logo.childNodes[0].childNodes[0].innerHTML = '<svg height="40px" width="40px" version="1.1" viewBox="0 0 512 512" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp" aria-hidden="true" xml:space="preserve"> <path style="fill:#EA533B;" d="M403.51,247.992c12.189-23.721,13.499-45.899,3.546-63.137 c-10.316-17.868-31.605-28.033-59.944-28.622c-20.81-0.427-44.439,4.311-68.131,13.528c8.166-27.851,5.532-49.961-7.876-63.369 c-16.113-16.113-44.899-16.666-81.056-1.558c-33.715,14.088-70.764,40.33-104.325,73.889 c-49.982,49.983-83.19,107.958-84.779,147.93C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622s119.798-13.005,163.656-36.622c45.558-24.53,70.648-57.754,70.648-93.547 C468.609,304.067,445.576,272.184,403.51,247.992z"/> <path style="fill:#D93C1C;" d="M260.338,459.932c-61.677,0-119.798-13.005-163.656-36.622 c-45.558-24.53-70.648-57.754-70.648-93.547c0-3.863,0.318-7.825,0.945-11.787c1.589-39.973,34.797-97.947,84.78-147.93 c33.227-33.226,69.87-59.27,103.314-73.458c-7.854,1.823-16.218,4.566-25.023,8.245c-33.715,14.088-70.764,40.33-104.325,73.889 C35.742,228.707,2.534,286.682,0.945,326.654C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622c48.616,0,95.016-8.086,133.969-23.074 C335.352,454.941,298.529,459.932,260.338,459.932z"/> <path style="fill:#FFFFFF;" d="M364.19,312.032c-2.568-29.565-22.081-55.61-54.944-73.338 c-31.681-17.091-72.302-24.49-114.382-20.835c-42.079,3.656-80.818,17.949-109.076,40.247 c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338c26.389,14.236,58.976,21.748,93.447,21.747 c6.913,0,13.905-0.302,20.934-0.913c42.079-3.654,80.817-17.948,109.075-40.246C352.029,370.616,366.758,341.596,364.19,312.032z"/> <path style="fill:#E5E5E5;" d="M230.36,425.319c-7.029,0.611-14.021,0.913-20.934,0.913c-34.471,0.001-67.059-7.511-93.447-21.747 c-32.863-17.729-52.378-43.774-54.946-73.338c-2.569-29.564,12.161-58.584,41.476-81.715c5.799-4.575,12.046-8.808,18.665-12.687 c-12.993,5.932-24.911,13.095-35.388,21.361c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338 c26.389,14.236,58.976,21.748,93.447,21.747c6.913,0,13.905-0.302,20.934-0.913c33.445-2.905,64.771-12.535,90.41-27.559 C281.994,416.503,256.841,423.019,230.36,425.319z"/> <path style="fill:#333333;" d="M286.65,312.533c-9.507-39.544-55.55-62.508-102.638-51.189 c-47.088,11.32-77.661,52.703-68.156,92.249c4.682,19.473,18.156,35.492,37.943,45.105c12.283,5.967,26.102,9.003,40.355,9.003 c8.042,0,16.221-0.967,24.339-2.918C265.582,393.462,296.157,352.08,286.65,312.533z"/> <circle style="fill:#FFFFFF;" cx="177.898" cy="351.457" r="30.373"/> <g> <path style="fill:#FFA929;" d="M373.152,117.153c-7.189,0-13.017,5.828-13.017,13.017c0,7.189,5.828,13.017,13.017,13.017 	c26.318,0,47.729,21.411,47.729,47.729c0,7.189,5.828,13.017,13.017,13.017s13.017-5.828,13.017-13.017 C446.914,150.243,413.824,117.153,373.152,117.153z"/> <path style="fill:#FFA929;" d="M364.475,43.39c-3.261,0-6.564,0.108-9.817,0.322c-9.564,0.629-16.808,8.893-16.18,18.458 	c0.629,9.564,8.9,16.804,18.458,16.18c2.498-0.164,5.035-0.248,7.539-0.248c62.206,0,112.813,50.608,112.813,112.813 	c0,7.606-0.759,15.204-2.257,22.581c-1.396,6.875,1.691,14.209,7.576,18.025c5.99,3.884,14.111,3.587,19.829-0.675 	c3.388-2.525,5.774-6.307,6.614-10.445c1.958-9.646,2.95-19.566,2.95-29.487C512,109.571,445.82,43.39,364.475,43.39z"/> </g> <circle style="fill:#FFFFFF;" cx="234.305" cy="321.085" r="17.356"/> </svg>';
            return true;
        });

    }
})();
