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

export default function local<T extends IndexSignatureParameter>(
  styles: Styles<T>,
  ...localClassNames: MaybeLocalClassName<T>[]
): string {
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
