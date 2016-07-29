import merge from 'lodash.merge';
import domready from 'domready';
import * as services from './services';
import style from './socialshares.css';

const socialshares = {};

let initialButtons = [];
let makeResponsive;

// Default Options
socialshares.config = {
    url: null,
    title: null,
    text: null,
    size: 'medium',
    theme: 'light',
    icononly: false,
    responsive: true,
    dialog: {
        width: 650,
        height: 450,
    },
    initialize: true,
};

// Method to allow configuring socialshares
// This will merge into socialshares.config
socialshares.configure = (config) => {
    merge(socialshares.config, config);
};

// Identifies the service based on the button's class
// and returns the metadata for that service.
function getService (classList) {
    let service;

    Object.keys(services).forEach(key => {
        if (classList.contains('socialshares-'+key)) {
            service = services[key];
            service.name = key;
        }
    });

    return service;
}

// Get Page Meta Description
function getPageDescription () {
    let meta = document.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') : null;
}

// Popup window helper
function openDialog (url) {
    let width  = socialshares.config.dialog.width;
    let height = socialshares.config.dialog.height;

    // Center the popup
    let top = (screen.height / 2 - height / 2);
    let left = (screen.width / 2 - width / 2);

    window.open(url, 'Share', `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`);
}

socialshares.mount = () => {

    // Querying all sets of buttons allows embedding
    // socialshares multiple times on the same page.
    let buttons = document.querySelectorAll('.socialshares');

    if (!buttons) return;

    // Inject styles
    style.use();

    for (let btnSet of buttons) {

        // Store initial DOM for unmount()
        initialButtons.push({
            element: btnSet,
            markup: btnSet.innerHTML,
        });

        // Remove whitespace between buttons
        // This allows more control over styling
        // http://stackoverflow.com/a/27841683/4958776
        btnSet.innerHTML = btnSet.innerHTML.replace(/>\s+</g,'><');

        // Config

        let url = btnSet.getAttribute('data-url') || socialshares.config.url || location.href;
        let title = btnSet.getAttribute('data-title') || socialshares.config.title || document.title;
        let text = btnSet.getAttribute('data-text') || socialshares.config.text || getPageDescription();
        let size = btnSet.getAttribute('data-size') || socialshares.config.size;
        let theme = btnSet.getAttribute('data-theme') || socialshares.config.theme;
        let icononly = btnSet.getAttribute('data-icononly') === '' || socialshares.config.icononly;

        // Buttons

        let btns = btnSet.querySelectorAll('div[class^="socialshares-"]');

        for (let btn of btns) {

            let service = getService(btn.classList);
            let icon = require(`./icons/${service.name}.svg`);
            if (service.name === 'reddit' && theme === 'light') {
                icon = require(`./icons/reddit-color.svg`);
            }
            let label = btn.getAttribute('data-label') || service.action;
            let shareUrl = service.makeUrl({url, title, text});

            // Base classname
            btn.classList.add('socialshares-btn');

            // Configurable modifier classnames
            btn.classList.add(`socialshares-btn-${size}`);
            btn.classList.add(`socialshares-btn-${theme}`);
            if (icononly) btn.classList.add('socialshares-btn-icononly');

            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');

            btn.addEventListener('click', () => {
                openDialog(shareUrl);
            });

            // Buttons should be activated by the space bar and enter key
            // Source: http://www.last-child.com/keyboard-accessibility-with-the-space-bar/
            btn.addEventListener('keyup', event => {
                if (event.keyCode !== 32 && event.keyCode !== 13) return;
                openDialog(shareUrl);
            });

            btn.innerHTML = `
                <span class="socialshares-btn-icon" role="presentation">${icon}</span>
                <span class="socialshares-btn-text">${label}</span>
            `;

        }

        // Shows or hides the label depending on if there is enough space
        makeResponsive = () => {
            let isOverflowing = () => (btnSet.offsetWidth < btnSet.scrollWidth);

            // Hide Labels
            if (isOverflowing()) {
                for (let i = btns.length - 1; i >= 0; i--) {
                    let btn = btns[i];

                    if (!btn.classList.contains('socialshares-btn-icononly')) {
                        btn.classList.add('socialshares-btn-icononly');
                        if (!isOverflowing()) break;
                    }
                }
            }

            // Show Labels
            if (!isOverflowing()) {
                for (let i = 0; i < btns.length; i++) {
                    let btn = btns[i];

                    if (btn.classList.contains('socialshares-btn-icononly')) {
                        btn.classList.remove('socialshares-btn-icononly');
                        if (isOverflowing()) {
                            btn.classList.add('socialshares-btn-icononly');
                            break;
                        }
                    }
                }
            }
        }

        if (socialshares.config.responsive && !icononly) {
            makeResponsive();
            window.addEventListener('resize', makeResponsive);
        }

    }

};

socialshares.unmount = () => {
    if (!initialButtons.length) return;

    style.unuse();

    if (socialshares.config.responsive) {
        window.removeEventListener('resize', makeResponsive);
    }

    for (let buttons of initialButtons) {
        buttons.element.innerHTML = buttons.markup;
    }
};

// Initialize
if (socialshares.config.initialize) {
    domready(socialshares.mount);
}

export default socialshares;
