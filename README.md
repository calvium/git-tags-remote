# git-tags-remote
> Get remote repository tags.

Inspired by [remote-git-tags](https://github.com/sindresorhus/remote-git-tags) and [node-git-tags](https://github.com/bfricka/node-git-tags). Allows any type of remote repository, including repositories accessed through SSH or private repositories. If `git ls-remote --tags` works for you, so will this.

Many thanks to [sh0ji](https://github.com/sh0ji)

## Install
Install with `npm` or `yarn` as usual.

Note that a [git binary and command line interface](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is a prerequisite.

## Usage
```javascript
const gitTagsRemote = require('git-tags-remote');

gitTagsRemote.getAll('git@github.com:sh0ji/focus-rover.git')
    .then(tags => console.log(JSON.stringify(tags)));
// => ["v1.0.0-rc.1", "v1.0.1-rf.2"]
```

## API
`.get(gitUrl)`  
`.getAll(gitUrl)`
 
Returns a `Promise<Array<string>>` with Git tag names as strings.

 * `get` returns only semver compatible tags.
 * `getAll` returns all tags.
 * `gitUrl` must be a [valid git url](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a).  
      e.g. `'https://github.com/sh0ji/git-tags-remote.git'` is valid but `'github.com/sh0ji/git-tags-remote'` is not.

`.latest(gitUrl)`  
Returns a `Promise<string>` with the latest git tag name.
    e.g. `'v1.0.0-rc.2'`
