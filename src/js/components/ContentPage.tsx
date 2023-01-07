import React from "react";
import { Footer } from "../home/Footer";


export const ContentPage = (props: {children: Array<JSX.Element>, classes: string}) => 
    <div className={`page content-page vertical-flex-box`}>
        <div className={`content-page-internal vertical-flex-box centered ${props.classes}`}>
            {props.children}
        </div>
        <Footer />
    </div>;