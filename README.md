# FE Theme - NPM as a build tool
* version: 1.0

## Browser support

* IE9+

## Current software requirements

* git
* node.js
* npm
* grunt 1.0.1

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

* Switch to grunt branch

```
$ git checkout grunt
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

* If you plan to use SVGs in the project, you should consider using [SVGO](https://github.com/svg/svgo)
