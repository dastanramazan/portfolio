import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPosts, formatDate } from '../../lib/posts';
import Reveal from '../common/Reveal';
import './blog.css';

// "Latest articles" block for the home page. Renders nothing until there is
// at least one published post, so an empty blog never leaves a blank section.
const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts().then((all) => setPosts(all.slice(0, 3))).catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="blog blog--preview container section" id="blog">
      <Reveal as="h2" className="section__title">Latest Articles</Reveal>

      <div className="blog__list blog__list--grid">
        {posts.map((post, i) => (
          <Reveal as="article" className="blog__card" key={post.slug} delay={i * 0.08}>
            <Link to={`/blog/${post.slug}`} className="blog__card-link">
              <div className="blog__meta">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.minutes} min read</span>
              </div>
              <h3 className="blog__title">{post.title}</h3>
              {post.summary && <p className="blog__summary">{post.summary}</p>}
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="portfolio__button-container">
        <Link to="/blog" className="btn">Read All Articles</Link>
      </div>
    </section>
  );
};

export default BlogPreview;
