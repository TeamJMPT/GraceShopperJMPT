import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Home = (props) => {
    const welcomeMessage = "Welcome protagonists!\nChoose your quest!\nNorth or south,\neast or west.\n \nGo on an adventure.\nMake new friends.\nYou'll wish this\njourney never ends."
    console.log("homepage props: ", props);
    return (
        <div>
            <section>
                <img src="https://i.imgur.com/mxeb2NK.png" />
                <p>{welcomeMessage}</p>
            </section>
            <hr />
            <section>
                <h2>Featured Quests</h2>
                <p>featured quests place holder</p>
            </section>
        </div>
    )
}
