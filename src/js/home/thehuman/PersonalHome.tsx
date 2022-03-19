import React from "react";
import { Footer } from "../Footer";
import { Music } from "./Music";
import { Photography } from "./Photography";
import { WizePanel } from "./WizePanel";

const PersonalHome = () =>
            <div className="personal-home">
                <div className="vertical-flex-box centered">
                    <p className="title">Cole Macdonald</p>
                    <p className="subtitle">Human Being</p>
                </div>
                <div className="vertical-flex-box centered">
                    <p>Thanks for coming you might be the first person here...</p>
                    <p>Clearly a work in progress but thanks for checking it out.</p>
                </div>
                <Music />
                <Photography />
                <WizePanel />
                <Footer />
            </div>;

export { PersonalHome };
