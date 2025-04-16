import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'

const AddCategory = (props) => {
  const [name, setName] = React.useState("");

  const categories = props.categories;
  const setCategories = props.setCategories;
  const navigation = props.navigation;

  const addCategory = async () => {
    setCategories(...categories, name);
    setName("");
    navigation.navigate("list");
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        defaultValue={name}
        placeholder="Name..."
        placeholderTextColor="#ffffffbb"
        multiline={false}
        onChangeText={(text) => setName(text)}
      />
      <MyButton color="#ff000099" text="Confirm" pressFunc={addCategory}/>
    </View>
  )
}

export default AddCategory

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    fontFamily: "monospace",
    color: "white"
  },
  input: {
    fontFamily: "monospace",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 10,
    height: "auto",
    fontSize: 12
  },
  longInput: {
    fontFamily: "monospace",
    color: "white",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 10,
    height: "auto",
    fontSize: 12
  },
})