import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Articles</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
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

Expo.registerRootComponent(App);
