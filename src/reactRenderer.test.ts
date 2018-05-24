import { ReactRenderer } from './reactRenderer';
import { registerComponents, unregisterComponents } from './registry';
import * as Pharos from '@zeiss/pharos';

describe('ReactRenderer', () => {
  it('should return registered Pharos component', () => {
    registerComponents('z', Pharos);
    const renderer = new ReactRenderer({});
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

  it('should be possible to unregister component as well', () => {
    unregisterComponents('z');
    const renderer = new ReactRenderer({});
    const element = renderer.createElement('z-Badge');
    expect(element.type).toEqual('z-Badge');
  });
});
