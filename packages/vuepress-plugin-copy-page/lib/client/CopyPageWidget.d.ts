declare global {
    interface Window {
        __MARKDOWN_SOURCES__?: Record<string, string>;
        __COPY_PAGE_OPTIONS__?: CopyPageOptions;
    }
}
interface CopyPageOptions {
    includes: string[];
    excludes: string[];
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
export declare const CopyPageWidget: import("vue").DefineComponent<{}, () => null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default CopyPageWidget;
//# sourceMappingURL=CopyPageWidget.d.ts.map