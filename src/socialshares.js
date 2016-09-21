import objectAssign from 'object-assign'
import domready from 'domready'
import * as services from './services'
import * as defaultIcons from './icons'
import styles from './socialshares.css'

const socialshares = {}
const initialButtons = {}
let stylesInjected = false

// Default Options
socialshares.config = {
  url: null,
  title: null,
  text: null,
  size: 'medium',
  theme: 'light',
  icononly: false,
  icons: defaultIcons,
  responsive: true,
  dialog: {
    width: 680,
    height: 450,
  },
}

// Method to allow configuring socialshares
// This will merge into socialshares.config
socialshares.configure = (config) => {
  objectAssign(socialshares.config, config)

  return socialshares.config
}

// Identifies the service based on the button's class
// and returns the metadata for that service.
function getService (classList) {
  let service

  Object.keys(services).forEach(key => {
    if (classList.contains('socialshares-' + key)) {
      service = services[key]
      service.name = key
    }
  })

  return service
}

// Get Page Meta Description
function getPageDescription () {
  let meta = document.querySelector('meta[name="description"]')
  return meta ? meta.getAttribute('content') : null
}

// Popup window helper
function openDialog (url) {
  const width = socialshares.config.dialog.width
  const height = socialshares.config.dialog.height

  // Center the popup
  const top = (window.screen.height / 2 - height / 2)
  const left = (window.screen.width / 2 - width / 2)

  window.open(url, 'Share', `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`)
}

socialshares.mount = (selector = '.socialshares') => {
  domready(() => {
    // Querying all sets of buttons allows embedding
    // socialshares multiple times on the same page.
    let buttons = document.querySelectorAll(selector)

    if (!buttons) return

    // Inject styles
    if (!stylesInjected) {
      styles.use()
      stylesInjected = true
    }

    for (let i = 0; i < buttons.length; i++) {
      let btnSet = buttons[i]

      // Add base class
      if (!btnSet.classList.contains('socialshares')) {
        btnSet.classList.add('socialshares')
      }

      // Store initial DOM for unmount()
      if (!initialButtons[selector]) {
        initialButtons[selector] = []
      }
      initialButtons[selector][i] = {
        element: btnSet,
        markup: btnSet.innerHTML,
      }

      // Remove whitespace between buttons
      // This allows more control over styling
      // http://stackoverflow.com/a/27841683/4958776
      btnSet.innerHTML = btnSet.innerHTML.replace(/>\s+</g, '><')

      // Config

      let url = btnSet.getAttribute('data-url') || socialshares.config.url || window.location.href
      let title = btnSet.getAttribute('data-title') || socialshares.config.title || document.title
      let text = btnSet.getAttribute('data-text') || socialshares.config.text || getPageDescription()
      let size = btnSet.getAttribute('data-size') || socialshares.config.size
      let theme = btnSet.getAttribute('data-theme') || socialshares.config.theme
      let icononly = btnSet.getAttribute('data-icononly') === '' || btnSet.getAttribute('data-icononly') === 'true' || socialshares.config.icononly
      let responsive
      if (btnSet.getAttribute('data-responsive') === 'false') {
        responsive = false
      } else if (btnSet.getAttribute('data-responsive') === '' || btnSet.getAttribute('data-responsive') === 'true') {
        responsive = true
      } else {
        responsive = socialshares.config.responsive
      }

      // Buttons

      let btns = btnSet.querySelectorAll('div[class^="socialshares-"]')
      let hiddenServices = []

      for (let i = 0; i < btns.length; i++) {
        let btn = btns[i]

        let service = getService(btn.classList)

        if (service.name !== 'more') {
          hiddenServices.push(service.name)
        }

        let icon = socialshares.config.icons[service.name]
        if (service.name === 'reddit') {
          icon = socialshares.config.icons.reddit[theme === 'light' ? 'color' : 'default']
        }
        let icononlyBtn = btn.getAttribute('data-icononly') === '' || icononly
        let label = btn.getAttribute('data-label') || service.action
        let via = btn.getAttribute('data-via')
        let shareUrl = service.makeUrl({url, title, text, via, hiddenServices})

        // Base classname
        btn.classList.add('socialshares-btn')

        // Configurable modifier classnames
        btn.classList.add(`socialshares-btn-${size}`)
        btn.classList.add(`socialshares-btn-${theme}`)
        if (icononlyBtn) btn.classList.add('socialshares-btn-icononly')

        btn.setAttribute('role', 'button')
        btn.setAttribute('tabindex', '0')

        btn.addEventListener('click', () => {
          openDialog(shareUrl)
        })

        // Buttons should be activated by the space bar and enter key
        // Source: http://www.last-child.com/keyboard-accessibility-with-the-space-bar/
        btn.addEventListener('keyup', event => {
          if (event.keyCode !== 32 && event.keyCode !== 13) return
          openDialog(shareUrl)
        })

        btn.innerHTML = `
          <span class="socialshares-btn-icon" role="presentation">${icon}</span>
          <span class="socialshares-btn-text">${label}</span>
        `
      }

      // Weird bug in Safari requires a forced repaint of the layout after
      // adding or removing the socialshares-btn-icononly classname.
      // http://stackoverflow.com/a/3485654
      const forceRepaint = element => {
        element.style.display = 'none'
        element.offsetHeight
        element.style.display = ''
      }

      // Shows or hides the label depending on if there is enough space
      const makeResponsive = () => {
        let isOverflowing = () => (btnSet.offsetWidth < btnSet.scrollWidth)

        // Hide Labels
        if (isOverflowing()) {
          for (let i = btns.length - 1; i >= 0; i--) {
            let btn = btns[i]

            if (!btn.classList.contains('socialshares-btn-icononly')) {
              btn.classList.add('socialshares-btn-icononly')
              forceRepaint(btn)
              if (!isOverflowing()) break
            }
          }
        }

        // Show Labels
        if (!isOverflowing()) {
          for (let i = 0; i < btns.length; i++) {
            let btn = btns[i]

            if (!btn.hasAttribute('data-icononly') && btn.classList.contains('socialshares-btn-icononly')) {
              btn.classList.remove('socialshares-btn-icononly')
              forceRepaint(btn)
              if (isOverflowing()) {
                btn.classList.add('socialshares-btn-icononly')
                forceRepaint(btn)
                break
              }
            }
          }
        }
      }

      initialButtons[selector][i].handleResize = () => {
        // Debounced
        // https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
        clearTimeout(initialButtons[selector][i].resizeTimeout)
        initialButtons[selector][i].resizeTimeout = setTimeout(makeResponsive, 250)
      }

      if (responsive && !icononly) {
        makeResponsive()

        window.addEventListener('resize', initialButtons[selector][i].handleResize)
      }
    }
  })
}

socialshares.unmount = (selector = '.socialshares') => {
  domready(() => {
    if (!Object.keys(initialButtons).length) return

    initialButtons[selector].forEach(btnSet => {
      let responsive = btnSet.element.getAttribute('data-responsive') === '' || btnSet.element.getAttribute('data-responsive') === 'true' || socialshares.config.responsive
      btnSet.element.innerHTML = btnSet.markup
      if (responsive) {
        window.removeEventListener('resize', btnSet.handleResize)
      }
    })
  })
}

socialshares.removeStyles = () => {
  if (stylesInjected) {
    styles.unuse()
    stylesInjected = false
  }
}

// Initialize
socialshares.mount()

export const config = socialshares.config
export const configure = socialshares.configure
export const mount = socialshares.mount
export const unmount = socialshares.unmount
export const removeStyles = socialshares.removeStyles

export default socialshares
