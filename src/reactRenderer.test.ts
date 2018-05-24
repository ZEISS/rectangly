import { ReactRenderer, registerComponents } from './reactRenderer';
import * as Pharos from '@zeiss/pharos';

describe('ReactRenderer', () => {
  it('should return registered Pharos component', () => {
    const renderer = new ReactRenderer({});
    registerComponents('z', Pharos);
    const element = renderer.createElement('z-Badge');
    expect(element.type).toEqual(Pharos['Badge']);
  });

  it('should called specified root element selector function', () => {
    const mockCallback = jest.fn();
    const renderer = new ReactRenderer({}, mockCallback);
    const element = renderer.createElement('z-Badge');
    expect(mockCallback).toBeCalled();
    expect(mockCallback).toBeCalledWith('z', 'Badge');
  });

  it('should use the element name', () => {
    const mockCallback = jest.fn(cb => undefined);
    const renderer = new ReactRenderer({}, mockCallback);
    const element = renderer.createElement('foo-bar');
    expect(mockCallback).toBeCalled();
    expect(element.type).toEqual('foo-bar');
  });
});
