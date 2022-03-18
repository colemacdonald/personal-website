import React from "react";
import { ProfessionalFooter } from "./ProfessionalFooter";
import { ProfessionalSummary } from "./ProfessionalSummary";
import { Projects } from "./Projects";
import { TechnicalSkills } from "./TechnicalSkills";

const ProfessionalHome = () =>
    <div className="professional-home">
        <div className="centered vertical-flex-box">
            <p className="title">Cole Macdonald, EIT</p>
            <p className="subtitle">SOFTWARE ENGINEER</p>
        </div>
        <ProfessionalSummary />
        <TechnicalSkills />
        <Projects />
        <ProfessionalFooter />
    </div>;

export { ProfessionalHome };
