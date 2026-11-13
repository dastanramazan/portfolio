import React from 'react';
import "./about.css";
import Image from "../../assets/myavatar_1.webp";
import Reveal from '../common/Reveal';

const About = () => {
  return (
    <section className="about container section" id="about">
      <Reveal as="h2" className="section__title">About ME</Reveal>

      <div className="about__container grid">
        <Reveal as="img" src={Image} alt="Dastan Ramazan" loading="lazy" decoding="async" className="about__img" y={0} delay={0.1} />
{/* About */}
        <div className="about__data grid">
              <Reveal className="about__info" delay={0.2}>
                <p className="about__description">I teach computer science at a Title I public charter school in Spring, Texas, and I build software. My main project is STEM-Bridge-AI, a free, open-source set of AI tools designed to give students feedback on their science writing and code without doing the work for them.</p>
                <p className="about__description">I hold an M.S. in Computer Science from North American University (2024). Before teaching, I supervised programming tracks at QWANT, a coding school in Kazakhstan, and taught an introductory computing course at KAZGUU University. Earlier I worked in public policy.</p>
                <a href="https://drive.google.com/file/d/1JO5ea-EMcER-OMve2-TcWePBKA38vJx4/view?usp=drive_link" className="btn">Download CV</a>
              </Reveal>


        </div>
      </div>

    </section>
  )
}

export default About