import React, { Component } from 'react';
import axios from 'axios';
import Challenge from './challenge';
import Login from './login';
import { getCookie } from '../utils/cookies';
import { TUPRWARE_ENDPOINT } from '../utils/endpoints';
import '../styles/home.css';

class Home extends Component {
  state = {
    challenges: []
  }

  async componentDidMount() {
    try {
      const response = await axios.post(TUPRWARE_ENDPOINT + '/get-challenges', null, {
        headers: {
          'Authorization': `Bearer ${getCookie('uoctfjwt')}`
        }
      });

      let challengeComponents = [];
      let key = 0;

      response.data.forEach(challenge => {
        challengeComponents.push(
          <Challenge
            key={key} 
            challengeID={challenge.id}
            name={challenge.name}
            points={challenge.points}
            category={challenge.category}
            description={challenge.description}
            running={challenge.running}
            runnable={challenge.runnable}
            instance_port={challenge.instance_port}
          />
        );
        key++;
      });

      this.setState({challenges: challengeComponents});
    }
    catch (err) {
      alert('Please sign in with your Discord to access the challenges!');
      console.log(err);
    }
  }
   
  render() { 
    return (
      <React.Fragment>
        <h1>uOCTF Portal</h1>
        {getCookie('uoctfjwt') ? null : <React.Fragment><Login /><br></br></React.Fragment>}
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {this.state.challenges}
        </div>
      </React.Fragment>
    );
  }
}
 
export default Home;