# FE Theme: Bootstrap + Icons
* version: 1.0

## Browser support

* IE10+

## Current software requirements

* node.js
* npm
* gulp 4

## Startup guide

* Check software requirements (listed above)
* Clone this repo in the desired directory

```
**$** git clone -b bootstrap https://github.com/orlinbox/fe-theme.git fe
```

* Enter the directory.

```
**$** cd fe
```

* Delete the .git directory for this repo!

```
**(unix)$** rm -rf .git
**(windows)$** rd /s /q .git
```

* Install Gulp related stuff.

```
**$** npm install
```

* Start work

```
**$** gulp watch
```

## Tips

* Check Bootstrap 4 documentation for details
* Compare (diff) a single line in git (suitable for compressed CSS)

```
**$** git diff --word-diff
```

* If you plan to use SVGs in the project, you should consider using [SVGO](https://github.com/svg/svgo)
