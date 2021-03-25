import { html, fixture, waitUntil, expect } from '@open-wc/testing';

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
    expect(el.cardArray[index].isPlayed).to.equal(true);
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
      {
        timeout: 1500,
      }
    );
    expect(el.cardArray[index].show).to.equal(false);
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
      {
        timeout: 1500,
      }
    );
    expect(el.addScore2).to.equal(3);
  });

  it('Score is added to player 1', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 4;
    el.addScore1 = 2;
    el.addScore2 = 2;
    el.playerTurn = true;
    el.saveFruit.value = '🍔';
    el.__fruitSelected(cardValue, index);
    expect(el.addScore1).to.equal(2);
  });

  it('Game has 4 pairs and cards are not equal', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.gameFinish = 4;
    el.playerTurn = false;
    el.__fruitSelected(cardValue, index);
    expect(el.cardArray[index].show).to.equal(true);
  });

  it('Player2 Turn changes and there is not a winner', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.saveFruit.value = '🍕';
    el.turnCounter = 1;
    el.__fruitSelected(cardValue, index);
    await waitUntil(() => el.player2Turn, 'No se cambió', {
      timeout: 3000,
    });
    expect(el.isWinner).to.equal(false);
    expect(el.player2Turn).to.equal(!el.playerTurn);
  });

  it('Player1 Turn changes and there is not a winner', async () => {
    const el = await fixture(html`<memory-game></memory-game>`);
    const cardValue = '🍔';
    const index = 2;
    el.saveFruit.id = 1;
    el.saveFruit.value = '🍕';
    el.turnCounter = 1;
    el.__fruitSelected(cardValue, index);
    await waitUntil(() => el.player1Turn, 'No se cambió', {
      timeout: 3000,
    });
    expect(el.isWinner).to.equal(false);
    expect(el.player1Turn).to.equal(!el.player2Turn);
  });
});
