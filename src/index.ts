import { ClassProvider, RendererFactory2 } from '@angular/core';
import { ReactRendererFactory } from './reactRenderFactory';
import { ReactRenderer } from './reactRenderer';

export { ReactRendererFactory } from './reactRenderFactory';
export { ReactRenderer } from './reactRenderer';

export const Rectangly: ClassProvider = {
  provide: RendererFactory2,
  useClass: ReactRendererFactory,
};
