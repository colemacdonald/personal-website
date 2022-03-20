import React from "react";


const GiantButton = (props: {text: string, href: string}) => 
    <a className="giant-button" href={props.href}>
        <p>{props.text}</p>
    </a>;

export { GiantButton };