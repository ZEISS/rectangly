import { ComponentsCollection, ComponentRegistry, ComponentSelector } from '../types';

const componentRegistry: ComponentRegistry = {};

export function getCustomComponent(registry: ComponentRegistry, prefix: string, name: string) {
  const components = prefix && registry && registry[prefix];
  return components && components[name];
}

export function getComponent(prefix: string, name: string) {
  return getCustomComponent(componentRegistry, prefix, name);
}

export function registerComponents(prefix: string, components: ComponentsCollection) {
  if (!componentRegistry[prefix]) {
    componentRegistry[prefix] = components;
  }
}

export function unregisterComponents(prefix: string) {
  if (componentRegistry[prefix]) {
    delete componentRegistry[prefix];
  }
}
