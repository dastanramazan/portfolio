import React from 'react';
import "./about.css";
import Image from "../../assets/myavatar_1.webp";
import AboutBox from './AboutBox';
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
                <p className="about__description">Hello, I'm Dastan, a Software Engineer excited about using technology to make the world better. Over 12 years, I've learned about lots of different technologies, from making websites to working with complex systems. I'm good at finding efficient ways to do things, staying organized, and paying attention to technical details. I enjoy working with teams to create new things that help push technology forward.</p>
                <a href="https://drive.google.com/file/d/1JO5ea-EMcER-OMve2-TcWePBKA38vJx4/view?usp=drive_link" className="btn">Download CV</a>
              </Reveal>


        </div>
      </div>

      <AboutBox />
    </section>
  )
}

export default About