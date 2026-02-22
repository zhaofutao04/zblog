import type { Plugin } from 'vuepress';
export interface CopyPageOptions {
    /**
     * Page path patterns where the copy button should appear
     * @default ['/posts/']
     */
    includes?: string[];
    /**
     * Page path patterns where the copy button should NOT appear
     * @default []
     */
    excludes?: string[];
    /**
     * Position of the copy button
     * @default 'top-right'
     */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
export declare const copyPagePlugin: (options?: CopyPageOptions) => Plugin;
export default copyPagePlugin;
//# sourceMappingURL=index.d.ts.map