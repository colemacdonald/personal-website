import path from "path";
import React from "react";


enum SilhouetteType {
    None, Gear, Head
}

const paths = {};
paths[SilhouetteType.None] = <div/>;
paths[SilhouetteType.Gear] = 
    <svg viewBox="0 0 121 121" className="silhouette">
        <g transform="translate(-153.03 -268.95)">
        <g transform="matrix(39.803 0 0 39.803 63.558 116.51)">
            <path d="m74.031 0.0625l-7.625 13.376c-1.948-0.254-3.952-0.376-5.968-0.376-2.281 0-4.528 0.147-6.719 0.469l-8.469-13.062c-4.32 1.1292-8.454 2.7376-12.344 4.7498l2.656 15.187c-3.574 2.316-6.813 5.12-9.624 8.313l-14.813-4.5c-2.5493 3.609-4.7344 7.491-6.4688 11.625l11.688 9.906c-1.241 4.003-1.94 8.239-2.063 12.625l-14.218 6.187c0.35094 4.527 1.1952 8.929 2.4682 13.126l15.25-0.032c1.644 3.984 3.823 7.697 6.438 11.032l-6.938 13.972c3.091 3.17 6.508 6 10.219 8.43l11.688-9.9c3.713 1.95 7.719 3.4 11.937 4.28l3.563 15.19c1.898 0.18 3.804 0.28 5.75 0.28 2.519 0 4.999-0.17 7.437-0.47l2.656-15.19c4.199-0.94 8.162-2.45 11.844-4.47l12.406 9.35c3.641-2.54 6.999-5.46 9.999-8.72l-7.655-13.378c2.559-3.376 4.705-7.111 6.285-11.124l15.43-0.876c1.16-4.227 1.87-8.646 2.1-13.187l-14.35-5.281c-0.19-4.379-1-8.579-2.31-12.563l11.28-10.719c-1.84-4.079-4.13-7.929-6.78-11.468l-14.342 5.281c-2.863-3.143-6.136-5.869-9.75-8.125l1.812-15.531c-3.941-1.9002-8.114-3.3986-12.469-4.4065z"
                transform="matrix(.025123 0 0 .025123 2.248 3.8298)" />
        </g>
        </g>
    </svg>;

paths[SilhouetteType.Head] = 
    <svg viewBox="0 0 1535.5566 1693.9089" className="silhouette">
        <g transform="translate(-1077.7318,-229.8187)">
            <path d="M1633.0017,1876.7732c260.7216,0,521.4429,0,781.6719,0   c-32.8428-154.3505-72.1501-408.2728-55.2302-470.5089c27.8672-105.5531,117.9214-185.2161,151.761-269.8579   c172.1553-430.1788-38.2014-804.6875-513.9825-854.3834c-420.1136-43.8813-653.7932,194.6746-686.6362,441.1318   c-3.4811,26.3881,0,52.7762,12.4423,80.1613c-57.7153,90.1186-190.5698,223.0552-202.0098,286.7859   c-6.9684,38.3367,38.3108,51.7798,60.2063,65.2236c20.8989,6.9713,43.7847,1.9905,57.7152,18.92   c9.9514,12.4475-3.4811,33.3586-6.4702,48.7938c-0.4982,25.3925-30.3461,37.84-27.3632,61.2396   c2.9891,19.9164,19.9028,27.8827,35.328,40.3301c16.4214,12.9442-41.7982,37.8394-22.8917,60.7433   c19.4044,22.4041,47.77,48.2947,37.8126,80.1597c-14.4288,49.2911-42.2964,100.5735-19.4045,138.9115   c22.8917,37.8401,54.7323,60.2443,103.991,70.2002c77.1198,0,154.7438,1.5035,232.3616,1.5035   c26.865,23.4005,45.7714,99.0791,60.7046,200.6459H1633.0017z"/>
        </g>
    </svg>

const Silhouette = (props: {type: SilhouetteType}) => 
    <div>
        {paths[props.type]}
    </div>;

export { Silhouette, SilhouetteType };