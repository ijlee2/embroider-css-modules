import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

type IndexSignatureParameter = string | number | symbol;

type Styles<T extends IndexSignatureParameter> = Record<T, string>;

type LocalClassName<T extends IndexSignatureParameter> = keyof Styles<T>;

type MaybeLocalClassName<T extends IndexSignatureParameter> =
  | LocalClassName<T>
  | undefined
  | null;

interface LocalClassHelperSignature<T extends IndexSignatureParameter> {
  Args: {
    Positional: [Styles<T>, ...MaybeLocalClassName<T>[]];
  };
  Return: string;
}

export default class LocalClassHelper<
  T extends IndexSignatureParameter
> extends Helper<LocalClassHelperSignature<T>> {
  compute(positional: LocalClassHelperSignature<T>['Args']['Positional']) {
    const [styles, ...localClassNames] = positional;

    assert('The styles object is undefined.', styles);

    const classNames = localClassNames.reduce((accumulator, localClassName) => {
      if (localClassName === undefined || localClassName === null) {
        return accumulator;
      }

      const className = styles[localClassName];

      if (className) {
        accumulator.push(className);
      }

      return accumulator;
    }, [] as string[]);

    return classNames.join(' ');
  }
}
