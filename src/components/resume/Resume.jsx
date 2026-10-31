import React from 'react';
import "./resume.css";
import Data from './Data';
import Card from './Card';
import Reveal from '../common/Reveal';
import { StaggerGroup } from '../common/Stagger';

const Resume = () => {
  return (
    <section className="resume container section" id="resume">
      <Reveal as="h2" className="section__title">Experience</Reveal>

      <div className="resume__container grid">
{/* Education */}
        <StaggerGroup className="timeline grid">
            <h3 className="timeline__heading">Education</h3>
            {Data.map((val, id) => {
              if(val.category === "education") {
                return(
                  <Card
                  key={id}
                  icon={val.icon}
                  title={val.title}
                  year={val.year}
                  desc={val.desc}
                  />
                )
              }
              return null;
            })}
        </StaggerGroup>
{/* Experience */}
        <StaggerGroup className="timeline grid">
            <h3 className="timeline__heading">Work experience</h3>
            {Data.map((val, index) => {
              if(val.category === "experience") {
                return(
                  <Card
                  key={index}
                  icon={val.icon}
                  title={val.title}
                  year={val.year}
                  desc={val.desc}
                   />
                )
              }
              return null;
            })}
        </StaggerGroup>



      </div>  {/* resume__container grid*/}
    </section>
  )
}

export default Resume
