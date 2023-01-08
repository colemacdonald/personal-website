import React from 'react';

export const DownloadResumeButton = () => (
  <div className="primary-button vertical-flex-box centered">
    <a
      href={require('../../../resources/home/cole-macdonald_resume_2022-01-28.pdf')}
      target="_blank"
      className="vertical-flex-box centered"
    >
      <p>Download My Resume</p>
    </a>
  </div>
);
