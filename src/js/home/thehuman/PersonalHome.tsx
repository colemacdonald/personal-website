import React from "react";
import { GiantButton } from "../../components/Buttons";
import { SilhouetteType } from "../Silhouettes";

const PersonalHome = () =>
            <div className="page personal-home home vertical-flex-box">
                <div className="vertical-flex-box centered">
                    <p className="title">Cole Macdonald</p>
                    <p className="subtitle">Human Being</p>
                </div>
                <div className="vertical-flex-box centered">
                    <p>Thanks for coming you might be the first person here...</p>
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    <GiantButton text="Music" href="#/thehuman/music" silhouetteType={SilhouetteType.Gear}/>
                    <GiantButton text="Games" href="#/thehuman/wizethegame" silhouetteType={SilhouetteType.None}/>
                    <GiantButton text="Reading" href="#/thehuman/reading" silhouetteType={SilhouetteType.Head}/>
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    <GiantButton text="Travels" href="#/thehuman/travels" silhouetteType={SilhouetteType.None}/>
                    <GiantButton text="Sports" href="#/thehuman/sports" silhouetteType={SilhouetteType.None}/>
                    <GiantButton text="Photography" href="#/thehuman/photography" silhouetteType={SilhouetteType.None}/>
                </div>
            </div>;

export { PersonalHome };
