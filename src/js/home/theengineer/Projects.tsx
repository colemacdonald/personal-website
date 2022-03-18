import React from "react";
import { Subtitle } from "../Titles";

let projectDescriptions = [
    {
        title: "Connected Windows Application",
        company: "SKYTRAC Systems",
        notes: [
            "Designed and implemented a connected Windows 10 installed application for flight data analysis which synchronizes its data with a .NET Core server.",
            "Application allowed a flight data analyst the view flight data in interactive tables and graphs.",
            "Designed a domain-specific language for detailing how engineering units are extracted from the raw flight data.",
            "Technologies included ASP .NET, .NETCore 3, MSSQL, SQLite, gRPC, SignalR, Entity Framework, and Docker."
        ]
    },
    {
        title: "Containerize Applications for New Deployment Environment",
        company: "SKYTRAC Systems",
        notes: [
            "Technical lead updating 6 Java applications and 2 C# applications so that the system could be deployed in a new country.",
            "Three web apps, hosted with Tomcat/Jersey; the remainder are various processing services.",
            "Containerized the applications with docker.",
            "Swapped out the existing authentication system with Keycloak to support 2FA.",
            "Constructed CI pipelines to produce builds for both environments."
        ]
    },
    {
        title: "Airbourne Communication API",
        company: "SKYTRAC Systems",
        notes: [
            "Designed and implemented an API for a client to communicate with an airbourne router.",
            "Design of extensible binary protocol.",
            "Involved determining the appropriate communication channel (internet or satellite) depending on the connectivity status of the aircraft.",
            "Technologies included C# and ASP.NET Core 3."
        ]
    }
];

const ProjectTitle = (props: {title: string, company: string}) => 
    <div>
        <p className="title3">{props.title}</p>
        <p className="title4">{props.company}</p>
        <div className="small-line" />
    </div>;

const Project = (props: {title: string, company: string, notes: Array<string>}) => 
    <div>
        <ProjectTitle {...props} />
        <ul>
            { props.notes.map(n => <li>{n}</li>) }
        </ul>
    </div>;

const Projects = () => 
    <div className="projects vertical-flex-box centered">
        <div className="content vertical-flex-box left">
            <Subtitle text="Projects"/>
            {projectDescriptions.map(p => <Project {...p} />)}
        </div>
    </div>;

export { Projects };