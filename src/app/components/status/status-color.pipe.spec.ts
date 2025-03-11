import { StatusColorPipe } from './status-color.pipe';
import { StatusColor } from './status-color';

describe('StatusColorPipe', () => {
  let pipe: StatusColorPipe;

  beforeEach(() => {
    pipe = new StatusColorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a function that returns StatusColor', () => {
    // Simulamos una función que devuelve un StatusColor según el argumento
    const mockFunction = (status: string): StatusColor => {
      return status === 'success' ? StatusColor.success : StatusColor.error;
    };

    expect(pipe.transform(mockFunction, 'success')).toBe(StatusColor.success);
    expect(pipe.transform(mockFunction, 'fail')).toBe(StatusColor.error);
  });
});
