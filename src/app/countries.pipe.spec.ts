import { CountriesPipe } from './countries.pipe';

describe('CountriesPipe', () => {
  it('create an instance', () => {
    const pipe = new CountriesPipe();
    expect(pipe).toBeTruthy();
  });
});
