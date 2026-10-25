// Posts are plain markdown files in src/content/posts. CRA bundles each .md
// as a static asset, so we fetch the text at runtime and parse the small
// front-matter block (title, date, summary, tags) ourselves.
const context = require.context('../content/posts', false, /\.md$/);

const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = value;
  });
  return { meta, body: match[2] };
};

const readingTime = (text) => Math.max(1, Math.round(text.split(/\s+/).length / 220));

let cache = null;

export const loadPosts = () => {
  if (!cache) {
    cache = Promise.all(
      context.keys().map(async (key) => {
        const url = context(key);
        const raw = await (await fetch(url)).text();
        const { meta, body } = parseFrontMatter(raw);
        const slug = key.replace(/^\.\//, '').replace(/\.md$/, '');
        return {
          slug,
          title: meta.title || slug,
          date: meta.date || '',
          summary: meta.summary || '',
          tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
          draft: meta.draft === 'true',
          minutes: readingTime(body),
          body,
        };
      })
    ).then((posts) =>
      posts
        .filter((post) => !post.draft)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  }
  return cache;
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
