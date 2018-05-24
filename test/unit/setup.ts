import * as Adapter from 'enzyme-adapter-react-16';
import { raf } from './temp-polyfills';
import { configure, shallow, render, mount } from 'enzyme';

// React 16 Enzyme adapter
configure({
  adapter: new Adapter(),
});

declare const global;

global.shallow = shallow;
global.render = render;
global.mount = mount;
