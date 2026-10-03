---
name: commit
description: Make a Commitizen commit of the intended changes in this repository, without pushing.
---

# Commit

Run `graphify update .` from the repository root before staging any changes. If it fails, fix the cause and retry before committing. Then inspect Git status and the staged and unstaged diffs. Stage only the intended changes, including relevant Graphify output; preserve unrelated edits. Choose a Commitizen Conventional Commits type, optional scope, and concise imperative summary based on the staged changes. If there is no change to commit, report that and stop.

Use `cz commit` to create the commit. If Commitizen is missing, tell the user how to install it and stop rather than silently switching to a different commit workflow. The repository's pre-commit hook also runs `graphify update .`; if it fails, fix the cause before retrying and do not bypass the hook. Report the resulting commit hash and message.
