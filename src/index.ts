import { NgModule, ClassProvider, RendererFactory2 } from '@angular/core';
import { ReactRenderer } from './ReactRenderer';
import { ReactRendererFactory } from './ReactRendererFactory';

export * from './types';

export { ReactRendererFactory, ReactRenderer };
export { registerComponents, unregisterComponents } from './registry';

export const Rectangly: ClassProvider = {
  provide: RendererFactory2,
  useClass: ReactRendererFactory,
};

export declare class RectanglyModule {}

export function createModuleBasedOn(baseModule: any): RectanglyModule {
  @NgModule({
    imports: [baseModule],
    exports: [baseModule],
    providers: [Rectangly],
  })
  class RectanglyModuleInt {}

  return RectanglyModuleInt;
}
