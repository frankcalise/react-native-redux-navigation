import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Content,
  View,
  Text,
  Button,
  InputGroup,
  Input
} from "native-base";
import { StyleSheet } from "react-native";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters")
});

export default function AddTaskScreen({}) {
  async function handleSubmit(values, actions) {
    const { name } = values;
    try {
      console.log("do something with name!", name);
    } catch (error) {}
  }
  return (
    <Container>
      <Content>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
            <>
              <ErrorMessage errorValue={touched.name && errors.name} />
              <InputGroup borderType="regular">
                <Input
                  placeholder="Enter name..."
                  name="name"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />
              </InputGroup>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  <Text>Add</Text>
                </Button>
              </View>
            </>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  }
});
