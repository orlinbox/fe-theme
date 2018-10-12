# FE Theme - Bootstrap + Fontawesome
* version: 1.0

## Browser support

* IE10+

## Current software requirements

* git
* node.js
* npm
* gulp 4

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

* Switch to bootstrap branch

```
$ git checkout bootstrap
```

* IMPORTANT: remove the local repo by removing the .git directory. You do NOT want to commit to this repo.

```
$ rm -rf .git
```

* Install Gulp related stuff as a super user. You might need to change "sudo" according to your OS.

```
$ sudo npm install
```

* Start work

```
$ gulp watch
```

## Tips

* Check Bootstrap 4 documentation
* Compare (diff) a single line in git (suitable for compressed CSS)

```
$ git diff --word-diff
```

* If you plan to use SVGs in the project, you should consider using [SVGO](https://github.com/svg/svgo)
