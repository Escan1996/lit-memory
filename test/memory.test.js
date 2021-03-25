import { html, fixture, waitUntil } from '@open-wc/testing';

import '../memory.js';

describe('memory-game', () => {
  it('fruit selected is diferent from previous one', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 5;
    el.saveFruit.value = '🍕';
    el.__fruitSelected(cardValue, index);
  });

  it('fruit selected is the same as previous one', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 5;
    el.saveFruit.value = '🍔';
    el.__fruitSelected(cardValue, index);
    await waitUntil(
      () => el.saveFruit.value === '',
      'SaveFruit.value no es igual a cadena vacia',
      { timeout: 1500 }
    );
  });

  it('Score is added to player 2', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 4;
    el.addScore1 = 2;
    el.addScore2 = 2;
    el.playerTurn = false;
    el.saveFruit.value = '🍔';
    el.__fruitSelected(cardValue, index);
    await waitUntil(
      () => el.saveFruit.value === '',
      'SaveFruit.value no es igual a cadena vacía',
      { timeout: 1500 }
    );
  });

  it('Score is added to player 1', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 4;
    el.addScore1 = 3;
    el.addScore2 = 1;
    el.playerTurn = false;
    el.saveFruit.value = '🍔';
    el.__fruitSelected(cardValue, index);
  });

  it('Player 2 wins', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 5;
    el.playerTurn = false;
    el.__fruitSelected(cardValue, index);
  });

  it('Player Turn changes and there is not a winner', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.saveFruit.value = '🍕';
    el.turnCounter = 1;
    el.__fruitSelected(cardValue, index);
  });
});
