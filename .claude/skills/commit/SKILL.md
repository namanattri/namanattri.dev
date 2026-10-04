---
name: commit
description: Make a Commitizen commit of the intended changes in this repository, without pushing.
---

# Commit

Run `graphify update .` from the repository root before staging any changes. If it fails, fix the cause and retry before committing. Then inspect Git status, the staged and unstaged diffs, and untracked files. Stage intended tracked and untracked changes, including Graphify output. Use `git add -A` when all working tree changes belong in the commit; otherwise name the intended paths explicitly and preserve unrelated edits. Review the staged diff, including newly added files, before choosing a Commitizen Conventional Commits type, optional scope, and concise imperative summary. If there is no change to commit, report that and stop.

Use `cz commit` to create the commit. If Commitizen is missing, tell the user how to install it and stop rather than silently switching to a different commit workflow. The repository's pre-commit hook also runs `graphify update .`; if it fails, fix the cause before retrying and do not bypass the hook. Report the resulting commit hash and message.
