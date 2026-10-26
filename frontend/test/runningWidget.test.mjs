import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../src/components/RunningWidget.jsx', import.meta.url),
  'utf8',
);

test('all running-history buttons expose the same accessible name', () => {
  const buttons = [...source.matchAll(/<button\b[\s\S]*?<\/button>/g)]
    .map(([button]) => button)
    .filter((button) => button.includes('onViewRunning?.()'));

  assert.equal(buttons.length, 3);
  for (const button of buttons) {
    assert.deepEqual(button.match(/aria-label="[^"]+"/g), ['aria-label="查看运行历史"']);
  }
});
