import test from 'node:test';
import assert from 'node:assert/strict';

import { deepLinkArticleId, shareTokenFromHash } from '../src/utils/shareLink.js';

test('malformed percent escape returns an empty token', () => {
  assert.equal(shareTokenFromHash('#/s/%'), '');
});

test('truncated UTF-8 escape returns an empty token', () => {
  assert.equal(shareTokenFromHash('#/s/%E4%B8'), '');
});

test('plain share token is preserved', () => {
  assert.equal(shareTokenFromHash('#/s/dshr_plain-token'), 'dshr_plain-token');
});

test('valid percent-encoded share token is decoded', () => {
  assert.equal(shareTokenFromHash('#/s/%E5%88%86%E4%BA%AB%20token'), '分享 token');
});

test('non-share route returns an empty token', () => {
  assert.equal(shareTokenFromHash('#/reader/a/42'), '');
});

test('malformed percent escape returns an empty article ID', () => {
  assert.equal(deepLinkArticleId('#/reader/a/%'), '');
});

test('truncated UTF-8 escape returns an empty article ID', () => {
  assert.equal(deepLinkArticleId('#/reader/a/%E4%B8'), '');
});

test('plain deep-link article ID is preserved', () => {
  assert.equal(deepLinkArticleId('#/reader/a/article-42'), 'article-42');
});

test('valid percent-encoded article ID is decoded', () => {
  assert.equal(deepLinkArticleId('#/reader/a/%E6%96%87%E7%AB%A0%2042'), '文章 42');
});

test('non-deep-link route returns an empty article ID', () => {
  assert.equal(deepLinkArticleId('#/s/dshr_plain-token'), '');
});
