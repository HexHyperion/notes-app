import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import { Picker } from '@react-native-picker/picker'

const AddNote = (props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");

  const notes = props.notes;
  const categories = props.categories;
  const setNotes = props.setNotes;
  const lastId = props.lastId;
  const setLastId = props.setLastId;
  const randomColors = props.randomColors;
  const navigation = props.navigation;

  const addNote = async () => {
    const note = {
      id: lastId + 1,
      title: title,
      content: content,
      date: new Date().toLocaleDateString(),
      category: category,
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
        placeholder="Title..."
        placeholderTextColor="#ffffffbb"
        multiline={false}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.longInput}
        defaultValue={content}
        placeholder="Content..."
        placeholderTextColor="#ffffffbb"
        multiline={true}
        onChangeText={(text) => setContent(text)}
      />
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor="white"
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} color="white"
              style={{
                ...styles.pickerItem,
                // borderTopLeftRadius: index == 0 ? 10 : 0,
                // borderTopRightRadius: index == 0 ? 10 : 0,
                // borderBottomLeftRadius: index == categories.length-1 ? 10 : 0,
                // borderBottomRightRadius: index == categories.length-1 ? 10 : 0
              }}
            />
          ))}
        </Picker>
      </View>
      <MyButton color="#ff000099" text="Confirm" pressFunc={addNote}/>
    </View>
  )
}

export default AddNote

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
  pickerWrapper: {
    borderRadius: 10,
    overflow: "hidden"
  },
  picker: {
    backgroundColor: "#1a1a1a",
    color: "white"
  },
  pickerItem: {
    fontFamily: "monospace",
    backgroundColor: "#1a1a1a",
    fontSize: 12
  }
})