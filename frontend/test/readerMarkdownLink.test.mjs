import test from 'node:test';
import assert from 'node:assert/strict';
import { isExternalHttpLink } from '../src/utils/readerMarkdownLink.js';

const CURRENT_URL = 'https://dorami.example/reader/article/42?lang=zh';

test('站内 hash 与根相对路径留在当前页', () => {
  assert.equal(isExternalHttpLink('#section', CURRENT_URL), false);
  assert.equal(isExternalHttpLink('#dorami-cite-2', CURRENT_URL), false);
  assert.equal(isExternalHttpLink('/reader/article/43', CURRENT_URL), false);
});

test('同源绝对 URL 留在当前页', () => {
  assert.equal(isExternalHttpLink('https://dorami.example/settings', CURRENT_URL), false);
});

test('HTTP 与 HTTPS 外链在新页打开', () => {
  assert.equal(isExternalHttpLink('https://example.com/article', CURRENT_URL), true);
  assert.equal(isExternalHttpLink('http://example.com/article', CURRENT_URL), true);
});

test('protocol-relative URL 不判为可新页打开的 HTTP(S) 外链', () => {
  assert.equal(isExternalHttpLink('//example.com/path', CURRENT_URL), false);
  assert.equal(isExternalHttpLink('//dorami.example/asset', CURRENT_URL), false);
});

test('不安全协议不判为可新页打开的外链', () => {
  assert.equal(isExternalHttpLink('javascript:alert(1)', CURRENT_URL), false);
  assert.equal(isExternalHttpLink('data:text/html,unsafe', CURRENT_URL), false);
});
