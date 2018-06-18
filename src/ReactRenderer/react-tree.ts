import * as React from 'react';
import { CustomReactElement } from './tree-types';
import { convertReact } from './tree-tools';

export interface ReactTreeProps {
  root: CustomReactElement;
  notify(callback: () => void): () => void;
}

export class ReactTree extends React.Component<ReactTreeProps> {
  private unsubscribe: () => void;

  componentDidMount() {
    const { notify } = this.props;
    this.unsubscribe = notify(this.update);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  private update = () => {
    this.forceUpdate();
  };

  render() {
    const { root } = this.props;
    const elements = root.children.map(convertReact);
    return React.createElement(React.Fragment, undefined, elements);
  }
}
