import { defineClientConfig } from 'vuepress/client'
import copyPageClient from 'vuepress-plugin-copy-page/client'
import 'vuepress-plugin-copy-page/styles/index.scss'

export default defineClientConfig(copyPageClient)
