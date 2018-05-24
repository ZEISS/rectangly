import { ClassProvider, RendererFactory2 } from '@angular/core';
import { ReactRendererFactory } from './reactRendererFactory';
import { ReactRenderer } from './reactRenderer';

export { ReactRendererFactory } from './reactRendererFactory';
export { ReactRenderer } from './reactRenderer';
export { ComponentRegistryEntry } from './types';

export const Rectangly: ClassProvider = {
  provide: RendererFactory2,
  useClass: ReactRendererFactory,
};
