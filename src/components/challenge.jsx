import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import {getCookie} from '../utils/cookies';
import {TUPRWARE_ENDPOINT, CHALLENGES_ENDPOINT} from '../utils/endpoints';
import '../styles/challenge.css';

class Challenge extends Component {
  state = {
    runnable: false,
    running: false,
    address: null,
    challengeID: null,
    loading: false
  } 

  constructor(props) {
    super(props);

    const {running, runnable, challengeID, instance_port} = props;
    this.state.running = running;
    this.state.runnable = runnable;
    this.state.challengeID = challengeID;
    this.state.address = instance_port ? CHALLENGES_ENDPOINT + ':' + instance_port : null

    this.spawnChallenge = this.spawnChallenge.bind(this);
    this.stopChallenge = this.stopChallenge.bind(this);
    this.restartChallenge = this.restartChallenge.bind(this);
  }

  spawnChallenge = async () => {
    console.log((this.state.challengeID).toString());
    this.setState({loading: true});
    try {
      const response = await axios.post(TUPRWARE_ENDPOINT + '/spawn-challenge', {
        challenge_id: (this.state.challengeID).toString()
      }, {
        headers: {
          'Authorization': `Bearer ${getCookie('uoctfjwt')}`
        }
      });

      const challengeAddress = CHALLENGES_ENDPOINT + ':' + response.data['instance_port'];
      this.setState({address: challengeAddress});
      this.setState({running: true}); 
      window.location.reload();
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
    this.setState({loading: false});
  }

  stopChallenge = async () => {
    this.setState({loading: true});
    try {
      await axios.post(TUPRWARE_ENDPOINT + '/stop-challenge', null, {
        headers: {
          'Authorization': `Bearer ${getCookie('uoctfjwt')}`
        }
      });

      this.setState({address: null});
      this.setState({running: false}); 
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
    this.setState({loading: false});
  }

  restartChallenge = async () => {
    this.setState({loading: true});
    try {
      const response = await axios.post(TUPRWARE_ENDPOINT + '/restart-challenge', null, {
        headers: {
          'Authorization': `Bearer ${getCookie('uoctfjwt')}`
        }
      });

      const challengeAddress = CHALLENGES_ENDPOINT + ':' + response.data['instance_port'];
      this.setState({address: challengeAddress});
    }
    catch (err) {
      alert(err.request.response);
      console.log(err.request.response);
    }
    this.setState({loading: false});
  }

  render() { 
    const {name, points, category, description} = this.props;

    return (
      <div className="challenge-wrapper">
        <Card style={{ width: '20rem', height: '20rem' }}>
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

            <ThreeDots 
              height="71" 
              width="71" 
              color="#4fa94d" 
              ariaLabel="three-dots-loading"
              visible={this.state.loading}
            />

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