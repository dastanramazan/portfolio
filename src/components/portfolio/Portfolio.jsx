import React from "react";
import { Link } from "react-router-dom";
import "./portfolio.css";
import Menu from "./Menu";
import Reveal from "../common/Reveal";
import { StaggerGroup, StaggerItem } from "../common/Stagger";

// Featured work comes first and is described in full. These two are the
// current focus of the profile (the earlier web-developer lineup lives in
// git, tag v1-web-dev-portfolio).
const FEATURED = [
  {
    id: 'stem-bridge-ai',
    title: 'STEM-Bridge-AI',
    meta: 'Open source · 2026',
    description:
      'Free AI feedback tools for K–12 classrooms. Science Writing gives feedback on lab reports and explanations. Coding Helper gives hints so students fix their own code. Photo Check reads handwritten work from a photo. Runs in a web browser with no installation and no accounts. MIT License.',
    links: [
      { label: 'Live application', href: 'https://dastanramazan.github.io/STEM-Bridge-AI/' },
      { label: 'Source code', href: 'https://github.com/dastanramazan/STEM-Bridge-AI' },
    ],
  },
  {
    id: 'ai-ecommerce',
    title: 'AI E-Commerce Web Application',
    meta: 'Graduate capstone · 2024',
    description:
      'A web store with product recommendations and a chatbot built on Google’s Gemini models.',
    links: [{ label: 'Live demo', href: 'https://dastanramazan.github.io/ai_ecommerce/' }],
  },
];

// The capstone above is the same project as Menu id 10, and Menu id 1 is a
// template demo, so neither goes in the website grid. Fixed order (no more
// random shuffle) and capped at six; the full list is on /projects.
const HIDDEN_FROM_HOME = [1, 10];
const WEBSITES = Menu.filter((p) => !HIDDEN_FROM_HOME.includes(p.id)).slice(0, 6);

const Portfolio = () => {
  return (
    <section className="work container section" id="portfolio">
      <Reveal as="h2" className="section__title">Projects</Reveal>

      <div className="featured">
        {FEATURED.map(({ id, title, meta, description, links }) => (
          <Reveal as="article" className="featured__card" key={id}>
            <p className="featured__meta">{meta}</p>
            <h3 className="featured__title">{title}</h3>
            <p className="featured__text">{description}</p>
            <div className="featured__links">
              {links.map(({ label, href }) => (
                <a key={label} href={href} className="featured__link" target="_blank" rel="noopener noreferrer">
                  {label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="featured__subhead">Websites</h3>

      <StaggerGroup className="work__container grid">
        {WEBSITES.map(({ id, image, title, category, year, link }) => (
          <StaggerItem className="work__card" key={id}>
            <div className="work__thumbnail">
              <img src={image} alt={`${title} website`} className="work__img" loading="lazy" decoding="async" />
              <div className="work__mask"></div>
            </div>
            <span className="work__category">{year ? `${category} · ${year}` : category}</span>
            <h3 className="work__title">{title}</h3>
            <a href={link} className="work__button" target="_blank" rel="noopener noreferrer">
              <i className="icon-link work__button-icon"></i>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="portfolio__button-container">
        <Link to="/projects" className="btn">View All Projects</Link>
      </div>
    </section>
  );
};

export default Portfolio;
