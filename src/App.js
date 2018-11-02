import React, { Component } from 'react';

// import axios from "axios";
// import CardList from "./components/CardList/CardList";

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import ChannelList from './components/ChannelList/ChannelList';

import styles from './styles/App.module.scss';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:7700/graphql'
});

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    };
  }

  // componentDidMount() {
  //   this.getMembers();
  // }

  // getMembers = () => {
  //   const apiToken =
  //     "xoxp-3360794059-324357511009-331680175990-6fff8ab91a18c1c9f743870cd510af46";
  //   const api = `https://slack.com/api/users.list?token=${apiToken}&include_locale=true&presence=true&pretty=1`;

  //   axios
  //     .get(api)
  //     .then(response => {
  //       this.setState({
  //         members: response.data.members
  //       });
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
  // };

  render() {
    return (
      <ApolloProvider client={client}>
        <main className={styles.app}>
          <header className={styles.appHeader}>
            <h1>Slouck</h1>
          </header>
          {/* <CardList members={this.state.members} /> */}
          <ChannelList />
        </main>
      </ApolloProvider>
    );
  }
}

export default App;
