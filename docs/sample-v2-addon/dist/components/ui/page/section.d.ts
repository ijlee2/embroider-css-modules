import Component from '@glimmer/component';
interface UiPageSectionSignature {
    Blocks: {
        content: [];
        title: [];
    };
}
declare class UiPageSectionComponent extends Component<UiPageSectionSignature> {
    styles: {
        readonly section: string;
        readonly title: string;
    };
}
export { UiPageSectionComponent as default };
