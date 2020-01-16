import React from "react";
import { connect } from "react-redux";
import { Container, Content, Text } from "native-base";
const getState = state => ({ names: state.names });

function NamesScreen({ names }) {
  return (
    <Container>
      <Content>
        <Text>Total items in store: {names.length}</Text>
        {names.map((x, index) => (
          <Text key={`name-idx-${index}`}>{x}</Text>
        ))}
      </Content>
    </Container>
  );
}

export default connect(getState)(NamesScreen);
