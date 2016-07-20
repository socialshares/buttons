import merge from 'lodash.merge';
import domready from 'domready';
import * as services from './services';

const socialshares = {};

// Default Options
socialshares.options = {
    url: location.href,
    title: document.title,
    text: null,
    size: 'medium',
    dialog: {
        width: 650,
        height: 450,
    },
    initialize: true,
};

// Method to let users configure socialshares
// This will merge into socialshares.options
socialshares.config = (options) => {
    merge(socialshares.options, options);
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

// Constructs the share URL
function makeUrl (service, params) {
    params.url   = encodeURIComponent(params.url);
    params.title = encodeURIComponent(params.title);
    params.text  = encodeURIComponent(params.text);

    // TODO: Allow fetching URL format from services.js
    switch (service) {
        case 'twitter':
            return 'https://twitter.com/share?url='+params.url+'&text='+params.text;
        break;
        case 'facebook':
            return 'https://www.facebook.com/sharer/sharer.php?u='+params.url;
        break;
        case 'googleplus':
            return 'https://plus.google.com/share?url='+params.url;
        break;
        // TODO: Add rest of services...
        case 'slack':
            return 'http://slackbutton.herokuapp.com/post/new/?url='+params.url;
        break;
        case 'vk':
            return 'http://vk.com/share.php?url='+params.url+'&title='+params.title+'&description='+params.text;
        break;
        case 'email':
            return 'mailto:?subject='+params.title+'&description='+params.text;
        break;
    }
}

// Get Page Meta Description
function getPageDescription () {
    let meta = document.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') : null;
}

// Popup window helper
function openDialog (url) {
    let width  = socialshares.options.dialog.width;
    let height = socialshares.options.dialog.height;
    window.open(url, 'Share', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
}

socialshares.load = () => {

    // Querying all sets of buttons allows embedding
    // socialshares multiple times on the same page.
    let buttons = document.querySelectorAll('.socialshares');

    if (!buttons) return;

    for (let btnSet of buttons) {

        // Remove whitespace between buttons
        // This allows more control over styling
        // http://stackoverflow.com/a/27841683/4958776
        btnSet.innerHTML = btnSet.innerHTML.replace(/>\s+</g,'><');

        // Config

        let url = btnSet.getAttribute('data-url') || socialshares.options.url;
        let title = btnSet.getAttribute('data-title') || socialshares.options.title;
        let text = btnSet.getAttribute('data-text') || socialshares.options.text || getPageDescription();
        let size = btnSet.getAttribute('data-size') || socialshares.options.size;

        // Buttons

        let btns = btnSet.querySelectorAll('div[class^="socialshares-"]');

        for (let btn of btns) {

            let service = getService(btn.classList);
            let icon = require(`./icons/${service.name}.svg`);
            let label = btn.getAttribute('data-label') || service.action;
            let shareUrl = makeUrl(service.name, {
                url:   url,
                title: title,
                text:  text,
            });

            btn.classList.add('socialshares-btn', `socialshares-btn-${size}`);

            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');

            btn.addEventListener('click', () => {
                openDialog(shareUrl);
            });

            btn.addEventListener('keyup', event => {
                // Space and enter keys
                if (event.keyCode !== 32 && event.keyCode !== 13) return;
                openDialog(shareUrl);
            });

            btn.innerHTML = `
                <span class="socialshares-btn-icon" role="presentation">${icon}</span>
                <span class="socialshares-btn-text">${label}</span>
            `;

        }

        function makeResponsive () {
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

            // Returning self allows calling the function and binding
            // it to the window resize event at the same time.
            return makeResponsive;
        }

        window.addEventListener('resize', makeResponsive());

    }

};

// CSS
// TODO: Have a build that swaps this CSS out
//       if user wants to load it separately.
require('./buttons.css');

// Initialize
if (socialshares.options.initialize) {
    domready(socialshares.load);
}

export default socialshares;
