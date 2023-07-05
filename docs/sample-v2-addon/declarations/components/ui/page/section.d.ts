import Component from '@glimmer/component';
interface UiPageSectionSignature {
    Blocks: {
        content: [];
        title: [];
    };
}
export default class UiPageSectionComponent extends Component<UiPageSectionSignature> {
    styles: {
        readonly section: string;
        readonly title: string;
    };
}
export {};
//# sourceMappingURL=section.d.ts.map