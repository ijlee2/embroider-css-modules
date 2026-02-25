type CodemodOptions = {
  convert: Set<'components' | 'routes'>;
  entity: string | undefined;
  projectRoot: string;
  src: string;
};

type Options = {
  convert: {
    components: boolean;
    routes: boolean;
  };
  entity: string | undefined;
  projectRoot: string;
  src: string;
};

type ClassNameToStyles = Map<string, Style[]>;

type EntityData = {
  errors: string[];
  localStyles: Style[];
};

type Project = {
  components: Map<string, EntityData>;
  routes: Map<string, EntityData>;
};

type Style = {
  classNames: string[];
  code: string;
  line: number;
  selector: string;
};

export type {
  ClassNameToStyles,
  CodemodOptions,
  EntityData,
  Options,
  Project,
  Style,
};
