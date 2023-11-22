import React, { Component } from 'react';
import Challenge from './challenge';
import Login from './login';
import '../styles/home.css';

class Home extends Component {
  state = {
    challenges: []
  }

  componentDidMount() {
    // send request to get challenges .....
    let retrievedChallenges = [ // test data
      {
        name: "PWN me!",
        id: 1,
        points: 500,
        category: "crypto",
        description: "I wanna be PWNED!!",
        running: false,
        runnable: true
      },
      {
        name: "SQL fun",
        id: 2,
        points: 400,
        category: "web",
        description: "SQL is the greatest thing ever.",
        running: false,
        runnable: false
      }
    ];

    let challengeComponents = [];
    let key = 0;

    retrievedChallenges.forEach(challenge => {
      challengeComponents.push(<Challenge
                                key={key} 
                                challengeID={challenge.id}
                                name={challenge.name}
                                points={challenge.points}
                                category={challenge.category}
                                description={challenge.description}
                                running={challenge.running}
                                runnable={challenge.runnable}
                              />);
      key++;
    });

    this.setState({challenges: challengeComponents});
  }
   
  render() { 
    return (
      <React.Fragment>
        <Login /><br></br>
        {this.state.challenges}
      </React.Fragment>
    );
  }
}
 
export default Home;