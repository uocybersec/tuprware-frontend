import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  state = {} 


  login = () => {
    const oauthUrl = "https://discord.com/api/oauth2/authorize?client_id=1176559679669801040&redirect_uri=http%3A%2F%2F174.94.4.145%3A8081%2Fcallback&response_type=code&scope=identify";
    window.location = oauthUrl;
  }

  render() { 
    return (
      <div>
        <Button 
          style={{backgroundColor: '#5864f2'}}
          onClick={this.login}
        >
          Login with Discord
        </Button>
      </div>
    );
  }
}
 
export default Login;