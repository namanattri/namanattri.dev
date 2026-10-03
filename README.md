# Quick Start Commands

## Commit workflow

The project-local Codex skills `$suggest-commit`, `$commit`, and `$commit-n-push` (also available in Claude as slash skills) use Commitizen messages. Install the command-line tools if needed, then enable the tracked pre-commit hook once per clone:

```sh
uv tool install commitizen
uv tool install graphifyy
git config core.hooksPath .githooks
```

The commit skills run `graphify update .` before staging so relevant Graphify output can be reviewed and committed with the other changes. The hook runs it again before every commit, including direct Git commits, and stops the commit if the update fails.

Start hugo development server

```sh
hugo server
```

Add content

```sh
hugo new content content/posts/my-first-post.md
```

Including Draft Content

```sh
hugo server --buildDrafts
hugo server -D
```

Publish the site

```sh
hugo
```

# Basic Usage

```sh
hugo version
hugo help
hugo server --help

# following commands don't clear public directory, it overwrites, so manually clear at subsequent builds
hugo # build site
hugo --destination # publishDir in config: alternative to public/ dir

# manual clearing of public/ dir will be required after these commands
hugo --buildDraft
hugo -D
hugo --buildExpire
hugo -E
hugo --buildFuture
hugo -F

# automatic redirect to last modified
hugo server --navigateToChanged
```
