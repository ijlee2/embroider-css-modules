type CodemodOptions = {
  projectRoot: string;
  src: string;
};

type Options = {
  projectRoot: string;
  src: string;
};

type ClassToStyles = Map<string, Style[]>;

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

export type { ClassToStyles, CodemodOptions, Options, Style };
