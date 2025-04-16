import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'

const AddCategory = (props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const notes = props.notes;
  const setNotes = props.setNotes;
  const lastId = props.lastId;
  const setLastId = props.setLastId;
  const randomColors = props.randomColors;
  const navigation = props.navigation;

  const addCategory = async () => {
    const note = {
      id: lastId + 1,
      title: title,
      content: content,
      date: new Date().toLocaleDateString(),
      color: randomColors[Math.floor(Math.random() * randomColors.length)]
    }
    setNotes([...notes, note]);
    setLastId(lastId + 1);
    setTitle("");
    setContent("");
    navigation.navigate("list");
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        defaultValue={title}
        placeholder="Name..."
        placeholderTextColor="#ffffffbb"
        multiline={false}
        onChangeText={(text) => setTitle(text)}
      />
      <MyButton color="#ff000099" text="Confirm" pressFunc={addNote}/>
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