# sloppy-scroll

## TL;DR

Smooth scrolling to an anchor tag on the same webpage.

It does **not have any other dependencies**, so there is absolutely no need to burden your webpage with something like jQuery if you just need some nice scrolling on your "one page app" website.

## Working example

A very simple example to demonstrate [sloppyscrolling](http://sloppyscroll.surge.sh)

## Usage

### Include it in your project

`npm install sloppy-scroll`

You can then either include the js file directly in your markup:

`<script src="node_modules/sloppy-scroll/dist/sloppy-scroll.min.js"></script>`

or use something like webpack, browserify, sprockets etc.

### Use it

You need a link and a target to scroll to, something like this:

```
<a href="#somewhere" data-sloppy-scroll>Scroll somewhere</a>
.
.
.
<div id="somewhere">...</div>
```

and then initialize the scrolling:

`window.sloppyscroll.init()`

## What's next?

There is currently no way to customize any of the behaviour, like speed and the like. This will be added very soon.
Otherwise: Feel free to suggest improvements!

