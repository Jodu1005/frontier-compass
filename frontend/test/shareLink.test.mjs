import test from 'node:test';
import assert from 'node:assert/strict';

import { shareTokenFromHash } from '../src/utils/shareLink.js';

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
