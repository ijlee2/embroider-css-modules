import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

type IndexSignatureParameter = string | number | symbol;

type LocalClassName<T extends IndexSignatureParameter> = T;

type Styles<T extends IndexSignatureParameter> = Record<
  LocalClassName<T>,
  string
>;

type MaybeLocalClassName<T extends IndexSignatureParameter> =
  | LocalClassName<T>[]
  | LocalClassName<T>
  | undefined
  | null;

interface LocalSignature<T extends IndexSignatureParameter> {
  Args: {
    Positional: [Styles<T>, ...MaybeLocalClassName<T>[]];
  };
  Return: string;
}

export default class LocalHelper<
  T extends IndexSignatureParameter,
> extends Helper<LocalSignature<T>> {
  compute(positional: LocalSignature<T>['Args']['Positional']) {
    const [styles, ...localClassNames] = positional;

    assert('The styles object is undefined.', styles);

    const classNames = localClassNames.reduce<string[]>(
      (accumulator, localClassName) => {
        if (localClassName === undefined || localClassName === null) {
          return accumulator;
        }

        if (Array.isArray(localClassName)) {
          accumulator.push(...localClassName.map((element) => styles[element]));
        } else {
          accumulator.push(styles[localClassName]);
        }

        return accumulator;
      },
      [],
    );

    return classNames.filter(Boolean).join(' ');
  }
}
