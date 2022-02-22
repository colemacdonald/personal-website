import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div className="tab-content">
                <h2>Welcome!</h2>
                <p>Thanks for coming you might be the first person here...</p>
                <p>Clearly a work in progress but thanks for checking it out.</p>
                <p>While your here, try your hand at a highscore in Yeezy the Wize!</p>
                <a href="/wize">Play Now!</a>
            </div>
        );
    }
}

export default Home;
