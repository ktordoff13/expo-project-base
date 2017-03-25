import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Welcome Home!</Text>
        <Button
          onPress={() => navigate('Articles', { articles: [1, 2, 3] })}
          title="Articles"
        />
      </View>
    );
  }
}

export class App extends React.Component {
  render() {
    return (
      <Routes />
    );
  }
}

class ArticlesScreen extends React.Component {
  static navigationOptions = {
    title: 'Articles',
  };

  constructor(props) {
      super(props)
      this.state = {
        hasFetched: false,
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      };
    }

  componentDidMount(){
    makeFetch('https://jsonplaceholder.typicode.com/posts').then((data) => {
      this.setState(()=> {
        return {
          hasFetched: true,
          dataSource: this.state.dataSource.cloneWithRows(data)
        };
      })
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hasFetched, dataSource } = this.state;
    return (
      <View style={styles.container}>
        <Text>Articles</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
        {hasFetched ?
          <ListView
              dataSource={dataSource}
              renderRow={(rowData) => <Text>{rowData.title}</Text>}
            />
            : <Loader />
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Routes = StackNavigator({
  Home: { screen: HomeScreen },
  Articles: { screen: ArticlesScreen },
});

//****this is for fetching data*******************************************************

const checkStatus = (response) => {
  if (!response.ok) { // status in the range 200-299 or not
    return Promise.reject(new Error(response.statusText || 'Status not OK'))
  }
  return response
}

const parseJSON = (response) => response.json()

const makeFetch = (url, options) => fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)

class Loader extends React.Component {
  render() {
    return (<Text>Loading...</Text>);
  }
}

Expo.registerRootComponent(App);
