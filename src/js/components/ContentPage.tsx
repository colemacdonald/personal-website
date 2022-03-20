import React from "react";
import { Footer } from "../home/Footer";


const ContentPage = (props: {children: Array<JSX.Element>, classes: string}) => 
    <div className={`page content-page vertical-flex-box centered`}>
        <div className={`vertical-flex-box centered ${props.classes}`}>
            {props.children}
        </div>
        <Footer />
    </div>;

export { ContentPage };