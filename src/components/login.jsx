import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  state = {} 


  login = () => {
    const oauthUrl = "https://discord.com/api/oauth2/authorize?client_id=1176559679669801040&redirect_uri=https%3A%2F%2Fui.uocybersec.com%2Fcallback&response_type=code&scope=identify";
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