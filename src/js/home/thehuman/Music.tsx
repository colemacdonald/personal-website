import React from "react";
import { ContentPage } from "../../components/ContentPage";
import { Heading1, Title, Heading2, Heading3 } from "../../components/Titles";

let songDescriptions = [
    {
        name: "Descent in C Minor",
        year: "2022",
        instruments: ["Piano"],
        soundcloudTrackId: "1195332346"
    },
    {
        name: "Prelude in F# Minor",
        year: "2022",
        instruments: ["Piano, Cello, Percussion, Viola, Upright Bass"],
        soundcloudTrackId: "1186821187"
    }
]

const Song = (props: {name: string, year: string, instruments: Array<string>, soundcloudTrackId: string}) => 
    <div className="song veritcal-flex-box center">
        <Heading2 text={props.name} />
        <Heading3 text={props.instruments.join(", ")} />
        <iframe scrolling="no" frameBorder="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.soundcloudTrackId + "&color=ffb464&visual=true&show_user=true&show_teaser=true&show_comments=false"}></iframe>
    </div>;

export const Music = () => 
    <ContentPage classes="music">

        <Title text="Music" />

        <div className="intro-text">
            <p>Music is one of my life passions and my top choice for creative expression. After playing piana for a few years as a kid I switched to guitar. My passion didn't really take off until I met a couple of musical friends and formed my first band and starting picking up other instruments; including a return to the piano.</p>
            <p>As a lifelong musician I try to play as many instruments as I can but can only say I'm competent with guitar, bass, drums, and piano.</p>
            <p>Anything I record that is worth sharing will be posted here <a href="https://soundcloud.com/colethomasmusic" title="colethomas" target="_blank" >colethomas</a>.</p>
        </div>
        
        <div className="songs">
            <Heading1 text="Compositions" />
            <p>A sample of pieces that I have written and recorded.</p>
            <div className="vertical-flex-box">
                {songDescriptions.map(s => <Song {...s} />)}
            </div>
        </div>
    </ContentPage>;