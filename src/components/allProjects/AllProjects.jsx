// src/components/AllProjects.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../portfolio/Menu';
import '../portfolio/portfolio.css';
import './AllProjects.css';

const categories = [
  { label: 'All', value: null,      color: '#00D7E1' },
  { label: 'WordPress', value: 'WordPress Projects', color: '#ffcccb' },
  { label: 'Design',    value: 'Design',              color: '#add8e6' },
  { label: 'Web Dev',   value: 'Web Development',     color: '#90ee90' },
];

const AllProjects = () => {
  const [items, setItems]   = useState(Menu);
  const [bgColor, setBgColor] = useState(categories[0].color);

  const filterItem = (categoryValue, color) => {
    if (categoryValue === null) {
      setItems(Menu);
    } else {
      setItems(Menu.filter(p => Array.isArray(p.category) && p.category.includes(categoryValue)));
    }
    setBgColor(color);
  };

  return (
    <section className="all-projects" style={{ backgroundColor: bgColor }}>
      <Link to="/" className="back-button">
        <i className="icon-arrow-left"></i> Back to Home
      </Link>

      <div className="container section">
        <h2 className="section__title">All Projects</h2>

        {/* FILTER BUTTONS */}
        <div className="work__filters">
          {categories.map(({ label, value, color }) => (
            <span
              key={label}
              className="work__item"
              onClick={() => filterItem(value, color)}
            >
              {label}
            </span>
          ))}
        </div>

        {/* GRID OF PROJECT CARDS */}
        <div className="work__container grid">
          {items.map(({ id, image, title, category, link }) => (
            <div className="work__card" key={id}>
              <div className="work__thumbnail">
                <img src={image} alt={`${title} website`} className="work__img" loading="lazy" decoding="async" />
                <div className="work__mask"></div>
              </div>
              <span className="work__category">{Array.isArray(category) ? category.join(", ") : category}</span>
              <h3 className="work__title">{title}</h3>
              <a
                href={link}
                className="work__button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="icon-link work__button-icon"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
