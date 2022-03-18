import React from "react";


const DownloadResumeButton = () => 
    <div className="download-resume-button vertical-flex-box centered">
            <a href={require("../../../resources/home/cole-macdonald_resume_2022-01-28.pdf")} target="_blank" className="vertical-flex-box centered">
                <p>Download My Resume</p>
            </a>
    </div>;

export { DownloadResumeButton }