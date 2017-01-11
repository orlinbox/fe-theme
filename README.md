# FE Theme
* version: 3.0.0

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

* Compare (diff) a single line in git (suitable for compressed CSS)

```
$ git diff --word-diff
```

## Version history

* 3.0.0 - npm as a build tool
* 2.0.0 - added foundation (grid only)
* 1.0.0 - cloned from FFW theme and removed Susy
* 0.1.6 - added default print styles
* 0.1.5 - added "ellipsis" class and extend (for single line)
* 0.1.4 - added default styles for inputs and buttons
* 0.1.3 - added "clearfix" class and extend
* 0.1.2 - added "startup guide"
* 0.1.0 - initial structure and files
