# FE Theme
* version: 2.0.0

## Current software requirements

* git
* node.js
* npm
* grunt 0.4.5
* sass 3.4.13
* compass 1.0.3

## Browser support

* IE9+

## Startup guide

* Check software requirements (listed above)
* Clone this repo in the desired directory

```
$ git clone git@github.com:orlinbox/fe-theme.git fe
```

* Enter the directory

```
$ cd fe
```

* IMPORTANT: remove the local repo by removing the .git directory. You do NOT want to commit to this repo.

```
$ rm -rf .git
```

* Install Grunt related stuff as a super user. You might need to change "sudo" according to your OS.

```
$ sudo npm install
```

* Start work

```
$ grunt watch
```

## Tips

* Check styleguide.html for quick startup
* Compare (diff) a single line in git (suitable for compressed CSS)

```
$ git diff --word-diff
```

* If you plan to use SVGs in the project, you should consider using [SVGO](https://github.com/svg/svgo), which is also available as a [Grunt task](https://github.com/sindresorhus/grunt-svgmin). Another solution for images is [Grunticon](https://github.com/filamentgroup/grunticon).

## Version history

* 2.0.0 - added Zurb Foundation v6.3.0 (grid only)
* 1.0.0 - cloned from FFW theme and removed Susy
* 0.1.6 - added default print styles
* 0.1.5 - added "ellipsis" class and extend (for single line)
* 0.1.4 - added default styles for inputs and buttons
* 0.1.3 - added "clearfix" class and extend
* 0.1.2 - added "startup guide"
* 0.1.0 - initial structure and files
