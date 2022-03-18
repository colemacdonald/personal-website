import React from "react";
import { Subtitle } from "../Titles";


const Music = () => 
    <div className="music">
        <div className="vertical-flex-box centered">
            <div className="content">
                <Subtitle text="Music" />
                <p>Music is one of my life passions and my top choice for creative expression. Being a life-long musician I play multiple instruments including guitar, bass, drums, and piano. Anything I record that is worth sharing will be posted here <a href="https://soundcloud.com/colethomasmusic" title="colethomas" target="_blank" >colethomas</a>.</p>
            </div>
        </div>

        <div className="vertical-flex-box centered">
            <div className="content">
                <iframe width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1195332346"></iframe>
                <div>
                    <a href="https://soundcloud.com/colethomasmusic/descent-in-c-minor" title="Descent in C Minor" target="_blank">Descent in C Minor</a>
                </div>
            </div>
        
            {/* <div className="content">
                <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1195332346&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
                    <a href="https://soundcloud.com/colethomasmusic" title="colethomas" target="_blank" style="color: #cccccc; text-decoration: none;">colethomas</a> · 
                    <a href="https://soundcloud.com/colethomasmusic/descent-in-c-minor" title="Descent in C Minor" target="_blank" style="color: #cccccc; text-decoration: none;">Descent in C Minor</a>
                </div>
            </div> */}
        </div>
    </div>;

export { Music };