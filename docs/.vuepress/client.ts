import { defineClientConfig } from '@vuepress/client'
import { h, ref, computed, onMounted, onUnmounted } from 'vue'
import { usePageData } from '@vuepress/client'

// 扩展 Window 接口
declare global {
  interface Window {
    __MARKDOWN_SOURCES__?: Record<string, string>
  }
}

const CopyPageWidget = {
  name: 'CopyPageWidget',
  setup() {
    const page = usePageData()
    const showMenu = ref(false)
    const copied = ref(false)
    const showModal = ref(false)
    const menuRef = ref<HTMLElement | null>(null)

    // 获取 Markdown 源码
    const markdownSource = computed(() => {
      const path = page.value.path
      if (typeof window !== 'undefined' && window.__MARKDOWN_SOURCES__) {
        return window.__MARKDOWN_SOURCES__[path] || ''
      }
      return ''
    })

    // 是否显示 widget（只在文章页面显示）
    const shouldShow = computed(() => {
      const path = page.value.path
      return path.startsWith('/posts/') && !path.endsWith('/')
    })

    // 点击外部关闭菜单
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        showMenu.value = false
      }
    }

    // ESC 键关闭模态框
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showModal.value) {
          showModal.value = false
        }
        if (showMenu.value) {
          showMenu.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    })

    // 复制 Markdown 到剪贴板
    const copyAsMarkdown = async () => {
      try {
        if (markdownSource.value) {
          await navigator.clipboard.writeText(markdownSource.value)
        } else {
          const contentEl = document.querySelector('.theme-default-content') ||
                            document.querySelector('.vp-doc') ||
                            document.querySelector('article')
          if (contentEl) {
            const text = contentEl.textContent || ''
            await navigator.clipboard.writeText(text.trim())
          }
        }
        copied.value = true
        showMenu.value = false
        // 显示复制成功提示
        showToast('Copied to clipboard!')
        setTimeout(() => {
          copied.value = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
        showToast('Copy failed', true)
      }
    }

    // Toast 提示
    const showToast = (message: string, isError = false) => {
      // 移除已有的 toast
      const existingToast = document.querySelector('.copy-page-toast')
      if (existingToast) {
        existingToast.remove()
      }

      const toast = document.createElement('div')
      toast.className = `copy-page-toast ${isError ? 'error' : ''}`
      toast.textContent = message
      document.body.appendChild(toast)

      // 动画显示
      requestAnimationFrame(() => {
        toast.classList.add('show')
      })

      // 2秒后移除
      setTimeout(() => {
        toast.classList.remove('show')
        setTimeout(() => toast.remove(), 300)
      }, 2000)
    }

    // 查看 Markdown 原文
    const viewAsMarkdown = () => {
      showModal.value = true
      showMenu.value = false
    }

    // 关闭模态框
    const closeModal = () => {
      showModal.value = false
    }

    // 从模态框复制
    const copyFromModal = async () => {
      await copyAsMarkdown()
      showModal.value = false
    }

    return () => {
      if (!shouldShow.value) return null

      return h('div', {
        class: 'copy-page-widget',
        ref: menuRef,
      }, [
        // 主按钮
        h('button', {
          class: ['copy-page-trigger', copied.value ? 'copied' : ''],
          onClick: (e: MouseEvent) => {
            e.stopPropagation()
            showMenu.value = !showMenu.value
          },
          title: 'Copy page options',
        }, [
          h('span', { class: 'copy-page-icon' }, [
            copied.value
              ? h('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '16',
                  height: '16',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2.5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }, [
                  h('path', { d: 'M20 6L9 17l-5-5' })
                ])
              : h('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '16',
                  height: '16',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }, [
                  h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
                  h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
                ])
          ]),
          h('span', { class: 'copy-page-label' }, copied.value ? 'Copied!' : 'Copy'),
        ]),

        // 下拉菜单
        showMenu.value ? h('div', { class: 'copy-page-menu' }, [
          // Copy as Markdown
          h('button', {
            class: 'copy-page-menu-item',
            onClick: copyAsMarkdown,
          }, [
            h('span', { class: 'menu-item-icon' }, [
              h('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '14',
                height: '14',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }, [
                h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
                h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
              ])
            ]),
            h('span', { class: 'menu-item-text' }, [
              h('span', { class: 'menu-item-title' }, 'Copy as Markdown'),
              h('span', { class: 'menu-item-desc' }, 'Copy page content to clipboard'),
            ]),
          ]),

          // View as Markdown
          h('button', {
            class: 'copy-page-menu-item',
            onClick: viewAsMarkdown,
          }, [
            h('span', { class: 'menu-item-icon' }, [
              h('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '14',
                height: '14',
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }, [
                h('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' }),
                h('polyline', { points: '14,2 14,8 20,8' }),
              ])
            ]),
            h('span', { class: 'menu-item-text' }, [
              h('span', { class: 'menu-item-title' }, 'View as Markdown'),
              h('span', { class: 'menu-item-desc' }, 'Preview raw markdown source'),
            ]),
          ]),
        ]) : null,

        // Markdown 预览模态框
        showModal.value ? h('div', {
          class: 'copy-page-modal-overlay',
          onClick: closeModal,
        }, [
          h('div', {
            class: 'copy-page-modal',
            onClick: (e: MouseEvent) => e.stopPropagation(),
          }, [
            // 模态框头部
            h('div', { class: 'copy-page-modal-header' }, [
              h('div', { class: 'modal-header-left' }, [
                h('span', { class: 'modal-icon' }, [
                  h('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '18',
                    height: '18',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: '2',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }, [
                    h('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' }),
                    h('polyline', { points: '14,2 14,8 20,8' }),
                  ])
                ]),
                h('h3', { class: 'modal-title' }, 'Markdown Source'),
              ]),
              h('button', {
                class: 'modal-close-btn',
                onClick: closeModal,
              }, [
                h('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '18',
                  height: '18',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }, [
                  h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                  h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
                ])
              ])
            ]),

            // 模态框内容
            h('div', { class: 'copy-page-modal-body' }, [
              h('pre', { class: 'markdown-preview' },
                markdownSource.value || 'No markdown source available'
              )
            ]),

            // 模态框底部
            h('div', { class: 'copy-page-modal-footer' }, [
              h('button', {
                class: 'modal-btn modal-btn-secondary',
                onClick: closeModal,
              }, 'Close'),
              h('button', {
                class: 'modal-btn modal-btn-primary',
                onClick: copyFromModal,
              }, [
                h('svg', {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '14',
                  height: '14',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                }, [
                  h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
                  h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
                ]),
                'Copy Markdown'
              ]),
            ])
          ])
        ]) : null
      ])
    }
  }
}

export default defineClientConfig({
  rootComponents: [CopyPageWidget],
})