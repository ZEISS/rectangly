import { registerComponents, unregisterComponents } from '../registry';
import { ReactRenderer } from '.';

describe('ReactRenderer', () => {
  it('should called specified root element selector function', () => {
    const mockCallback = jest.fn();
    const renderer = new ReactRenderer({}, undefined, mockCallback);
    const element = renderer.createElement('z-Badge');
    expect(mockCallback).toBeCalled();
    expect(mockCallback).toBeCalledWith('z', 'Badge');
  });

  it('should use the element name', () => {
    const mockCallback = jest.fn(cb => undefined);
    const renderer = new ReactRenderer({}, undefined, mockCallback);
    const element = renderer.createElement('foo-bar');
    expect(mockCallback).toBeCalled();
    expect(element.type).toEqual('foo-bar');
  });

  it('should be possible to unregister component as well', () => {
    unregisterComponents('z');
    const renderer = new ReactRenderer({}, undefined);
    const element = renderer.createElement('z-Badge');
    expect(element.type).toEqual('z-Badge');
  });

  let renderer;
  beforeEach(() => {
    renderer = new ReactRenderer({}, undefined);
  });

  afterEach(() => {
    renderer.destroy();
  });

  it('should create text', () => {
    expect(renderer.createText('hello')).toEqual({
      value: 'hello',
      kind: 'primitive',
    });
  });

  it('should select a root node', () => {
    const element = renderer.selectRootElement('root');
    expect(element.children).toEqual([]);
    expect(element.props).toEqual({});
  });

  it('should listen and setProperty', () => {
    const mockCallback = jest.fn();

    const target: any = { props: {} };
    const listener = renderer.listen(target, 'click', mockCallback);
    expect(typeof listener).toEqual('function');
    expect(target.props.click).toEqual(mockCallback);
    listener();
    expect(target.props.click).toEqual(undefined);

    const target2: any = { props: { value: undefined } };
    const listener2 = renderer.listen(target2, 'value', undefined);
    listener2();

    expect(target2.props.key).toEqual('1');
  });

  it('should create comment', () => {
    expect(renderer.createComment('comment')).toEqual({
      value: 'comment',
      kind: 'comment',
    });
  });

  it('should append child', () => {
    const parent = {
      children: [],
    };

    renderer.appendChild(parent, {});
    expect(parent.children.length).toEqual(1);
  });

  it('should insert before', () => {
    const parent = {
      children: ['child1', 'child2'],
    };

    renderer.insertBefore(parent, 'child3', parent.children[1]);
    expect(parent.children).toEqual(['child1', 'child3', 'child2']);
  });

  it('should remove child', () => {
    const parent = {
      children: ['child1', 'child2', 'child3'],
    };

    renderer.removeChild(parent, parent.children[1]);
    expect(parent.children).toEqual(['child1', 'child3']);
  });

  it('should set and remove attribute', () => {
    const el = {
      props: {},
    };

    renderer.setAttribute(el, 'attr', 5);
    expect(el).toEqual({
      props: {
        attr: 5,
      },
    });

    renderer.removeAttribute(el, 'attr');
    expect(el).toEqual({
      props: {},
    });
  });

  it('should find parend', () => {
    const node1 = {
      kind: 'element',
      children: [],
    };

    const node2 = {
      kind: 'element',
      children: [node1],
    };

    const node3 = {
      kind: 'element',
      children: [node2],
    };

    const element = renderer.selectRootElement({});
    renderer.appendChild(element, node3);
    expect(renderer.parentNode(node1)).toEqual(node2);
  });

  it('should find next sibling', () => {
    const node1 = {
      kind: 'element',
      children: [],
    };

    const node2 = {
      kind: 'element',
      children: [],
    };

    const node3 = {
      kind: 'element',
      children: [node1, node2],
    };

    const element = renderer.selectRootElement({});
    renderer.appendChild(element, node3);
    expect(renderer.nextSibling(node1)).toEqual(node2);
    expect(renderer.nextSibling(node2)).toEqual(undefined);
  });

  it('should add and remove class', () => {
    const element: any = { props: {} };
    renderer.addClass(element, 'test');
    expect(element.props.className).toEqual('test');
    renderer.addClass(element, 'test2');
    expect(element.props.className).toEqual('test test2');
    renderer.addClass(element, 'test2');
    expect(element.props.className).toEqual('test test2');
    renderer.removeClass(element, 'test2');
    expect(element.props.className).toEqual('test');
    renderer.removeClass(element, 'test');
    expect(element.props.className).toEqual('');
  });

  it('should set and remove a style', () => {
    const element: any = {
      props: {
        style: {
          display: 'none',
        },
      },
    };

    renderer.setStyle(element, 'color', 'red');
    expect(element).toEqual({
      props: {
        style: {
          display: 'none',
          color: 'red',
        },
      },
    });

    renderer.setStyle(element, 'display');
    expect(element).toEqual({
      props: {
        style: {
          color: 'red',
        },
      },
    });
  });

  it('should set a property', () => {
    const element: any = {
      props: {},
    };

    renderer.setProperty(element, 'color', 'red');
    expect(element.props).toEqual({
      color: 'red',
    });

    renderer.setProperty(element, 'value', 'blue');
    expect(element).toEqual({ props: { color: 'red', key: '1', value: 'blue' } });
  });

  it('should set a value', () => {
    const node = {};
    renderer.setValue(node, 'hello');
    expect(node).toEqual({ value: 'hello' });
  });
});
