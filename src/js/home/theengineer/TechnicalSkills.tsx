import React from 'react';
import { Heading1 } from '../../components/Titles';

const Skill = (props: { name: string }) => (
  <div className="skill">
    <p>{props.name}</p>
  </div>
);

export const TechnicalSkills = () => (
  <div className="technical-skills">
    <Heading1 text="Technical Skills" />
    <div className="skill-list">
      <Skill name="ASP .NET" />
      <Skill name="API Design" />
      <Skill name="git" />
      <Skill name="Object Oriented Languages" />
      <Skill name="C#, Java, Python, C++" />
      <Skill name="System Design" />
      <Skill name="Web Tech - JS, React, Backbone, SCSS" />
      <Skill name="Time Management" />
      <Skill name="Technical Writing" />
      <Skill name="Database Design" />
      <Skill name="Leadership" />
      <Skill name="Written and Verbal Communication" />
      <Skill name="Design Patterns" />
      <Skill name="Protocol Design" />
    </div>
  </div>
);
