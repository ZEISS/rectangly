import * as React from 'react';

export function createContextProvider(context: any): React.ComponentType {
  class ContextProvider extends React.Component {
    static childContextTypes = {};

    getChildContext() {
      return context;
    }

    render() {
      return this.props.children;
    }
  }

  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = () => {};
  });

  return ContextProvider;
}
