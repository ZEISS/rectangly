import { ReactRendererFactory } from '.';

describe('ReactRendererFactory', () => {
  it('create renderer by passing callback function', () => {
    const mockCallback = jest.fn((prefix: string, name: string) => `${prefix}-${name}`);
    const factory = new ReactRendererFactory({}, undefined, mockCallback);
    const renderer = factory.createRenderer(undefined, undefined);
    const element = renderer.createElement('dcc-team');
    expect(mockCallback).toBeCalled();
    expect(element.type).toEqual('dcc-team');
  });
});
