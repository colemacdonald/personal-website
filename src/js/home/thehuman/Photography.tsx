import React from "react";
import { Carousel } from "react-bootstrap";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import { ContentPage } from "../../components/ContentPage";
import { Title } from "../../components/Titles";

const images = [
    {
        src: require("../../../resources/home/photography/ritsurin1.jpeg"),
        caption: "Ritsurin Garden, Takamatsu"
    },
    {
        src: require("../../../resources/home/photography/turtle.jpeg"),
        caption: "Sea Turle, Oahu"
    },
    {
        src: require("../../../resources/home/photography/temple2.jpeg"),
        caption: "Shibata Castle, Shibata"
    },
    {
        src: require("../../../resources/home/photography/eagle-ray.jpeg"),
        caption: "Eagle Ray, Oahu"
    },
    {
        src: require("../../../resources/home/photography/temple1.jpeg"),
        caption: "Kofuku-ji Temple, Nara"
    },
    {
        src: require("../../../resources/home/photography/ritsurin2.jpeg"),
        caption: "Ritsurin Garden, Takamatsu"
    },
    {
        src: require("../../../resources/home/osaka-castle.jpeg"),
        caption: "Osaka Castle, Osaka"
    },
    {
        src: require("../../../resources/home/photography/hawaii1.jpeg"),
        caption: "Diamond Back, Oahu"
    },
    {
        src: require("../../../resources/home/photography/deep-creek.jpeg"),
        caption: "Deep Creek Conservation Park, South Australia"
    },
    {
        src: require("../../../resources/home/photography/kangaroo.jpeg"),
        caption: "Kangaroo, Cleland Wildlife Park, South Australia"
    },
    {
        src: require("../../../resources/home/photography/phineas1.jpeg"),
        caption: "Phineas, July 2022"
    }
];

export const Photography = () => 
    <ContentPage classes="photography">
        <Title text="Photography" />
        <p>This is a small collection of the photos I have taken over the years. The majority of them were shot on iPhone but some of them were taken with a GoPro. Hope you enjoy!</p>
        <Carousel fade={true}> {
            images.map(i => 
                <Carousel.Item>
                    <img src={i.src} />
                    <CarouselCaption>
                        <p>{i.caption}</p>
                    </CarouselCaption>
                </Carousel.Item>)
            }
        </Carousel>
    </ContentPage>;