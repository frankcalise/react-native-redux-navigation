import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {
  ActivityIndicator,
  //Button,
  AsyncStorage,
  StatusBar,
  StyleSheet
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Text,
  Content,
  View,
  Left
} from "native-base";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import AddTaskScreen from "./screens/AddTaskScreen";

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._signInAsync}>
          <Text>Sign in!</Text>
        </Button>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  render() {
    return (
      <Container>
        <Content>
          <Button primary onPress={this._showMoreApp}>
            <Text>Show me more of the app</Text>
          </Button>
          <Button success onPress={this._goToForm}>
            <Text>Add Form</Text>
          </Button>
          <Button info onPress={this._signOutAsync}>
            <Text>Actually, sign me out :)</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _goToForm = () => {
    this.props.navigation.navigate("Add");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: "Lots of features here"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._signOutAsync}>
          <Text>I'm done, sign me out</Text>
        </Button>
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const AppStack = createDrawerNavigator(
  { Home: HomeScreen, Other: OtherScreen, Add: AddTaskScreen },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => ({
      title: "Frank's App",
      headerLeft: () => (
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
      )
    })
  }
);
const RootStack = createStackNavigator({
  AppStack: {
    screen: AppStack
  }
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <AppContainer />;
  }
}

// export default createAppContainer(App);
export default App;
