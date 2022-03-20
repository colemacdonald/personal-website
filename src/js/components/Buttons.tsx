import React from "react";
import { Silhouette, SilhouetteType } from "../home/Silhouettes";


const GiantButton = (props: {text: string, href: string, silhouetteType: SilhouetteType}) => 
    <div className="giant-button">
        <div className="vertical-flex-box centered silhouette-container">
            <Silhouette type={props.silhouetteType} />
        </div>
        <a className="vertical-flex-box centered" href={props.href}>
            <p>{props.text}</p>
        </a>
    </div>;

export { GiantButton };