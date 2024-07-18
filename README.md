# Quick Start Commands

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