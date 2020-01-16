import React from 'react'
import { View, Text } from 'native-base'

const ErrorMessage = ({ errorValue }) => (
  <View>
    <Text>{errorValue}</Text>
  </View>
)

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 25
//   },
//   errorText: {
//     color: 'red'
//   }
// })

export default ErrorMessage