import type { Plugin, App, Page } from 'vuepress'
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

// 存储所有页面的 markdown 源码
const markdownSources: Record<string, string> = {}

export const markdownSourcePlugin = (): Plugin => ({
  name: 'vuepress-plugin-markdown-source',

  extendsPage(page: Page): void {
    // 获取页面源文件路径
    const filePath = page.filePath
    if (filePath && existsSync(filePath)) {
      // 读取 Markdown 源码
      const content = readFileSync(filePath, 'utf-8')
      // 存储到全局对象中，使用 path 作为 key
      markdownSources[page.path] = content
    }
  },

  clientConfigFile(app: App): string {
    // 创建一个客户端配置文件，将 Markdown 源码注入到全局变量中
    const content = `export default {
  enhance({ app }) {
    // 注入 Markdown 源码到全局属性
    if (typeof window !== 'undefined') {
      window.__MARKDOWN_SOURCES__ = ${JSON.stringify(markdownSources)}
    }
  }
}`
    // 获取临时目录路径
    const tempDir = app.dir.temp()
    const configDir = join(tempDir, 'markdown-sources')
    const tempPath = join(configDir, 'config.js')

    // 确保目录存在
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true })
    }
    writeFileSync(tempPath, content, 'utf-8')

    return tempPath
  }
})