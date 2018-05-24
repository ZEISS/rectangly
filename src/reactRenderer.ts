import {
  Injectable,
  Renderer,
  RootRenderer,
  RenderComponentType,
  RendererFactory2,
  Renderer2,
  RendererType2,
  RendererStyleFlags2,
  Inject,
} from '@angular/core';
import * as React from 'react';
import { render } from 'react-dom';
import { createContextProvider } from './contextProvider';

interface CustomReactElement {
  kind: 'element';
  type: any;
  props: {
    [x: string]: any;
  };
  children: Array<CustomReactNode>;
}

interface CustomReactPrimitive {
  kind: 'primitive';
  value: string | number | boolean | null | undefined;
}

interface CustomReactComment {
  kind: 'comment';
  value: string;
}

type CustomReactNode = CustomReactElement | CustomReactPrimitive | CustomReactComment;

function findParent(parent: CustomReactElement, node: CustomReactNode): CustomReactElement | undefined {
  for (const child of parent.children) {
    if (node === child) {
      return parent;
    } else if (child.kind === 'element') {
      const p = findParent(child, node);

      if (p) {
        return p;
      }
    }
  }

  return undefined;
}

function convertReact(node: CustomReactNode): React.ReactNode {
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

export class ReactRenderer extends Renderer2 {
  data: { [key: string]: any };
  private root: Element | null;
  private element: CustomReactElement = {
    kind: 'element',
    type: 'render-root',
    children: [],
    props: {},
  };
  private sid = 0;
  private provider: React.ComponentType<any>;
  private reactElementCreator: any | undefined;

  constructor(context: any, reactElementCreator?: any) {
    super();
    this.provider = createContextProvider(context);
    this.reactElementCreator = reactElementCreator;
  }

  createElement(name: string, namespace?: string | null | undefined): any {
    console.log('createElement', name, namespace);
    return {
      kind: 'element',
      type: this.reactElementCreator ? this.reactElementCreator(name) : 'div',
      children: [],
      props: {
        key: this.nextKey(),
      },
    };
  }

  createText(value: string): any {
    console.log('createText', value);
    return {
      kind: 'primitive',
      value,
    };
  }

  selectRootElement(selectorOrNode: any): any {
    console.log('selectRootElement', selectorOrNode);

    if (typeof selectorOrNode === 'string') {
      this.root = document.querySelector(selectorOrNode) || document.body;
    } else {
      this.root = selectorOrNode;
    }

    this.element.children = [];
    this.element.props = {};
    return this.element;
  }

  listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
    console.log('listen', target, eventName, callback);
    target.props[eventName] = callback;
    return () => {
      this.setProperty(target, eventName, undefined);
    };
  }

  destroy(): void {
    console.log('destroy');
    // tslint:disable-next-line
    this.root = null;
    this.element.children = [];
    this.element.props = {};
  }

  createComment(value: string): any {
    console.log('createComment', value);
    return {
      kind: 'comment',
      value,
    };
  }

  appendChild(parent: any, newChild: any): void {
    console.log('appendChild', parent, newChild);
    parent.children.push(newChild);
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    console.log('insertBefore', parent, newChild, refChild);
    const refIndex = parent.children.indexOf(refChild);
    parent.children.splice(refIndex, 0, newChild);
  }

  removeChild(parent: any, oldChild: any): void {
    console.log('removeChild', parent, oldChild);
    const index = parent.children.indexOf(oldChild);

    if (index !== -1) {
      parent.children.splice(index, 1);
    }
  }

  parentNode(node: any): any {
    console.log('parentNode', node);
    return findParent(this.element, node);
  }

  nextSibling(node: any): any {
    console.log('nextSibling', node);
    const parent = findParent(this.element, node);

    if (parent) {
      const index = parent.children.indexOf(node);
      return parent.children[index + 1];
    }

    return undefined;
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
    console.log('setAttribute', el, name, value, namespace);
    el.props[name] = value;
  }

  private nextKey() {
    return (this.sid++).toString();
  }

  render() {
    console.log('Rendering ...');
    const elements = this.element.children.map(convertReact);
    const context = React.createElement(this.provider, undefined, elements);
    render(context, this.root);
  }

  removeAttribute(el: any, name: string, namespace?: string | null | undefined): void {
    console.log('removeAttribute', el, name, namespace);

    if (el) {
      delete el.props[name];
    }
  }

  addClass(el: any, name: string): void {
    console.log('addClass', el, name);
    const cls = el.props.className || '';
    const classes = cls.split(' ');

    if (classes.indexOf(name) === -1) {
      classes.push(name);
      el.props.className = classes.join(' ');
    }
  }

  removeClass(el: any, name: string): void {
    console.log('removeClass', el, name);
    const cls = el.props.className || '';
    const classes = cls.split(' ');
    const index = classes.indexOf(name);

    if (index !== -1) {
      classes.splice(index, 1);
      el.props.className = classes.join(' ');
    }
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2 | undefined): void {
    console.log('setStyle', el, style, value, flags);
    const obj = el.props.style || {};
    el.props.style = {
      ...obj,
      [style]: value,
    };
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2 | undefined): void {
    console.log('removeStyle', el, style, flags);
    const { [style]: _deleted, ...obj } = el.props.style || {};
    el.props.style = obj;
  }

  setProperty(el: any, name: string, value: any): void {
    console.log('setProperty', el, name, value);

    if (name === 'value' && el.props.value === undefined) {
      // edge case; Angular does not spit out bound values on first render;
      el.props.key = this.nextKey();
    }

    el.props[name] = value;
  }

  setValue(node: any, value: string): void {
    console.log('setValue', node, value);
    node.value = value;
  }
}
