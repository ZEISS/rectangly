import { RendererFactory2, Renderer2, RendererType2, Inject, Type, Optional } from '@angular/core';
import { ReactRenderer } from './reactRenderer';
import { ComponentRegistryEntry } from './types';

export class ReactRendererFactory extends RendererFactory2 {
  private readonly renderer: ReactRenderer;

  constructor(
    @Inject('Context') ctx: any,
    @Optional()
    @Inject('RootElementSelector')
    selector: (prefix: string, name: string) => any | ComponentRegistryEntry,
  ) {
    super();
    this.renderer = new ReactRenderer(ctx, selector);
  }

  createRenderer(_hostElement: any, _type: RendererType2 | null): Renderer2 {
    return this.renderer;
  }

  begin() {}

  end() {
    this.renderer.render();
  }

  whenRenderingDone(): Promise<any> {
    return Promise.resolve();
  }
}
