/// <reference types="ents" />
import Helper from '@ember/component/helper';
type IndexSignatureParameter = string | number | symbol;
type LocalClassName<T extends IndexSignatureParameter> = T;
type Styles<T extends IndexSignatureParameter> = Record<LocalClassName<T>, string>;
type MaybeLocalClassName<T extends IndexSignatureParameter> = LocalClassName<T>[] | LocalClassName<T> | undefined | null;
interface LocalClassNewHelperSignature<T extends IndexSignatureParameter> {
    Args: {
        Positional: [Styles<T>, ...MaybeLocalClassName<T>[]];
    };
    Return: string;
}
declare class LocalClassNewHelper<T extends IndexSignatureParameter> extends Helper<LocalClassNewHelperSignature<T>> {
    compute(positional: LocalClassNewHelperSignature<T>['Args']['Positional']): string;
}
export { LocalClassNewHelper as default };
//# sourceMappingURL=helpers/local-class-new.d.ts.map