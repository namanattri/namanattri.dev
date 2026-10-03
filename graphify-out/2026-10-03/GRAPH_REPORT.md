# Graph Report - namanattri.dev  (2026-10-03)

## Corpus Check
- 27 files · ~141,380 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .toml 1)

## Summary
- 198 nodes · 269 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 81% EXTRACTED · 15% INFERRED · 4% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1a78a2e1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Query/Path/Explain Reference
- GitHub Clone & Merge Reference
- Understanding the CAP Theorem (post)
- Extraction Spec Reference
- Step 4: Build Graph, Cluster, Analyze
- commit-n-push/SKILL.md
- Naman Attri (author/blogger)
- CA system diagram (hand-drawn distributed nodes)
- commit/SKILL.md
- AP System Diagram (hand-drawn, 5-node distributed cluster)
- Trie (post)
- Deploy Hugo site to Pages (GitHub Actions workflow)
- Add & Watch Reference
- Single server (green circle)
- blockchain.webp (hero image)
- CP (Consistency + Partition Tolerance)
- Illustration: group of friends independently writing the same thing in notebooks
- graphify knowledge graph tool
- Interpreter Guard for Subcommands
- suggest-commit/SKILL.md
- pre-commit

## God Nodes (most connected - your core abstractions)
1. `/graphify Command` - 10 edges
2. `Query/Path/Explain Reference` - 10 edges
3. `Step 4: Build Graph, Cluster, Analyze` - 10 edges
4. `CA system diagram (hand-drawn distributed nodes)` - 9 edges
5. `Understanding the CAP Theorem (post)` - 8 edges
6. `Exports & Benchmark Reference` - 8 edges
7. `Naman Attri (author/blogger)` - 8 edges
8. `Trie struct (Go)` - 7 edges
9. `Trie (post)` - 7 edges
10. `Mastering Bitwise Operators in Golang (post)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Naman Attri (author/blogger)` --shares_data_with--> `Default Post Archetype Template`  [INFERRED]
  content/posts/about-naman.md → archetypes/default.md
- `Hugo Quick Start Commands` --conceptually_related_to--> `Deploy Hugo site to Pages (GitHub Actions workflow)`  [INFERRED]
  README.md → .github/workflows/hugo.yaml
- `Hugo Quick Start Commands` --conceptually_related_to--> `Default Post Archetype Template`  [INFERRED]
  README.md → archetypes/default.md
- `MathJax Math Rendering Partial` --conceptually_related_to--> `Crash Course on Logarithms (post)`  [INFERRED]
  layouts/partials/math.html → content/posts/data-structures/logarithms/index.md
- `MathJax Math Rendering Partial` --conceptually_related_to--> `Monotonic Stack (post)`  [INFERRED]
  layouts/partials/math.html → content/posts/data-structures/monotonic-stack/index.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Structural + Semantic Extraction Merge Flow** — claude_skills_graphify_skill_step3_part_a_ast, claude_skills_graphify_skill_step3_part_b_semantic, claude_skills_graphify_skill_step3_part_c_merge, claude_skills_graphify_skill_step4_5_health_check [EXTRACTED 1.00]
- **graphify Full Build Pipeline (Steps 0-9)** — claude_skills_graphify_skill_step0_github, claude_skills_graphify_skill_step1_install, claude_skills_graphify_skill_step2_detect, claude_skills_graphify_skill_step2_5_transcribe, claude_skills_graphify_skill_step3_extract, claude_skills_graphify_skill_step4_build_graph, claude_skills_graphify_skill_step4_5_health_check, claude_skills_graphify_skill_step5_label_communities, claude_skills_graphify_skill_step6_obsidian_html, claude_skills_graphify_skill_steps_6b_8_optional_exports, claude_skills_graphify_skill_step9_cleanup [EXTRACTED 1.00]
- **Query / Path / Explain Command Family** — claude_skills_graphify_skill_graphify_query_command, claude_skills_graphify_skill_graphify_path_command, claude_skills_graphify_skill_graphify_explain_command, claude_skills_graphify_references_query_doc [EXTRACTED 1.00]
- **Distributed consistency and determinism theme** — content_posts_understanding_cap_theorem_consistency_availability_partition_tolerance_index_consistency_concept, content_posts_why_blockchains_are_designed_to_be_deterministic_index_consistency_concept, content_posts_why_blockchains_are_designed_to_be_deterministic_index_determinism_concept [INFERRED 0.75]
- **LaTeX math notation rendered via MathJax partial** — layouts_partials_math_mathjax, content_posts_data_structures_logarithms_index_post, content_posts_data_structures_monotonic_stack_index_post [INFERRED 0.75]
- **Posts following default archetype frontmatter template** — archetypes_default_template, content_posts_algorithms_bit_manipulation_bitwise_operators_in_golang_index_post, content_posts_algorithms_bit_manipulation_checking_if_nth_bit_is_set_index_post, content_posts_data_structures_monotonic_stack_index_post, content_posts_data_structures_trie_index_post, content_posts_understanding_cap_theorem_consistency_availability_partition_tolerance_index_post [INFERRED 0.85]

## Communities (21 total, 6 thin omitted)

### Community 0 - "Query/Path/Explain Reference"
Cohesion: 0.14
Nodes (21): graphify Skill Directive (.claude/CLAUDE.md), Native CLAUDE.md Integration (graphify claude install), Hooks & CLAUDE.md Integration Reference, Post-Commit Auto-Rebuild Hook, BFS Traversal Mode, DFS Traversal Mode, Query/Path/Explain Reference, graphify reflect / LESSONS.md (+13 more)

### Community 1 - "GitHub Clone & Merge Reference"
Cohesion: 0.15
Nodes (16): graphify clone Command, GitHub Clone & Merge Reference, graphify merge-graphs Command, repo Attribute on Merged Nodes, Transcribe Reference, graphify.transcribe.transcribe_all(), Whisper Model (GRAPHIFY_WHISPER_MODEL), Domain Hint Prompt (GRAPHIFY_WHISPER_PROMPT) (+8 more)

### Community 2 - "Understanding the CAP Theorem (post)"
Cohesion: 0.19
Nodes (16): AP (Availability + Partition Tolerance) trade-off, Availability (CAP theorem), Book Haven real-world example (rationale for choosing AP), CA (Consistency + Availability) trade-off, Consistency (CAP theorem), CP (Consistency + Partition Tolerance) trade-off, Partition Tolerance (CAP theorem), Understanding the CAP Theorem (post) (+8 more)

### Community 3 - "Extraction Spec Reference"
Cohesion: 0.15
Nodes (15): DEEP_MODE, Extraction Spec Reference, Hyperedges, Node ID Format Spec, Semantic Similarity Edges (semantically_similar_to), Extraction Subagent Prompt Template, Parallel Subagent Dispatch (general-purpose), GEMINI_API_KEY / GOOGLE_API_KEY (+7 more)

### Community 4 - "Step 4: Build Graph, Cluster, Analyze"
Cohesion: 0.08
Nodes (28): Token Reduction Benchmark, Exports & Benchmark Reference, FalkorDB Export, GraphML Export, graphify.serve MCP Server, Neo4j Export, SVG Export, --wiki Export (+20 more)

### Community 6 - "Naman Attri (author/blogger)"
Cohesion: 0.10
Nodes (25): Naman Attri (author/blogger), About Naman (post), Bitwise AND operator (&), Left Shift operator (<<), Bitwise NOT operator (^), Bitwise OR operator (|), Mastering Bitwise Operators in Golang (post), Right Shift operator (>>) (+17 more)

### Community 7 - "CA system diagram (hand-drawn distributed nodes)"
Cohesion: 0.33
Nodes (13): CAP theorem, Cape Town node, CA (Consistency + Availability), CA system diagram (hand-drawn distributed nodes), Unlabeled green node (bottom-middle of cluster), Unlabeled green node (top-middle of cluster), Mumbai node, Network partition (comms OK / comms NOT OK legend) (+5 more)

### Community 9 - "AP System Diagram (hand-drawn, 5-node distributed cluster)"
Cohesion: 0.29
Nodes (10): AP (Availability + Partition Tolerance), AP System Diagram (hand-drawn, 5-node distributed cluster), Cape Town node, Mumbai node, Network Partition (comms NOT OK links, red X), New York node, Service Availability (despite partition), Stale Data (returned by Tokyo during partition) (+2 more)

### Community 10 - "Trie (post)"
Cohesion: 0.50
Nodes (9): Delete method, deleteHelper method, GetWordsWithPrefix (autocomplete) method, Insert method, Trie (post), Search method, StartsWith (prefix search) method, Trie struct (Go) (+1 more)

### Community 11 - "Deploy Hugo site to Pages (GitHub Actions workflow)"
Cohesion: 0.38
Nodes (7): Default Post Archetype Template, Incorrect --baseURL flag causes CSS 404 (root cause and fix), Issue with CSS Not Loading for a Hugo Website on GitHub Pages (post), build job, deploy job, Deploy Hugo site to Pages (GitHub Actions workflow), Hugo Quick Start Commands

### Community 12 - "Add & Watch Reference"
Cohesion: 0.38
Nodes (7): Debounce Mechanism, Add & Watch Reference, graphify.ingest.ingest(), Supported URL Types (YouTube, Twitter/X, arXiv, PDF, Images, Webpage), graphify.watch Module, /graphify add Command, --watch Flag

### Community 13 - "Single server (green circle)"
Cohesion: 0.60
Nodes (6): CAP theorem, single-server.jpeg (hand-drawn diagram), Read response 'No' (for sold-out item), Single server (green circle), Reads: 'Is Game of Thrones available?' -> Yes; 'Is Harry Potter available?', Writes: 'Have 10 Game of Thrones Books', 'Sold out Harry Potter'

### Community 14 - "blockchain.webp (hero image)"
Cohesion: 0.60
Nodes (6): Blockchain (concept), Blocks (rendered as glowing metallic cubes), Chain links connecting blocks, Determinism (concept), Digital grid / binary particle background, blockchain.webp (hero image)

### Community 15 - "CP (Consistency + Partition Tolerance)"
Cohesion: 0.60
Nodes (5): CAP Theorem, CP (Consistency + Partition Tolerance), cp.jpeg (5-node network partition diagram), Network Partition, Service Unavailability During Partition (Tokyo/Cape Town nodes)

### Community 16 - "Illustration: group of friends independently writing the same thing in notebooks"
Cohesion: 0.67
Nodes (3): Blockchain consensus (independent nodes arriving at identical state), Determinism (same input yields same output for every party), Illustration: group of friends independently writing the same thing in notebooks

## Ambiguous Edges - Review These
- `Determinism (concept)` → `blockchain.webp (hero image)`  [AMBIGUOUS]
  content/posts/why-blockchains-are-designed-to-be-deterministic/blockchain.webp · relation: conceptually_related_to
- `Cape Town node` → `Unlabeled green node (bottom-middle of cluster)`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (bottom-middle of cluster)` → `CA system diagram (hand-drawn distributed nodes)`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: references
- `Unlabeled green node (bottom-middle of cluster)` → `Mumbai node`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (bottom-middle of cluster)` → `Tokyo node`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (bottom-middle of cluster)` → `Unlabeled green node (top-middle of cluster)`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (bottom-middle of cluster)` → `New York node`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (top-middle of cluster)` → `CA system diagram (hand-drawn distributed nodes)`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: references
- `Unlabeled green node (top-middle of cluster)` → `Tokyo node`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled green node (top-middle of cluster)` → `New York node`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ca.jpeg · relation: conceptually_related_to
- `Unlabeled fifth node (top of cluster)` → `AP System Diagram (hand-drawn, 5-node distributed cluster)`  [AMBIGUOUS]
  content/posts/understanding-cap-theorem-consistency-availability-partition-tolerance/img/ap.jpeg · relation: references

## Knowledge Gaps
- **43 isolated node(s):** `Commit and push`, `Commit`, `Suggest commit`, `Big-O complexity O(log n)`, `Logarithm Properties (product, quotient, power, change of base)` (+38 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 50 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Determinism (concept)` and `blockchain.webp (hero image)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Cape Town node` and `Unlabeled green node (bottom-middle of cluster)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Unlabeled green node (bottom-middle of cluster)` and `CA system diagram (hand-drawn distributed nodes)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Unlabeled green node (bottom-middle of cluster)` and `Mumbai node`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Unlabeled green node (bottom-middle of cluster)` and `Tokyo node`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Unlabeled green node (bottom-middle of cluster)` and `Unlabeled green node (top-middle of cluster)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Unlabeled green node (bottom-middle of cluster)` and `New York node`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._