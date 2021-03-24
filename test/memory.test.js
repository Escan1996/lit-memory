import {
  html,
  fixture,
  expect
} from '@open-wc/testing';

import '../memory.js';

describe('memory-game', () => {
  it('has a default properties values', async () => {
    const el = await fixture(html `<memory-game></memory-game>`);
    expect(el.isWinner).to.equal(false);
    expect(el.addScore1).to.equal(0);
  });
});
