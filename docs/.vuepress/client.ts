import { defineClientConfig } from '@vuepress/client'
import { CopyPageWidget } from 'vuepress-plugin-copy-page/client'
import 'vuepress-plugin-copy-page/styles/index.scss'

export default defineClientConfig({
  rootComponents: [CopyPageWidget],
})
