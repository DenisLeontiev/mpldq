# Code style

Сode writing rules

## BEM
### Classname
Classes of layouts must be brought to this form:

```html
<class="view-[name]">
```
where `[name]` is the name of the layout.
### Nesting Elements
Nested elements are declared according to the scheme:
```html
<div class="view-item">
   <div class="view-item__title">Some title</div>
   <div class="view-item__caption">Some caption</div>
</div>
```
### Modifications
```html
<div class="view-item view-item--large">
   <div class="view-item__title view-item__title--white">Some title</div>
   <div class="view-item__caption">Some caption</div>
</div>
```

### Elements that have JS events
Template: ```js-[actions]```.

```html
<div class="button button--default js-pick-size"></div>
```

## SCSS
### Folder hierarchy
* __scss__
  * __base__ - basic / global rules
  * __components__ - site components, for example: buttons, forms
  * __functions__ - variables, functions, and mixins
  * __layouts__ - page layouts, all parent elements ```<div class="view-[name]"></div>```
  * __vendor__ - external rules

### File names
Files should be named according to existing examples.

### Use id
Try to avoid using the __id selector__. If you have resorted to the __id selector__ - review your markup, most likely you made a mistake.

### Formatting
* Use soft tabs (2 spaces) for indentation.
* Prefer dashes over camelCasing in class names.
  * Underscores and PascalCasing are okay if you are using BEM.
* Do not use ID selectors.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace { in rule declarations.
* In properties, put a space after, but not before, the : character.
* Put closing braces } of rule declarations on a new line.
* Put blank lines between rule declarations.

#### Bad
```scss
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```
#### Good

```scss
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```
### Variables
Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).

### Nested selectors
__Do not nest selectors more than three levels deep!__
```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```
When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) —OR—
* Overly specific (powerful) —OR—
* Not reusable

__Again: never nest ID selectors!__

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should never need to do this.

### Sequence of rules
Try to follow the same rules. An example sequence can be found [here](https://github.com/csscomb/csscomb.js/blob/master/config/yandex.json). 
###### There is no strict need for this rule. Just try to write everything in a single format and stick to a single style of writing code.

## JS

### Objects
* Use the literal syntax for object creation.
```javascript
// bad
let item = new Object();

// good
let item = {};
```
* Don't use reserved words as keys.
```javascript
// bad
let item = {
  default: { title: 'name' },
  private: true
};

// good
let superman = {
  defaults: { title: 'name' },
  hidden: true
};
```
* Use readable synonyms in place of reserved words.
```javascript
// bad
let proto = {
  class: 'default'
};

// good
let proto = {
  type: 'default'
};
```
### Arrays

* Use the literal syntax for array creation.
```javascript
// bad
let items = new Array();

// good
var items = [];
Use Array#push instead of direct assignment to add items to an array.

var someStack = [];


// bad
someStack[someStack.length] = 'lorem';

// good
someStack.push('lorem');
When you need to copy an array use Array#slice.

let itemsCopy = [];

// bad
for (let i = 0; i < items.length; i++) {
  itemsCopy[i] = items[i];
}

// good
itemsCopy = items.slice();
Foobar is a Python library for dealing with word pluralization.
```
### Strings

* Use single quotes '' for strings.
```javascript
// bad
let name = "Lorem Ipsum";

// good
let name = 'Lorem Ipsum';
```

* Strings longer than 100 characters should be written across multiple lines using string concatenation.
```Note: If overused, long strings with concatenation could impact performance. jsPerf & Discussion.```
```javascript
// bad
let errorMessage = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.';

// bad
let errorMessage = 'There are many variations of passages of Lorem Ipsum \
available, but the majority have suffered alteration in some form, by \
injected humour, or randomised words which dont \
 even slightly believable.';

// good
let errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
  ```

  ### Variables
* Always use var to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.
```javascript
// bad
nameFunc = new nameFunc();

// good
let nameFunc = new nameFunc();
```
* Use one let/const/var declaration per variable. It's easier to add new variable declarations this way, and you never have to worry about swapping out a ; for a , or introducing punctuation-only diffs.
```javascript
// bad
let items = getItems(),
    focusItem = true,
    itemStats = 'z';

// bad
// (compare to above, and try to spot the mistake)
let items = getItems(),
    focusItem = true;
    itemStats = 'z';

// good
let items = getItems();
let focusItem = true;
let itemStats = 'z';
```
* Declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.
```javascript
// bad
let i, len, itemStats,
    items = getItems(),
    focusItem = true;

// bad
let i;
let items = getItems();
let itemStats;
let goSportsTeam = true;
let len;

// good
let items = getItems();
let focusItem = true;
let itemStats;
let length;
let i;
```
* Assign variables at the top of their scope. This helps avoid issues with variable declaration and assignment hoisting related issues.
```javascript
// bad
function () {
  test();
  console.log('doing...');

  //..other stuff..

  let name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// good
function () {
  let name = getName();

  test();
  console.log('doing stuff..');

  //..other stuff..

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad - unnecessary function call
function () {
  let name = getName();

  if (!arguments.length) {
    return false;
  }

  this.setFirstName(name);

  return true;
}

// good
function () {
  let name;

  if (!arguments.length) {
    return false;
  }

  name = getName();
  this.setFirstName(name);

  return true;
}
# zoz
=======
# Code style

Сode writing rules

## BEM
### Classname
Classes of layouts must be brought to this form:

```html
<class="view-[name]">
```
where `[name]` is the name of the layout.
### Nesting Elements
Nested elements are declared according to the scheme:
```html
<div class="view-item">
   <div class="view-item__title">Some title</div>
   <div class="view-item__caption">Some caption</div>
</div>
```
### Modifications
```html
<div class="view-item view-item--large">
   <div class="view-item__title view-item__title--white">Some title</div>
   <div class="view-item__caption">Some caption</div>
</div>
```

### Elements that have JS events
Template: ```js-[actions]```.

```html
<div class="button button--default js-pick-size"></div>
```

## SCSS
### Folder hierarchy
* __scss__
  * __base__ - basic / global rules
  * __components__ - site components, for example: buttons, forms
  * __functions__ - variables, functions, and mixins
  * __layouts__ - page layouts, all parent elements ```<div class="view-[name]"></div>```
  * __vendor__ - external rules

### File names
Files should be named according to existing examples.

### Use id
Try to avoid using the __id selector__. If you have resorted to the __id selector__ - review your markup, most likely you made a mistake.

### Formatting
* Use soft tabs (2 spaces) for indentation.
* Prefer dashes over camelCasing in class names.
  * Underscores and PascalCasing are okay if you are using BEM.
* Do not use ID selectors.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace { in rule declarations.
* In properties, put a space after, but not before, the : character.
* Put closing braces } of rule declarations on a new line.
* Put blank lines between rule declarations.

#### Bad
```scss
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```
#### Good

```scss
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```
### Variables
Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).

### Nested selectors
__Do not nest selectors more than three levels deep!__
```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```
When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) —OR—
* Overly specific (powerful) —OR—
* Not reusable

__Again: never nest ID selectors!__

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should never need to do this.

### Sequence of rules
Try to follow the same rules. An example sequence can be found [here](https://github.com/csscomb/csscomb.js/blob/master/config/yandex.json). 
###### There is no strict need for this rule. Just try to write everything in a single format and stick to a single style of writing code.

## JS

### Objects
* Use the literal syntax for object creation.
```javascript
// bad
let item = new Object();

// good
let item = {};
```
* Don't use reserved words as keys.
```javascript
// bad
let item = {
  default: { title: 'name' },
  private: true
};

// good
let superman = {
  defaults: { title: 'name' },
  hidden: true
};
```
* Use readable synonyms in place of reserved words.
```javascript
// bad
let proto = {
  class: 'default'
};

// good
let proto = {
  type: 'default'
};
```
### Arrays

* Use the literal syntax for array creation.
```javascript
// bad
let items = new Array();

// good
var items = [];
Use Array#push instead of direct assignment to add items to an array.

var someStack = [];


// bad
someStack[someStack.length] = 'lorem';

// good
someStack.push('lorem');
When you need to copy an array use Array#slice.

let itemsCopy = [];

// bad
for (let i = 0; i < items.length; i++) {
  itemsCopy[i] = items[i];
}

// good
itemsCopy = items.slice();
Foobar is a Python library for dealing with word pluralization.
```
### Strings

* Use single quotes '' for strings.
```javascript
// bad
let name = "Lorem Ipsum";

// good
let name = 'Lorem Ipsum';
```

* Strings longer than 100 characters should be written across multiple lines using string concatenation.
```Note: If overused, long strings with concatenation could impact performance. jsPerf & Discussion.```
```javascript
// bad
let errorMessage = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.';

// bad
let errorMessage = 'There are many variations of passages of Lorem Ipsum \
available, but the majority have suffered alteration in some form, by \
injected humour, or randomised words which dont \
 even slightly believable.';

// good
let errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
  ```

  ### Variables
* Always use var to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.
```javascript
// bad
nameFunc = new nameFunc();

// good
let nameFunc = new nameFunc();
```
* Use one let/const/var declaration per variable. It's easier to add new variable declarations this way, and you never have to worry about swapping out a ; for a , or introducing punctuation-only diffs.
```javascript
// bad
let items = getItems(),
    focusItem = true,
    itemStats = 'z';

// bad
// (compare to above, and try to spot the mistake)
let items = getItems(),
    focusItem = true;
    itemStats = 'z';

// good
let items = getItems();
let focusItem = true;
let itemStats = 'z';
```
* Declare unassigned variables last. This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.
```javascript
// bad
let i, len, itemStats,
    items = getItems(),
    focusItem = true;

// bad
let i;
let items = getItems();
let itemStats;
let goSportsTeam = true;
let len;

// good
let items = getItems();
let focusItem = true;
let itemStats;
let length;
let i;
```
* Assign variables at the top of their scope. This helps avoid issues with variable declaration and assignment hoisting related issues.
```javascript
// bad
function () {
  test();
  console.log('doing...');

  //..other stuff..

  let name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// good
function () {
  let name = getName();

  test();
  console.log('doing stuff..');

  //..other stuff..

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad - unnecessary function call
function () {
  let name = getName();

  if (!arguments.length) {
    return false;
  }

  this.setFirstName(name);

  return true;
}

// good
function () {
  let name;

  if (!arguments.length) {
    return false;
  }

  name = getName();
  this.setFirstName(name);

  return true;
}
```

# 
# 

# Cornerstone
[![Build Status](https://travis-ci.org/bigcommerce/cornerstone.svg?branch=master)](https://travis-ci.org/bigcommerce/cornerstone)

Stencil's Cornerstone theme is the building block for BigCommerce theme developers to get started quickly developing premium quality themes on the BigCommerce platform.

### Stencil Utils
[Stencil-utils](https://github.com/bigcommerce/stencil-utils) is our supporting library for our events and remote interactions.

## JS API
When writing theme JavaScript (JS) there is an API in place for running JS on a per page basis. To properly write JS for your theme, the following page types are available to you:

* "pages/account/addresses"
* "pages/account/add-address"
* "pages/account/add-return"
* "pages/account/add-wishlist"
* "pages/account/recent-items"
* "pages/account/download-item"
* "pages/account/edit"
* "pages/account/return-saved"
* "pages/account/returns"
* "pages/account/payment-methods"
* "pages/auth/login"
* "pages/auth/account-created"
* "pages/auth/create-account"
* "pages/auth/new-password"
* "pages/blog"
* "pages/blog-post"
* "pages/brand"
* "pages/brands"
* "pages/cart"
* "pages/category"
* "pages/compare"
* "pages/errors"
* "pages/gift-certificate/purchase"
* "pages/gift-certificate/balance"
* "pages/gift-certificate/redeem"
* "global"
* "pages/home"
* "pages/order-complete"
* "pages/page"
* "pages/product"
* "pages/search"
* "pages/sitemap"
* "pages/subscribed"
* "pages/account/wishlist-details"
* "pages/account/wishlists"

These page types will correspond to the pages within your theme. Each one of these page types map to an ES6 module that extends the base `PageManager` abstract class.

```javascript
    export default class Auth extends PageManager {
        constructor() {
            // Set up code goes here; attach to internals and use internals as you would 'this'
        }
    }
```

### JS Template Context Injection
Occasionally you may need to use dynamic data from the template context within your client-side theme application code.

Two helpers are provided to help achieve this.

The inject helper allows you to compose a JSON object with a subset of the template context to be sent to the browser.

```
{{inject "stringBasedKey" contextValue}}
```

To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{@inject}}` calls.

For example, to setup the product name in your client-side app, you can do the following if you're in the context of a product:

```html
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); // jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into your JavaScript

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

You can compose your JSON object across multiple pages to create a different set of client-side data depending on the currently loaded template context.

The stencil theme makes the jsContext available on both the active page scoped and global PageManager objects as `this.context`.


## Static assets
Some static assets in the Stencil theme are handled with Grunt if required. This
means you have some dependencies on grunt and npm. To get started:

First make sure you have Grunt installed globally on your machine:

```
npm install -g grunt-cli
```

and run:

```
npm install
```

Note: package-lock.json file was generated by Node version 8 and npm version 6.4.1. Although the app supports Node versions 6 and 8 as well as multiple versions of npm, we should always use those versions when updating package-lock.json, unless it is decided to upgrade those, and in this case the readme should be updated as well. If using a different version for node OR npm, please delete the package-lock.json file prior to installing node packages and also prior to pushing to github.

If updating or adding a dependency, please double check that you are working on Node version 8 and npm version 6.4.1 and run ```npm update <package_name>```  or ```npm install <package_name>``` (avoid running npm install for updating a package). After updating the package, please make sure that the changes in the package-lock.json reflect only the updated/new package prior to pushing the changes to github.


### Icons
Icons are delivered via a single SVG sprite, which is embedded on the page in
`templates/layout/base.html`. It is generated via a grunt task `grunt svgstore`.

The task takes individual SVG files for each icon in `assets/icons` and bundles
them together, to be inlined on the top of the theme, via an ajax call managed
by svg-injector. Each icon can then be called in a similar way to an inline image via:

```
<svg><use xlink:href="#icon-svgFileName" /></svg>
```

The ID of the SVG icon you are calling is based on the filename of the icon you want,
with `icon-` prepended. e.g. `xlink:href="#icon-facebook"`.

Simply add your new icon SVG file to the icons folder, and run `grunt svgstore`,
or just `grunt`.

#### License

(The MIT License)
Copyright (C) 2015-present BigCommerce Inc.
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

<<<<<<< HEAD
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
>>>>>>> Update zoz-ui
=======
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
>>>>>>> Added readme
=======
```
>>>>>>> Update readme
