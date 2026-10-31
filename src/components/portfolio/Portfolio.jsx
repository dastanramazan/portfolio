import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./portfolio.css";
import Menu from "./Menu";
import Reveal from "../common/Reveal";
import { StaggerGroup, StaggerItem } from "../common/Stagger";

const Portfolio = () => {
  // Shuffle array and get 6 random projects using Fisher-Yates algorithm
  const displayedProjects = useMemo(() => {
    const shuffled = [...Menu];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  }, []); // Empty dependency array means this will only run once when component mounts

  return (
    <section className="work container section" id="portfolio">
      <Reveal as="h2" className="section__title">Projects</Reveal>

      <StaggerGroup className="work__container grid">
        {displayedProjects.map(({ id, image, title, category, link }) => (
          <StaggerItem className="work__card" key={id}>
            <div className="work__thumbnail">
              <img src={image} alt={`${title} website`} className="work__img" loading="lazy" decoding="async" />
              <div className="work__mask"></div>
            </div>
            <span className="work__category">{category}</span>
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
