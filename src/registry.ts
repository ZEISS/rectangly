export const componentRegistry = {};

export function getComponent(prefix: string, name: string) {
  const components = prefix && componentRegistry[prefix];
  if (components && components[name]) {
    return components[name];
  }
  return undefined;
}

export function registerComponents(prefix: string, components: { [name: string]: any }) {
  if (!componentRegistry[prefix]) {
    componentRegistry[prefix] = components;
  }
}

export function unregisterComponents(prefix: string) {
  if (componentRegistry[prefix]) {
    delete componentRegistry[prefix];
  }
}
