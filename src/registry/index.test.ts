import { getComponent, registerComponents, unregisterComponents } from '.';

describe('registry', () => {
  it('should registerComponent', () => {
    const component = {};
    registerComponents('z', { component });
    const result1 = getComponent('z', 'component');
    expect(result1).toEqual(component);
    registerComponents('z', { component1: {} });
    const result2 = getComponent('z', 'component');
    expect(result2).toEqual(result1);
    unregisterComponents('z');
  });

  it('getComponent', () => {
    const component = {};
    registerComponents('z', { component });
    registerComponents('z', { component1: {} });
    expect(getComponent('z', 'component')).toEqual(component);
    expect(getComponent('z', 'component1')).toEqual(undefined);
  });

  it('unregisterComponents', () => {
    const component = {};
    registerComponents('a', { component });
    unregisterComponents('z');
    unregisterComponents('b');
    const result = getComponent('a', 'component');
    expect(result).toEqual(component);
  });
});
