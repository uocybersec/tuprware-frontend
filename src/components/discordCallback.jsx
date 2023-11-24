import { Component } from 'react';
import axios from 'axios';
import { TUPRWARE_ENDPOINT } from '../utils/endpoints';

class DiscordCallback extends Component {
  state = {}

  async componentDidMount() {
    const discordTmpCode = new URLSearchParams(window.location.search).get('code');
    const response = await axios.post(TUPRWARE_ENDPOINT + '/login', {
      code: discordTmpCode
    });
    
    if (response.status === 200) {
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