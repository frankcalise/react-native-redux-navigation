import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet
} from "react-native";
import {
  Button,
  Text,
  View,
} from "native-base";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OtherScreen