import React from 'react';
import { Heading1, Heading2 } from '../../components/Titles';

export const ProfessionalSummary = () => {
  return (
    <div className="professional-summary">
      <Heading1 text="Professional Summary" />
      <div>
        Full-stack, back-end leaning, Software Engineer with a degree from the University of Victoria. Hard worker who
        enjoys a fast-paced learning environment. 3 years of professional experience with C# (.Net), Java, and Web
        frameworks.
      </div>
      <div className="summary-items">
        <div>
          <Heading2 text="B.S.Eng" />
          <p>
            Bachelor of Software Engineering from University of Victoria with specialization in A.I. and Machine
            Learning (A average).
          </p>
        </div>
        <div>
          <Heading2 text="Leadership" />
          <p>Experience managing and mentoring coop students, and running projects as a Technical Lead.</p>
        </div>
        <div>
          <Heading2 text="Software Development" />
          <p>
            Experienced with all stages of the Software Development Life Cycle from Requirements Elicitation through
            Development and Testing.
          </p>
        </div>
      </div>
    </div>
  );
};
