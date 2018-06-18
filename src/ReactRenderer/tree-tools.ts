import * as React from 'react';
import { CustomReactNode, CustomReactElement } from './tree-types';

export function convertReact(node: CustomReactNode): React.ReactNode {
  if (node) {
    if (node.kind === 'element') {
      const children = node.children.map(convertReact);
      return React.createElement(node.type, node.props, ...children);
    } else if (node.kind === 'primitive') {
      return node.value;
    }
  }

  return undefined;
}

export function findParent(parent: CustomReactElement, node: CustomReactNode): CustomReactElement | undefined {
  for (const child of parent.children) {
    if (node === child) {
      return parent;
    }

    if (child.kind === 'element') {
      const p = findParent(child, node);

      if (p) {
        return p;
      }
    }
  }

  return;
}
