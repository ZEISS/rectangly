import { Inject, Optional, Renderer2, RendererFactory2, RendererType2, NgZone } from '@angular/core';
import { CustomComponents } from '../types';
import { ReactRenderer } from '../ReactRenderer';

export class ReactRendererFactory extends RendererFactory2 {
  private readonly renderer: ReactRenderer;

  constructor(
    @Inject('Context') ctx: any,
    zone: NgZone,
    @Optional()
    @Inject('ElementSelector')
    selector: CustomComponents,
  ) {
    super();
    this.renderer = new ReactRenderer(ctx, zone, selector);
  }

  createRenderer(_hostElement: any, _type: RendererType2 | null): Renderer2 {
    return this.renderer;
  }

  begin() {}

  end() {
    this.renderer.notify();
  }

  whenRenderingDone(): Promise<any> {
    return Promise.resolve();
  }
}
