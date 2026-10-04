# namanattri

A two-pane personal blog theme for Hugo.

- **Fixed intro sidebar (30%)** with photo, name, description, menu and footer.
- **Scrolling content pane (70%)** with the page content.
- **Infinite post list**: paginated lists load the next page as you scroll.
- **Infinite post stream**: single posts load the next older/newer post as you scroll, and the URL and title follow the post in view.
- **SEO friendly**: every post and list page is a real, server-rendered URL with canonical, Open Graph and JSON-LD metadata. Plain pagination and prev/next links work without JavaScript.
- Dark mode, breadcrumbs, optional MathJax and Google tag, i18n strings.

Requires Hugo 0.158.0 or later.

## Usage

```toml
theme = 'namanattri'

[params]
  description = 'Short intro shown in the sidebar and used as the default meta description.'
  mainSections = ['posts']   # sections listed on the home page
  math = false               # load MathJax (can be set per page)
  googleTag = ''             # for example 'G-XXXXXXXXXX'; production builds only
  [params.author]
    name = 'Your Name'
    image = 'images/author.png'   # a file in the site's assets directory

[[menus.main]]
  name = 'Home'
  pageRef = '/'
  weight = 10

[[menus.main]]
  name = 'Blog'
  pageRef = '/posts'
  weight = 20
```

Posts live in the `posts` section (`layouts/posts/single.html` provides the infinite post stream). Page size comes from Hugo's `pagination.pagerSize` (default 10).

## Structure

| Path | Purpose |
| --- | --- |
| `layouts/baseof.html` | Page shell: sidebar and scrolling content pane |
| `layouts/home.html`, `list.html`, `single.html`, `404.html` | Page kinds |
| `layouts/posts/single.html` | Post page with the infinite post stream |
| `layouts/_partials/` | Reusable partials; `head/custom.html` is an empty hook for sites |
| `layouts/_partials/func/` | Partials that return values |
| `assets/css/` | Stylesheets, concatenated in `head/css.html` |
| `assets/js/` | ES modules bundled by `js.Build` |
| `i18n/` | Translatable strings |

## Customising

Override any file by creating it at the same path in the site's own `layouts/` or `assets/`. To add markup to `<head>`, create `layouts/_partials/head/custom.html`.
