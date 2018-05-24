import { ReactRendererFactory } from './reactRendererFactory';
import * as Pharos from '@zeiss/pharos';

describe('ReactRendererFactory', () => {
  it('create renderer by passing registry entry', () => {
    const factory = new ReactRendererFactory({}, { prefix: 'z', components: Pharos });
    const renderer = factory.createRenderer();
    const element = renderer.createElement('z-Avatar');
    expect(element.type).toEqual(Pharos.Avatar);
  });

  it('create renderer by passing callback function', () => {
    const mockCallback = jest.fn((prefix: string, name: string) => `${prefix}-${name}`);
    const factory = new ReactRendererFactory({}, mockCallback);
    const renderer = factory.createRenderer();
    const element = renderer.createElement('dcc-team');
    expect(mockCallback).toBeCalled();
    expect(element.type).toEqual('dcc-team');
  });
});
