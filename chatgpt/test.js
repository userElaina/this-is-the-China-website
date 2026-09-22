const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const brand = { nodeValue: 'ChatGPT', isConnected: true, parentElement: { style: {}, getBoundingClientRect: () => ({ top: 25, left: 20 }) } };
const message = { nodeValue: 'ChatGPT', parentElement: { style: {}, getBoundingClientRect: () => ({ top: 400, left: 700 }) } };
const icon = { href: 'old-icon' };
const nodes = [message, brand];
const document = {
    title: 'My chat - ChatGPT',
    body: {},
    documentElement: {},
    querySelectorAll: () => [icon],
    createTreeWalker: () => ({ nextNode: () => nodes.shift() || null }),
};
let onMutation;
const timers = [];
const context = {
    document,
    NodeFilter: { SHOW_TEXT: 4 },
    MutationObserver: class { constructor(callback) { onMutation = callback; } observe() {} },
    setTimeout: callback => timers.push(callback),
};

vm.runInNewContext(fs.readFileSync(__dirname + '/chatgpt2doubao.js', 'utf8'), context);
assert.equal(document.title, 'My chat - 豆包');
assert.equal(brand.nodeValue, '豆包');
assert.equal(brand.parentElement.style.fontWeight, '600');
assert.equal(message.nodeValue, 'ChatGPT');
assert.match(icon.href, /^data:image\/svg\+xml,/);

brand.isConnected = false;
nodes.push({ ...brand, nodeValue: 'ChatGPT' });
document.title = 'ChatGPT';
onMutation();
onMutation();
assert.equal(timers.length, 1);
timers.pop()();
assert.equal(document.title, '豆包');
assert.equal(nodes.length, 0);
