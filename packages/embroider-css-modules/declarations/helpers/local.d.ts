import Helper from '@ember/component/helper';
type IndexSignatureParameter = string | number | symbol;
type LocalClassName<T extends IndexSignatureParameter> = T;
type Styles<T extends IndexSignatureParameter> = Record<LocalClassName<T>, string>;
type MaybeLocalClassName<T extends IndexSignatureParameter> = LocalClassName<T>[] | LocalClassName<T> | undefined | null;
interface LocalSignature<T extends IndexSignatureParameter> {
    Args: {
        Positional: [Styles<T>, ...MaybeLocalClassName<T>[]];
    };
    Return: string;
}
export default class LocalHelper<T extends IndexSignatureParameter> extends Helper<LocalSignature<T>> {
    compute(positional: LocalSignature<T>['Args']['Positional']): string;
}
export {};
//# sourceMappingURL=local.d.ts.map