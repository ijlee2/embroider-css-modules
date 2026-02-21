type CodemodOptions = {
  convert: Set<'components' | 'routes'>;
  folder: string;
  projectRoot: string;
  src: string;
};

type Options = {
  convert: {
    components: boolean;
    routes: boolean;
  };
  folder: string;
  projectRoot: string;
  src: string;
};

type ClassToStyles = Map<string, Style[]>;

type EntityData = {
  errors: string[];
  localStyles: Style[];
};

type Project = {
  components: Map<string, EntityData>;
  routes: Map<string, EntityData>;
};

type Style = {
  classes: string[];
  location: {
    end: {
      column: number;
      line: number;
      offset: number;
    };
    start: {
      column: number;
      line: number;
      offset: number;
    };
  };
  raw: string;
  selector: string;
};

export type {
  ClassToStyles,
  CodemodOptions,
  EntityData,
  Options,
  Project,
  Style,
};
