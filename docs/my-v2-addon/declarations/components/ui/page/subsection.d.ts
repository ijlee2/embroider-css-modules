import Component from '@glimmer/component';
interface UiPageSubsectionSignature {
    Blocks: {
        content: [];
        title: [];
    };
}
export default class UiPageSubsectionComponent extends Component<UiPageSubsectionSignature> {
    styles: {
        readonly subsection: string;
        readonly title: string;
    };
}
export {};
//# sourceMappingURL=subsection.d.ts.map