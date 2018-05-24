import { RendererFactory2, Renderer2, RendererType2, Inject, Type, Optional } from '@angular/core';
import { ReactRenderer } from './reactRenderer';

export class ReactRendererFactory extends RendererFactory2 {
  private readonly renderer: ReactRenderer;

  constructor(
    @Inject('Context') ctx: any,
    @Optional()
    @Inject('ReactElementCreator')
    creator: any,
  ) {
    super();
    this.renderer = new ReactRenderer(ctx, creator);
  }

  createRenderer(_hostElement: any, _type: RendererType2 | null): Renderer2 {
    return this.renderer;
  }

  begin() {
    return undefined;
  }

  end() {
    this.renderer.render();
    return undefined;
  }

  whenRenderingDone(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
