import { defineComponent, h, ref, computed, onMounted, onUnmounted, createApp } from 'vue'

declare global {
  interface Window {
    __MARKDOWN_SOURCES__?: Record<string, string>
    __COPY_PAGE_OPTIONS__?: CopyPageOptions
  }
}

interface CopyPageOptions {
  includes: string[]
  excludes: string[]
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const defaultOptions: CopyPageOptions = {
  includes: ['/posts/'],
  excludes: [],
  position: 'top-right',
}

// SVG Icons as strings
const copyIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`

const checkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>`

const fileIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline></svg>`

export const CopyPageWidget = defineComponent({
  name: 'CopyPageWidget',

  setup() {
    const mounted = ref(false)
    const pagePath = ref('')
    let widgetEl: HTMLElement | null = null

    const options = computed(() => {
      if (typeof window !== 'undefined') {
        return window.__COPY_PAGE_OPTIONS__ || defaultOptions
      }
      return defaultOptions
    })

    const markdownSource = computed(() => {
      if (typeof window !== 'undefined' && window.__MARKDOWN_SOURCES__) {
        return window.__MARKDOWN_SOURCES__[pagePath.value] || ''
      }
      return ''
    })

    const shouldShow = computed(() => {
      if (!mounted.value || !pagePath.value) return false
      const path = pagePath.value

      for (const exclude of options.value.excludes) {
        if (path.startsWith(exclude)) return false
      }

      for (const include of options.value.includes) {
        if (path.startsWith(include) && !path.endsWith('/')) return true
      }

      return false
    })

    const showToast = (message: string, isError = false) => {
      const existingToast = document.querySelector('.copy-page-toast')
      if (existingToast) existingToast.remove()

      const toast = document.createElement('div')
      toast.className = `copy-page-toast ${isError ? 'error' : ''}`
      toast.textContent = message
      document.body.appendChild(toast)

      requestAnimationFrame(() => toast.classList.add('show'))

      setTimeout(() => {
        toast.classList.remove('show')
        setTimeout(() => toast.remove(), 300)
      }, 2000)
    }

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
        showToast('Copied to clipboard!')
        updateButtonState(true)
        setTimeout(() => updateButtonState(false), 2000)
      } catch (err) {
        console.error('Copy failed:', err)
        showToast('Copy failed', true)
      }
    }

    const viewAsMarkdown = () => {
      if (markdownSource.value) {
        const blob = new Blob([markdownSource.value], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    }

    const updateButtonState = (copied: boolean) => {
      if (!widgetEl) return
      const trigger = widgetEl.querySelector('.copy-page-trigger')
      const icon = widgetEl.querySelector('.copy-page-icon')
      const label = widgetEl.querySelector('.copy-page-label')

      if (copied) {
        trigger?.classList.add('copied')
        if (icon) icon.innerHTML = checkIconSvg
        if (label) label.textContent = 'Copied!'
      } else {
        trigger?.classList.remove('copied')
        if (icon) icon.innerHTML = copyIconSvg
        if (label) label.textContent = 'Copy page'
      }
    }

    const createWidget = () => {
      // Find h1 title
      const h1 = document.querySelector('.vp-page-content h1') as HTMLHeadingElement
      if (!h1) return null

      // Remove existing widget
      const existing = document.querySelector('.copy-page-container')
      if (existing) existing.remove()

      // Create container
      const container = document.createElement('div')
      container.className = 'copy-page-container'

      // Create widget HTML
      container.innerHTML = `
        <div class="copy-page-widget">
          <button class="copy-page-trigger" title="Copy page options">
            <span class="copy-page-icon">${copyIconSvg}</span>
            <span class="copy-page-label">Copy page</span>
          </button>
          <div class="copy-page-menu" style="display: none;">
            <button class="copy-page-menu-item" data-action="copy">
              <span class="menu-item-icon">${copyIconSvg}</span>
              <span class="menu-item-text">
                <span class="menu-item-title">Copy page</span>
                <span class="menu-item-desc">Copy page as Markdown for LLMs</span>
              </span>
            </button>
            <button class="copy-page-menu-item" data-action="view">
              <span class="menu-item-icon">${fileIconSvg}</span>
              <span class="menu-item-text">
                <span class="menu-item-title">View as Markdown</span>
                <span class="menu-item-desc">View this page as plain text</span>
              </span>
            </button>
          </div>
        </div>
      `

      // Insert after h1
      h1.after(container)
      widgetEl = container

      // Setup event listeners
      const trigger = container.querySelector('.copy-page-trigger') as HTMLButtonElement
      const menu = container.querySelector('.copy-page-menu') as HTMLDivElement

      trigger?.addEventListener('click', (e) => {
        e.stopPropagation()
        const isVisible = menu.style.display !== 'none'
        menu.style.display = isVisible ? 'none' : 'block'
      })

      container.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
        menu.style.display = 'none'
        copyAsMarkdown()
      })

      container.querySelector('[data-action="view"]')?.addEventListener('click', () => {
        menu.style.display = 'none'
        viewAsMarkdown()
      })

      // Click outside to close
      document.addEventListener('click', () => {
        menu.style.display = 'none'
      })

      // ESC to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          menu.style.display = 'none'
        }
      })

      return container
    }

    const getPagePath = () => window.location.pathname

    onMounted(() => {
      mounted.value = true
      pagePath.value = getPagePath()

      if (shouldShow.value) {
        // Wait for DOM to be ready
        setTimeout(() => {
          createWidget()
        }, 100)
      }

      // Handle route changes
      window.addEventListener('popstate', () => {
        pagePath.value = getPagePath()
        if (shouldShow.value) {
          setTimeout(() => createWidget(), 100)
        }
      })
    })

    onUnmounted(() => {
      widgetEl?.remove()
    })

    return () => null // Render nothing, widget is inserted via DOM
  }
})

export default CopyPageWidget
