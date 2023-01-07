import React from "react";

export interface GiantButtonProps {
    text: string;
    href: string;
}

export const GiantButton = ({text, href}: GiantButtonProps) => 
    <a className="giant-button" href={href}>
        <p>{text}</p>
    </a>;



export const GiantButtonList = ({buttons}: {buttons: GiantButtonProps[]}) => 
    <div className="giant-button-list">
        {buttons.map(button => <GiantButton {...button} />)}
    </div>;