import { expect } from 'chai';
import { NONCE_CHARS } from '../../../../constants';
import { getNonce } from '../../../../utils';

suite('Utils > getNonce()', () => {
  test('Returns nonce correctly', () => {
    const random = Math.random();
    const nonce = getNonce(NONCE_CHARS, random);

    expect(nonce).not.be.empty;
    expect(nonce).to.have.length(32);
    expect(nonce).to.equal(getNonce(NONCE_CHARS, random));
  });
});
