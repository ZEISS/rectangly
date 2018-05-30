import { ClassProvider, RendererFactory2 } from '@angular/core';
import { ReactRenderer } from './ReactRenderer';
import { ReactRendererFactory } from './ReactRendererFactory';

export * from './types';

export { ReactRendererFactory, ReactRenderer };
export { registerComponents, unregisterComponents } from './registry';

export const Rectangly: ClassProvider = {
  provide: RendererFactory2,
  useClass: ReactRendererFactory,
};
