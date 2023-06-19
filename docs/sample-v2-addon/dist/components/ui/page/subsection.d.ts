import Component from '@glimmer/component';
interface UiPageSubsectionSignature {
    Blocks: {
        content: [];
        title: [];
    };
}
declare class UiPageSubsectionComponent extends Component<UiPageSubsectionSignature> {
    styles: {
        readonly subsection: string;
        readonly title: string;
    };
}
export { UiPageSubsectionComponent as default };
