import { defineClientConfig } from '@vuepress/client'
import { CopyPageWidget } from '../../packages/vuepress-plugin-copy-page/lib/client/CopyPageWidget.js'
import '../../packages/vuepress-plugin-copy-page/lib/styles/index.scss'

export default defineClientConfig({
  rootComponents: [CopyPageWidget],
})
