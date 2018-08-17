import * as React from 'react';
import { getComponent, getCustomComponent } from '../registry';
import { Renderer2, RendererStyleFlags2, NgZone } from '@angular/core';
import { ComponentSelector, CustomComponents } from '../types';
import { createContextProvider } from '../createContextProvider';
import { render } from 'react-dom';
import { CustomReactElement } from './tree-types';
import { ReactTree } from './react-tree';
import { findParent } from './tree-tools';

const log = process.env.NODE_ENV === 'development' ? console.log : (..._args: Array<any>) => {};

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

export class ReactRenderer extends Renderer2 {
  data: { [key: string]: any };
  private root: Element | null;
  private element: CustomReactElement = {
    kind: 'element',
    type: 'render-root',
    children: [],
    props: {},
  };
  private update: (() => void) | undefined;
  private sid = 0;
  private provider: React.ComponentType<any>;
  private getComponent: ComponentSelector;

  constructor(context: any, private zone: NgZone, elementSelector?: CustomComponents) {
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
    const zone = this.zone;

    target.props[eventName] = zone
      ? function(...args: Array<any>) {
          return zone.run(callback, this, args);
        }
      : callback;

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

    if (el === this.element) {
      this.setupRender();
    }
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

  notify() {
    const u = this.update;
    u && u();
  }

  private subscribe = (subscriber: () => void) => {
    this.update = subscriber;
    return () => {
      this.update = undefined;
    };
  };

  private setupRender() {
    const tree = React.createElement(ReactTree, {
      root: this.element,
      notify: this.subscribe,
    });
    const context = React.createElement(this.provider, undefined, tree);
    render(context, this.root);
  }

  private nextKey() {
    this.sid++;
    return this.sid.toString();
  }
}
