import React from "react";

export const ContentPage = (props: {children: Array<JSX.Element>, classes: string}) => 
    <div className={`page content-page-root`}>
        <div className={`content-page-internal ${props.classes}`}>
            {props.children}
        </div>
    </div>;