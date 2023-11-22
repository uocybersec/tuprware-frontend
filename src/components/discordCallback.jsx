import React, { Component } from 'react';
import axios from 'axios';

class DiscordCallback extends Component {
  state = {}

  async componentDidMount() {
    const discordTmpCode = new URLSearchParams(window.location.search).get('code');
    const response = await axios.post('http://ctf.uocybersec.com/login', {
      code: discordTmpCode
    });
    
    if (response.status === 200) {
      alert(response.data);
      document.cookie = `token=${response.data}`;
      window.location = '/';
    } else {
      alert('Something went wrong...');
    }
  }

  render() { 
    return null;
  }
}
 
export default DiscordCallback;