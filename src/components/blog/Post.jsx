import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadPosts, formatDate } from '../../lib/posts';
import Giscus from './Giscus';
import './blog.css';

const Post = () => {
  const { slug } = useParams();
  const [state, setState] = useState({ status: 'loading', post: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', post: null });
    loadPosts()
      .then((posts) => {
        if (cancelled) return;
        const post = posts.find((p) => p.slug === slug);
        setState(post ? { status: 'ready', post } : { status: 'missing', post: null });
      })
      .catch(() => !cancelled && setState({ status: 'missing', post: null }));
    return () => { cancelled = true; };
  }, [slug]);

  const { status, post } = state;

  useEffect(() => {
    if (!post) return undefined;
    document.title = `${post.title} — Dastan Ramazan`;
    return () => { document.title = 'Dastan Ramazan — Software Engineer'; };
  }, [post]);

  return (
    <section className="blog container section">
      <Link to="/blog" className="back-button">
        <i className="icon-arrow-left"></i> All Articles
      </Link>

      {status === 'loading' && <p className="blog__empty">Loading…</p>}

      {status === 'missing' && (
        <div className="blog__empty">
          <p>That article doesn't exist.</p>
          <Link to="/blog" className="btn">Browse articles</Link>
        </div>
      )}

      {status === 'ready' && (
        <article className="post">
          <header className="post__header">
            <div className="blog__meta">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.minutes} min read</span>
            </div>
            <h1 className="post__title">{post.title}</h1>
            <div className="blog__tags">
              {post.tags.map((t) => <span className="blog__chip" key={t}>{t}</span>)}
            </div>
          </header>

          <div className="post__body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <footer className="post__footer">
            <h3>Comments</h3>
            <Giscus term={post.slug} />
          </footer>
        </article>
      )}
    </section>
  );
};

export default Post;
