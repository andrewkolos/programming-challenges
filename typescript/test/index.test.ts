import { fizz } from '../src/index';

describe(nameof(fizz), () => {
  it('returns buzz', () => {
    expect(fizz()).toEqual('buzz');
  })
});
