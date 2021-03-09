import { StringMaxLengthPipe } from './string-max-length.pipe';

describe('StringMaxLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StringMaxLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
