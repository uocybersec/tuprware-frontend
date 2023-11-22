import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/challenge.css';

class Challenge extends Component {
  state = {
    runnable: false,
    running: false,
    address: null,
    challengeID: null
  } 

  constructor(props) {
    super(props);

    const {running, runnable, challengeID} = props;
    this.state.running = running;
    this.state.runnable = runnable;
    this.state.challengeID = challengeID;

    this.spawnChallenge = this.spawnChallenge.bind(this);
    this.stopChallenge = this.stopChallenge.bind(this);
    this.restartChallenge = this.restartChallenge.bind(this);
  }

  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  spawnChallenge = async () => {
    console.log((this.state.challengeID).toString());
    try {
      const response = await axios.post('https://ctf.uocybersec.com/spawn-challenge', {
        challenge_id: (this.state.challengeID).toString()
      }, {
        headers: {
          'Authorization': `Bearer ${this.getCookie('token')}`
        }
      });

      const challengeAddress = 'https://' + response.data['instance_port'] + '.uocybersec.com';
      this.setState({address: challengeAddress});
      this.setState({running: true}); 
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
  }

  stopChallenge = async () => {
    try {
      await axios.post('https://ctf.uocybersec.com/stop-challenge', null, {
        headers: {
          'Authorization': `Bearer ${this.getCookie('token')}`
        }
      });

      this.setState({address: null});
      this.setState({running: false}); 
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
  }

  restartChallenge = async () => {
    try {
      const response = await axios.post('https://ctf.uocybersec.com/restart-challenge', null, {
        headers: {
          'Authorization': `Bearer ${this.getCookie('token')}`
        }
      });

      const challengeAddress = 'https://' + response.data['instance_port'] + '.uocybersec.com';
      this.setState({address: challengeAddress});
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
  }

  render() { 
    const {name, points, category, description} = this.props;

    return (
      <div className="challenge-wrapper">
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{category} - {points} points</Card.Subtitle>
            <Card.Text>{description}</Card.Text>

            <div style={{display: this.state.runnable ? 'block' : 'none'}}>
              <Button 
                variant={this.state.running ? "danger" : "success"}
                onClick={this.state.running ? this.stopChallenge : this.spawnChallenge}
              >
                {this.state.running ? "Stop" : "Spawn"}
              </Button> 

              {" "}

              {this.state.running ? <Button onClick={this.restartChallenge}>Restart</Button> : null}
            </div>
            <Card.Link href={this.state.address} target="_blank">{this.state.address}</Card.Link>

            {/*<Card.Link href="#">Download required files</Card.Link>
            <Card.Link href="#">Submit flag</Card.Link> {/* redirect them to CTFd */}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
 
export default Challenge;