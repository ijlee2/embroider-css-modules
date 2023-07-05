/// <reference types="ents" />
import Helper from '@ember/component/helper';
type IndexSignatureParameter = string | number | symbol;
type LocalClassName<T extends IndexSignatureParameter> = T;
type Styles<T extends IndexSignatureParameter> = Record<LocalClassName<T>, string>;
type MaybeLocalClassName<T extends IndexSignatureParameter> = LocalClassName<T>[] | LocalClassName<T> | undefined | null;
interface LocalClassHelperSignature<T extends IndexSignatureParameter> {
    Args: {
        Positional: [Styles<T>, ...MaybeLocalClassName<T>[]];
    };
    Return: string;
}
declare class LocalClassHelper<T extends IndexSignatureParameter> extends Helper<LocalClassHelperSignature<T>> {
    compute(positional: LocalClassHelperSignature<T>['Args']['Positional']): string;
}
export { LocalClassHelper as default };
//# sourceMappingURL=helpers/local-class.d.ts.map