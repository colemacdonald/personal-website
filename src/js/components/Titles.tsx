import React from "react";

const Title = (props: {text: string}) => 
    <div className="title">
        <p>{props.text}</p>
    </div>;

const Subtitle = (props: {text: string}) => 
    <div className="subtitle">
        <p>{props.text}</p>
    </div>;

const Heading1 = (props: {text: string}) =>
    <div className="heading1">
        <p>{props.text}</p>
        <div className="line"/>
    </div>;

const Heading2 = (props: {text: string}) => 
    <div className="heading2">
        <p>{props.text}</p>
        <div className="small-line" />
    </div>;

const Heading3 = (props: {text: string}) => 
    <div className="heading3">
        <p>{props.text}</p>
    </div>;

export { Title, Subtitle, Heading1, Heading2, Heading3 };