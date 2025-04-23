import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import MyButton from '../components/MyButton'
import { Picker } from '@react-native-picker/picker'

const EditNote = ({route, ...props}) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  
  const noteIndex = route.params.noteIndex;
  const notes = props.notes;
  const categories = props.categories;
  const setNotes = props.setNotes;
  const navigation = props.navigation;

  const editNote = () => {
    setNotes(notes.map((note, index) => {
      if (index == noteIndex) {
        return {
          id: note.id,
          title: title,
          content: content,
          date: note.date,
          category: category,
          color: note.color
        }
      }
      else return note;
    }));
    setTitle("");
    setContent("");
    navigation.navigate("list");
  }

  
  useEffect(() => {
    setTitle(notes[noteIndex].title);
    setContent(notes[noteIndex].content);
    setCategory(notes[noteIndex].category);
  }, [noteIndex])

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
          selectedValue={notes[noteIndex].category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} color="white" style={styles.pickerItem}/>
          ))}
        </Picker>
      </View>
      <View style={styles.buttonWrapper}>
        <MyButton style={styles.button} color="#1a1a1a" text="Cancel" pressFunc={() => {
          setTitle(notes[noteIndex].title);
          setContent(notes[noteIndex].content);
          setCategory(notes[noteIndex].category)
          navigation.navigate("list");
        }}/>
        <MyButton style={styles.button} color="#ff000099" text="Confirm" pressFunc={editNote}/>
      </View>
    </View>
  )
}

export default EditNote

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
  buttonWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  button: {
    flex: 1
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