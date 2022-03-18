import React from "react";
import { Subtitle, Title3 } from "../Titles";


const ProfessionalSummary = () => 
    {
        return <div className="professional-summary vertical-flex-box centered highlighted-section">
            <div className="content vertical-flex-box left">
                <img className="professional-summary-image" src={require("../../../resources/home/cole1.jpeg")} />
                <Subtitle text="Professional Summary" />
                <div>Full-stack, back-end leaning, Software Engineer with a degree from the University of Victoria. Hard worker who enjoys a fast-paced learning environment. 3 years of professional experience with C# (.Net), Java, and Web frameworks.</div>
                <div className="horizontal-flex-box summary-items">
                    <div>
                        <Title3 text="B.S.Eng" />
                        <p>Bachelor of Software Engineering from University of Victoria with specialization in A.I. and Machine Learning (A average).</p>
                    </div>
                    <div>
                        <Title3 text="Leadership" />
                        <p>Experience managing and mentoring coop students, and running projects as a Technical Lead.</p>
                    </div>
                    <div>
                        <Title3 text="Software Development" />
                        <p>Experienced with all stages of the Software Development Life Cycle from Requirements Elicitation through Development and Testing.</p>
                    </div>
                </div>
            </div>
        </div>;
    };

export { ProfessionalSummary };