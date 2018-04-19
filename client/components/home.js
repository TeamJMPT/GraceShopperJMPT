import React, { Component } from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
    // console.log("homepage props: ", props);
    return (
        <div>
            <section>
                <img className="main-img"src="https://i.imgur.com/mxeb2NK.png" width="50%" height="50%" align="center" />
                <p align="center">Welcome protagonists!</p>
                <p align="center">Choose your quest!</p>
                <p align="center">North or south,</p>
                <p align="center">east or west.</p>
                <p align="center">Go on an adventure.</p>
                <p align="center">Make new friends.</p>
                <p align="center">You'll wish this</p>
                <p align="center">journey never ends.</p>
            </section>
            <hr />
            <section>
                <h2>Featured Quests</h2>
                <p>featured quests place holder</p>
            </section>
        </div>
    )
}

export default Home
