import { ClassProvider, RendererFactory2 } from '@angular/core';
import { ReactRendererFactory } from './reactRendererFactory';
import { ReactRenderer } from './reactRenderer';

export { ReactRendererFactory, ReactRenderer };
export { ComponentRegistryEntry } from './types';
export { registerComponents, unregisterComponents } from './registry';

export const Rectangly: ClassProvider = {
  provide: RendererFactory2,
  useClass: ReactRendererFactory,
};
