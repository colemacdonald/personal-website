import React from 'react';

export const Title = (props: { text: string }) => (
  <div className="title">
    <p>{props.text}</p>
  </div>
);

export const Subtitle = (props: { text: string }) => (
  <div className="subtitle">
    <p>{props.text}</p>
  </div>
);

export const Heading1 = (props: { text: string }) => (
  <div className="heading1">
    <p>{props.text}</p>
    <div className="line" />
  </div>
);

export const Heading2 = (props: { text: string }) => (
  <div className="heading2">
    <p>{props.text}</p>
    <div className="small-line" />
  </div>
);

export const Heading3 = (props: { text: string }) => (
  <div className="heading3">
    <p>{props.text}</p>
  </div>
);
