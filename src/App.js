import React, { Component } from 'react';
import './App.css';
import xs from './xs.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import xCard from './components/Card'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        xs: xs,
        unselectedxs: xs
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectx = breed => {
        const findx = this.state.unselectedxs.find(item => item.breed === breed);

        if(findx === undefined) {
            // failure to select a new x
            this.setState({
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                xs: xs,
                unselectedxs: xs
            });
        }
        else {
            // success to select a new x
            const newxs = this.state.unselectedxs.filter(item => item.breed !== breed);

            this.setState({
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                xs: xs,
                unselectedxs: newxs
            });
        }

        this.shuffleArray(xs);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.xs.map(x => (
                        <xCard
                            breed={x.breed}
                            image={x.image}
                            selectx={this.selectx}
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
