# harshitxmishra.github.io

    npm install
    npm run dev
    npm run build

- Notes: `src/content/notes/<slug>.md` (`title`, `date`, `summary`)
- Writing: `src/content/posts/<slug>.md` (`title`, `date`, `excerpt`, `readTime`, `tags`)
- Learn: edit `src/data/*.json`

Deploy: push to `main` (see `.github/workflows/deploy.yml`); set Settings → Pages → Source to **GitHub Actions**.

## Writing without code (private)
`studio/studio.html` is **not** part of the public site. Download it from the repo, open it in your browser, connect once with a fine-grained GitHub token (Contents: read/write on this repo only), then write, drag-drop photos/videos and hit Publish. Each save is a commit; GitHub Actions redeploys. Media goes to `public/media/<slug>/` (photos resized in-browser; videos up to 25 MB, else YouTube).

## Studio dashboard
`studio/studio.html` is a private, English-language dashboard: Dashboard overview, a searchable list per section (Posts, Notes, Learn topics, Moments, Sources, Research notes), an editor with a Publish panel (draft, pin, view on site, delete), and Social links. Open the file in your browser, connect once with a fine-grained GitHub token, and press Ctrl+S or Publish to commit.
