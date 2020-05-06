import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './components/Landing';
import Auth from './components/Auth';

import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Biconomy from "@biconomy/mexa";
import Web3 from "web3";


 

const biconomy = new Biconomy(window.ethereum, {apiKey: "P7v8fGV15.273b596b-2136-45a0-8353-da68ccdc849a", strictMode: true});
const web3 = new Web3(biconomy);



biconomy.onEvent(biconomy.READY, () => {

  if(biconomy.isLogin) {
    console.log("User is already logged in");
  } else {
    console.log("User is not logged in to biconomy");
    // Login user here  
  }
  
 // Initialize your dapp here
}).onEvent(biconomy.ERROR, (error, message) => {
 // Handle error while initializing mexa
});

biconomy.login("0xd7C9bab7b63304E793Ae6e508954AAe023df1735", (error, response) => {
 if(error) {
 // Error while user login to biconomy
 return;
 }
 
 if(response.transactionHash) {
 // First time user. Contract wallet transaction pending. Wait for confirmation.
 } else if(response.userContract) {
 // Existing user login successful
 }
});

biconomy.onEvent(biconomy.LOGIN_CONFIRMATION, (log) => {
 // User's Contract Wallet creation successful
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      isConnected: false, peers: 0, version: ''
    };
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }


    if(this.web3 && this.web3.isConnected) {
      this.setState({isConnected: true});
      if(this.web3.net.listening) {
        this.setState({peers: this.web3.net.peerCount});
      }
      this.setState({version: this.web3.version.node})
    }
  }


  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">

      {/*<div>
        <h2>Is connected?:</h2><br/> {this.state.isConnected?'Connected to local node':'Not Connected'}
        <br/>
        <br/>
        <h2>The number of peers:</h2><br/> {this.state.peers}
        <br/>
        <br/>
        <h2>Node info:</h2><br/> {this.state.version}
      </div>*/}

<Router>
      <div className='App'>
        <Switch>
          <Route exact path="/" component={ Landing } />
          {//<Route path="/idk" component={ Auth } />
  }
        </Switch>
      </div>
    </Router>


        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>

       
      </div>
    );
  }
}

export default App;