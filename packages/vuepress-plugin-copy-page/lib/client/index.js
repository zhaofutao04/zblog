import { defineClientConfig } from '@vuepress/client';
import { CopyPageWidget } from './CopyPageWidget.js';
export { CopyPageWidget };
export default defineClientConfig({
    rootComponents: [CopyPageWidget],
});
