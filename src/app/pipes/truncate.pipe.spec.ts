import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same string if it is within the limit', () => {
    const text = 'Short text';
    expect(pipe.transform(text, 20)).toBe(text);
  });

  it('should truncate the string and append ellipsis when exceeding the limit', () => {
    const text = 'This is a long text that should be truncated';
    expect(pipe.transform(text, 10)).toBe('This is a ...');
  });

  it('should use a custom ellipsis if provided', () => {
    const text = 'This is a long text that should be truncated';
    expect(pipe.transform(text, 10, '***')).toBe('This is a ***');
  });

  it('should handle an empty string correctly', () => {
    expect(pipe.transform('', 10)).toBe('');
  });

  it('should handle zero limit correctly', () => {
    expect(pipe.transform('Test', 0)).toBe('...');
  });

  it('should return an empty string if the input is empty and limit is 0', () => {
    expect(pipe.transform('', 0)).toBe('');
  });

  it('should handle negative limit correctly (returning ellipsis only)', () => {
    expect(pipe.transform('Test', -1)).toBe('...');
  });
});
