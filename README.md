# FE Theme - NPM as a build tool
* version: 1.0

## Browser support

* IE9+

## Current software requirements

* git
* node.js
* npm

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

* Switch to npm branch

```
$ git checkout npm
```

* IMPORTANT: remove the local repo by removing the .git directory. You do NOT want to commit to this repo.

```
$ rm -rf .git
```

* Install npm modules as a super user. You might need to change "sudo" according to your OS.

```
$ sudo npm install
```

* Start work

```
$ npm run watch
```

## Tips

* Check styleguide.html for quick startup
* See all the available npm commands (scripts) in package.json
* Compare (diff) a single line in git (suitable for compressed CSS)

```
$ git diff --word-diff
```

* If you plan to use SVGs in the project, you should consider using [SVGO](https://github.com/svg/svgo)
