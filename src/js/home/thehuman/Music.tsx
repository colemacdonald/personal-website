import React from "react";
import { ContentPage } from "../../components/ContentPage";
import { Subtitle, Title3 } from "../../components/Titles";

let songDescriptions = [
    {
        name: "Descent in C Minor",
        instruments: ["Piano"],
        soundcloudTrackId: "1195332346"
    },
    {
        name: "Prelude in F# Minor",
        instruments: ["Piano, Cello, Percussion, Viola, Upright Bass"],
        soundcloudTrackId: "1186821187"
    }
]

const Song = (props: {name: string, instruments: Array<string>, soundcloudTrackId: string}) => 
    <div className="song veritcal-flex-box center">
        <iframe scrolling="no" frameBorder="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.soundcloudTrackId + "&color=ffb464&visual=true&show_user=true&show_teaser=true&show_comments=false"}></iframe>
    </div>;

const Music = () => 
    <ContentPage classes="music content">
        <div className="summary">
            <Subtitle text="Music" />
            <p>Music is one of my life passions and my top choice for creative expression. Being a life-long musician I play multiple instruments including guitar, bass, drums, and piano. Anything I record that is worth sharing will be posted here <a href="https://soundcloud.com/colethomasmusic" title="colethomas" target="_blank" >colethomas</a>.</p>
            <Title3 text="Compositions" />
        </div>
        <div>
            <div className="horizontal-flex-box wrap">
                {songDescriptions.map(s => <Song {...s} />)}
            </div>
        </div>
    </ContentPage>;

export { Music };