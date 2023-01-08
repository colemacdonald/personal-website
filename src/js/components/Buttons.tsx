import React from "react";
import { Silhouette, SilhouetteType } from "./Silhouettes";

export interface GiantButtonProps {
    text: string;
    href: string;
    silhouetteType?: SilhouetteType;
}

export const GiantButton = ({text, href, silhouetteType}: GiantButtonProps) => 
    <a className="giant-button" href={href}>
        <div className="button-silhouette"><Silhouette type={silhouetteType} /></div>
        <p>{text}</p>
    </a>;


export const GiantButtonList = ({buttons}: {buttons: GiantButtonProps[]}) => 
    <div className="giant-button-list">
        {buttons.map(button => <GiantButton {...button} />)}
    </div>;