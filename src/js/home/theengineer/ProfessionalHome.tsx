import React from 'react';
import { DownloadResumeButton } from './DownloadResumeButton';
import { ProfessionalSummary } from './ProfessionalSummary';
import { Projects } from './Projects';
import { TechnicalSkills } from './TechnicalSkills';
import { ContentPage } from '../../components/ContentPage';
import { Title } from '../../components/Titles';

export const ProfessionalHome = () => (
  <ContentPage classes="">
    <div className="professional-hero-section">
      <Title text="Cole Macdonald, EIT" />
      <p className="subtitle">SOFTWARE ENGINEER</p>
      <a className="linkedin-link" target="_blank" href="https://www.linkedin.com/in/cole-macdonald-seng/">
        <svg width="34" height="34" viewBox="0 0 34 34">
          <rect x={5} y={5} height={25} width={25} />
          <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z"></path>
        </svg>
      </a>
      <img className="professional-hero-image" src={require('../../../resources/home/cole1.jpeg')} />
    </div>
    <ProfessionalSummary />
    <TechnicalSkills />
    <Projects />
    <DownloadResumeButton />
  </ContentPage>
);
