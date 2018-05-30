/**
 * Should be any kind of component that can be rendered from
 * the React renderer.
 */
export type Component = any;

export interface ComponentsCollection {
  [name: string]: Component;
}

export interface ComponentRegistry {
  [prefix: string]: ComponentsCollection;
}

export interface ComponentSelector {
  (prefix: string, name: string): Component;
}

export type CustomComponents = ComponentRegistry | ComponentSelector;
