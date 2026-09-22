// ==UserScript==
// @name ChatGPT 伪装成豆包
// @namespace https://github.com/LucasZ97/this-is-the-China-website
// @version 2026.09.22.01
// @description 将 ChatGPT 的品牌标识改为豆包风格
// @author LucasZ97
// @license MIT
// @match https://chatgpt.com/*
// @run-at document-idle
// @grant none
// ==/UserScript==

(() => {
    const iconUrl = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="white"/><text x="32" y="47" text-anchor="middle" font-size="47" font-weight="700">豆</text></svg>');
    let brandNode;

    function updateBrand() {
        if (document.title.includes('ChatGPT')) {
            document.title = document.title.replaceAll('ChatGPT', '豆包');
        }

        for (const icon of document.querySelectorAll('link[rel~="icon"]')) {
            if (icon.href !== iconUrl) icon.href = iconUrl;
        }

        if (brandNode?.isConnected && brandNode.nodeValue.trim() === '豆包') return;

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue.trim() !== 'ChatGPT') continue;
            const box = node.parentElement.getBoundingClientRect();
            if (box.top < 0 || box.top > 80 || box.left < 0 || box.left > 400) continue;
            node.nodeValue = node.nodeValue.replace('ChatGPT', '豆包');
            node.parentElement.style.fontSize = '22px';
            node.parentElement.style.fontWeight = '600';
            brandNode = node;
            break;
        }
    }

    let scheduled = false;
    new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        setTimeout(() => {
            scheduled = false;
            updateBrand();
        }, 100);
    }).observe(document.documentElement, { childList: true, characterData: true, attributes: true, attributeFilter: ['href'], subtree: true });

    updateBrand();
})();
