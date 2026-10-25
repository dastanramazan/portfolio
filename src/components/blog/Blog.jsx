import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPosts, formatDate } from '../../lib/posts';
import Reveal from '../common/Reveal';
import './blog.css';

const Blog = () => {
  const [posts, setPosts] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    document.title = 'Blog — Dastan Ramazan';
    loadPosts().then(setPosts).catch(() => setPosts([]));
    return () => { document.title = 'Dastan Ramazan — Software Engineer'; };
  }, []);

  const tags = useMemo(
    () => [...new Set((posts || []).flatMap((p) => p.tags))],
    [posts]
  );
  const visible = (posts || []).filter((p) => !tag || p.tags.includes(tag));

  return (
    <section className="blog container section">
      <Link to="/" className="back-button">
        <i className="icon-arrow-left"></i> Back to Home
      </Link>

      <h2 className="section__title">Blog</h2>
      <p className="blog__intro">Notes on engineering, teaching and building things.</p>

      {tags.length > 0 && (
        <div className="work__filters blog__filters">
          <span
            className={`work__item${tag === null ? ' blog__tag--active' : ''}`}
            onClick={() => setTag(null)}
          >
            All
          </span>
          {tags.map((t) => (
            <span
              key={t}
              className={`work__item${tag === t ? ' blog__tag--active' : ''}`}
              onClick={() => setTag(t)}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {posts === null && <p className="blog__empty">Loading…</p>}
      {posts !== null && visible.length === 0 && <p className="blog__empty">No articles yet.</p>}

      <div className="blog__list">
        {visible.map((post, i) => (
          <Reveal as="article" className="blog__card" key={post.slug} delay={i * 0.05}>
            <Link to={`/blog/${post.slug}`} className="blog__card-link">
              <div className="blog__meta">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.minutes} min read</span>
              </div>
              <h3 className="blog__title">{post.title}</h3>
              {post.summary && <p className="blog__summary">{post.summary}</p>}
              <div className="blog__tags">
                {post.tags.map((t) => <span className="blog__chip" key={t}>{t}</span>)}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Blog;
