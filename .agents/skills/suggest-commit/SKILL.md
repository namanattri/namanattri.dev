---
name: suggest-commit
description: Suggest a Commitizen conventional commit message for the current changes without staging or committing.
---

# Suggest commit

Inspect the staged diff first. If nothing is staged, inspect the working tree diff and relevant untracked files. Base the suggestion only on changes you can see; ask for the intended change if the diff does not establish it.

Return one message in Commitizen's Conventional Commits format: `type(scope): imperative summary`. Omit `(scope)` when no useful scope is clear. Use a standard type such as `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `ci`. Keep the subject concise and add a body or `BREAKING CHANGE:` footer only when the change warrants it. Do not change Git state.
