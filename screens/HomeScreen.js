import React from "react";
import { AsyncStorage } from "react-native";
import { Container, Button, Text, Content } from "native-base";

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
          <Button warning onPress={this._viewNames}>
            <Text>View Names in Store</Text>
          </Button>
          <Button info onPress={this._signOutAsync}>
            <Text>Actually, sign me out :)</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _viewNames = () => this.props.navigation.navigate("Names");
  
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

export default HomeScreen;
