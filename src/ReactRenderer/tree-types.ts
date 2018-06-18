export interface CustomReactElement {
  kind: 'element';
  type: any;
  props: {
    [x: string]: any;
  };
  children: Array<CustomReactNode>;
}

export interface CustomReactPrimitive {
  kind: 'primitive';
  value: string | number | boolean | null | undefined;
}

export interface CustomReactComment {
  kind: 'comment';
  value: string;
}

export type CustomReactNode = CustomReactElement | CustomReactPrimitive | CustomReactComment;
