export interface ComponentRegistryEntry {
  prefix: string;
  components: {
    [name: string]: any;
  };
}
