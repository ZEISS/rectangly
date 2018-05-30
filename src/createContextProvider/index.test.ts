import { createContextProvider } from '.';

describe('createContextProvider', () => {
  it('should return Context Provider Class', () => {
    const ContextProvider = createContextProvider({ test: true });
    expect(typeof ContextProvider).toEqual('function');
    expect(typeof ContextProvider.childContextTypes.test).toEqual('function');
  });

  it('ContextProvider should provide proper methods', () => {
    const ContextProvider = createContextProvider({ test: true });
    const contextProvider = new ContextProvider({
      children: [],
    });
    expect(contextProvider.getChildContext()).toEqual({ test: true });
    expect(contextProvider.render()).toEqual([]);
  });
});
