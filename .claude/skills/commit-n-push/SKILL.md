---
name: commit-n-push
description: Make a Commitizen commit and push it to the remote branch with the same name as the current branch.
---

# Commit and push

Read and follow [the commit skill](../commit/SKILL.md) to inspect, stage, and create the Commitizen commit. Do not push if the commit fails.

After committing, identify the current local branch. Use its upstream remote when configured; otherwise use the repository's sole remote. If the remote is ambiguous, ask which one to use. Push with `git push <remote> HEAD:refs/heads/<branch>` so the destination branch has the same name as the local branch. Never force push. Report the commit hash and remote branch, or the push failure if one occurs.
