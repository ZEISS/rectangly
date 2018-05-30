import * as React from 'react';
import { getComponent, registerComponents, getCustomComponent } from '../registry';
import {
  Inject,
  Injectable,
  RenderComponentType,
  Renderer,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  RendererType2,
  RootRenderer,
} from '@angular/core';
import { ComponentSelector, CustomComponents } from '../types';
import { createContextProvider } from '../createContextProvider';
import { render } from 'react-dom';

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

function convertReact(node: CustomReactNode): React.ReactNode | undefined {
  if (node.kind === 'element') {
    const children = node.children.map(convertReact);
    return React.createElement(node.type, node.props, ...children);
  }

  if (node.kind === 'primitive') {
    return node.value;
  }

  return undefined;
}

function getComponentCallback(elementSelector?: CustomComponents): ComponentSelector {
  if (elementSelector) {
    if (typeof elementSelector === 'object') {
      return (prefix, name) => getCustomComponent(elementSelector, prefix, name);
    }

    if (typeof elementSelector === 'function') {
      return elementSelector;
    }
  }

  return getComponent;
}

function log(...args: Array<any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
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
  private getComponent: ComponentSelector;

  constructor(context: any, elementSelector?: CustomComponents) {
    super();
    this.getComponent = getComponentCallback(elementSelector);
    this.provider = createContextProvider(context);
  }

  createElement(name: string, namespace?: string | null | undefined): any {
    log('createElement', name, namespace);
    const [cleanName, prefix] = name.split('-').reverse();
    const type = (prefix ? this.getComponent(prefix, cleanName) : name) || name;

    return {
      type,
      kind: 'element',
      children: [],
      props: {
        key: this.nextKey(),
      },
    };
  }

  createText(value: string): any {
    log('createText', value);
    return {
      value,
      kind: 'primitive',
    };
  }

  selectRootElement(selectorOrNode: any): any {
    log('selectRootElement', selectorOrNode);

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
    log('listen', target, eventName, callback);
    target.props[eventName] = callback;

    return () => this.setProperty(target, eventName, undefined);
  }

  destroy(): void {
    log('destroy');
    // tslint:disable-next-line
    this.root = null;
    this.element.children = [];
    this.element.props = {};
  }

  createComment(value: string): any {
    log('createComment', value);
    return {
      value,
      kind: 'comment',
    };
  }

  appendChild(parent: any, newChild: any): void {
    log('appendChild', parent, newChild);
    parent.children.push(newChild);
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    log('insertBefore', parent, newChild, refChild);
    const refIndex = parent.children.indexOf(refChild);
    parent.children.splice(refIndex, 0, newChild);
  }

  removeChild(parent: any, oldChild: any): void {
    log('removeChild', parent, oldChild);
    const index = parent.children.indexOf(oldChild);

    if (index !== -1) {
      parent.children.splice(index, 1);
    }
  }

  parentNode(node: any): any {
    log('parentNode', node);
    return findParent(this.element, node);
  }

  nextSibling(node: any): any {
    log('nextSibling', node);
    const parent = findParent(this.element, node);

    if (parent) {
      const index = parent.children.indexOf(node);
      return parent.children[index + 1];
    }
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
    log('setAttribute', el, name, value, namespace);
    el.props[name] = value;
  }

  private nextKey() {
    this.sid++;
    return this.sid.toString();
  }

  render() {
    log('Rendering ...');
    const elements = this.element.children.map(convertReact);
    const context = React.createElement(this.provider, undefined, elements);
    render(context, this.root);
  }

  removeAttribute(el: any, name: string, namespace?: string | null | undefined): void {
    log('removeAttribute', el, name, namespace);

    if (el) {
      delete el.props[name];
    }
  }

  addClass(el: any, name: string): void {
    log('addClass', el, name);

    if (!el.props.className || !el.props.className.match(name)) {
      el.props.className = `${el.props.className || ''} ${name}`.trim();
    }
  }

  removeClass(el: any, name: string): void {
    log('removeClass', el, name);

    if (!el.props.className) {
      return;
    }

    el.props.className = el.props.className.replace(name, '').trim();
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2 | undefined): void {
    log('setStyle', el, style, value, flags);
    const obj = el.props.style || {};
    el.props.style = {
      ...obj,
      [style]: value,
    };
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2 | undefined): void {
    log('removeStyle', el, style, flags);
    const { [style]: _deleted, ...obj } = el.props.style || {};
    el.props.style = obj;
  }

  setProperty(el: any, name: string, value: any): void {
    log('setProperty', el, name, value);

    if (name === 'value' && el.props.value === undefined) {
      // edge case; Angular does not spit out bound values on first render;
      el.props.key = this.nextKey();
    }

    el.props[name] = value;
  }

  setValue(node: any, value: string): void {
    log('setValue', node, value);
    node.value = value;
  }
}
