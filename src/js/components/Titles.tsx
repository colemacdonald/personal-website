import React from "react";

const Subtitle = (props: {text: string}) =>
    <div className="subtitle">
        <p>{props.text}</p>
        <div className="line"/>
    </div>;

const Title3 = (props: {text: string}) => 
    <div className="title3">
        <p>{props.text}</p>
        <div className="small-line" />
    </div>;


const Title4 = (props: {text: string}) => 
    <div className="title4">
        <p>{props.text}</p>
    </div>;

export { Subtitle, Title3, Title4 };