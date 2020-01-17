import React from "react";
import { AppLoading } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createStore, combineReducers, applyMiddleware } from "redux";
import * as Font from "expo-font";
import { Button, Icon, Left } from "native-base";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import AddTaskScreen from "./screens/AddTaskScreen";
import SignInScreen from "./screens/SignInScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import OtherScreen from "./screens/OtherScreen";
import HomeScreen from "./screens/HomeScreen";
import NamesScreen from "./screens/NamesScreen";
import { AsyncStorage } from "react-native";
import { persistReducer, persistStore } from "redux-persist";

function namesReducer(state = [], action) {
  // reducer
  switch (action.type) {
    case "names/ADD":
      return [...state, action.payload];
    default:
      return state;
  }
}

const persistConfig = {
  key: "names",
  storage: AsyncStorage
};

const reducers = combineReducers({ names: namesReducer });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(createLogger()));
const persistor = persistStore(store);

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Other: OtherScreen,
    Add: AddTaskScreen,
    Names: NamesScreen
  },
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

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

// export default createAppContainer(App);
export default App;
