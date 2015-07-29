# Share Buttons

Share Buttons is a project that aims to speed up the web by removing the need for Twitter's, Facebook's, or Google+'s external JavaScript that developers copy-and-paste into their web pages.

The solution is that these social services provide share URLs that you can use to create your own lightweight buttons. Share Buttons provides a consistent and clean look, while only needing a single CSS and JS file.

## Demo

You can view and interact with the [demo on CodePen](http://codepen.io/sunnysingh/pen/OPxbgq).

## Install

Available through [Bower](http://bower.io/):

```
bower install share-buttons
```

You can also [download all the files](https://github.com/sunnysingh/share-buttons/archive/master.zip).

## Documentation

### CSS

Include `share-buttons.css` file in the `build` folder (or @import if using Less):

```html
<!-- Inlude in <head> tag -->
<link rel="stylesheet" href="build/css/share-buttons.css" />
```

The `share-buttons.css` file includes social icons, which come from the `fonts` folder. You can use the `share-buttons-no-icons.css` file if you are using your own icons or want text-only buttons.

### JS

If you want the sharing URL to open in a popup window/dialog, you can include the `share-buttons.js` file. This is pure JavaScript that does not rely on any framework, but may not work in older browsers. You can include the `share-buttons.jquery.js` file if you're using jQuery.

```html
<!-- Include before </body> closing tag -->
<script src="build/js/share-buttons.js"></script>
```

### Markup

The least amount of markup required for a button:

```html
<!-- Default share button -->
<a class="share-btn share-btn-{SHARE_SERVICE}" href="{SHARE_URL}">
	<!-- Share icon -->
	<span class="share-btn-icon"></span>
	<!-- Share text -->
	<span class="share-btn-text">Share</span>
</a>
```

As you can see, it's simply an anchor tag with the `href` attribute linking to the share URL of the service.

The `share-btn-{SHARE_SERVICE}` class is used to show the proper icon and `{SHARE_URL}` is the sharing URL for the service.
You can find the list of services along with their share URLs below:

* Twitter (share-btn-twitter): `https://twitter.com/share?url=`
* Facebook (share-btn-facebook): `https://www.facebook.com/sharer/sharer.php?u=`
* Google+ (share-btn-googleplus): `https://plus.google.com/share?url=`
* Reddit (share-btn-reddit): `http://www.reddit.com/submit?url=`
* Tumblr (share-btn-tumblr): `http://www.tumblr.com/share/link?url=`
* LinkedIn (share-btn-linkedin): `https://www.linkedin.com/shareArticle?mini=true&url=`
* Pinterest (share-btn-pinterest): `https://www.pinterest.com/pin/create/button/?url=`
* Delicious (share-btn-delicious): `https://delicious.com/save?v=5&noui&jump=close&url=`

Your page's URL typically goes after the `url=` part, and must be encoded. This can be done manually via an [Online URl Encoder](http://devotter.com/uri-encoder).

#### Button classes

You can change the way the buttons look with classes. Just add one or more of the following classes to the `a` tag:

* `share-btn-sm` or `share-btn-lg` for different sizes.
* `share-btn-branded` for a colorized button.
* `share-btn-inverse` for a dark-scheme.

If you want to make a button that only shows the icon (no text), make sure to use the following markup for the text span:
```html
<span class="share-btn-text-sr">Share</span>
```

This way, the buttons stay accessible to screen reader users.

## Browser Support

Tested on all modern browsers, including Internet Explorer 9+.

## Changelog

[v1.0.1](https://github.com/sunnysingh/share-buttons/releases/tag/v1.0.1): Mar 15, 2015 - Mobile bug fixes and icon-only buttons in demo.

[v1.0.0](https://github.com/sunnysingh/share-buttons/releases/tag/v1.0.0): Feb 18, 2015 - First version release!

## Contributing

The best way to contribute is to fork the [CodePen demo](http://codepen.io/sunnysingh/pen/OPxbgq) and test any changes that you want to make.

The CSS is coded in [Less](http://lesscss.org/), thus I prefer that any pull requests are already added to the Less source files. Also, keep the code clean and similar to how it currently is. I'm looking for volunteers that want to fork the project into [Sass](http://sass-lang.com/). Both versions will be maintained.

If you don't want to bother with Git or Less, just [send me](https://sunnyis.me/contact/) your forked pen or hosted code/demo.

## Issues

Feel free to [open an issue](https://github.com/sunnysingh/share-buttons/issues/new) and I'll try to answer ASAP.