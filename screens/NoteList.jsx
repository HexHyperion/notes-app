import { Button, StyleSheet, Text, View, FlatList, Dimensions, TextInput } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import ListItem from '../components/ListItem'

const NoteList = (props) => {
  const [tempNotes, setTempNotes] = React.useState([]);
  const notes = props.notes;
  const setNotes = props.setNotes;
  const saveNotes = props.saveNotes;
  const loadNotes = props.loadNotes;

  const screenWidth = Dimensions.get("window").width;
  const padding = 15;
  const gap = 20;
  const itemSize = (screenWidth - padding * 2 - gap) / 2;

  React.useEffect(() => {
    setTempNotes(notes);
  }, [notes])

  const deleteNote = async (item) => {
    const newNotes = notes.filter((note) => note.id != item.id);
    setNotes(newNotes);
    saveNotes();
  }
  
  const searchNotes = (text) => {
    setTempNotes(notes.filter(note => (note.title.includes(text) || note.content.includes(text) || note.category.includes(text))))
  }

  return (
    <View style={{backgroundColor: "black", height: "100%"}}>
      <TextInput 
        style={{...styles.textInput, marginInline: padding, marginBlock: 5}}
        placeholder="Search notes..."
        placeholderTextColor="#ffffffbb"
        onChangeText={(text) => searchNotes(text)}
      />
      {tempNotes.length > 0 ?
        <FlatList
          key={`flatlist-${2}`}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={tempNotes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({item, index}) => (
            <ListItem
              title={item.title}
              content={item.content}
              date={item.date}
              category={item.category}
              deleteFunc={() => deleteNote(item)}
              navigation={props.navigation}
              index={index}
              route={props.route}
              style={{
                width: itemSize,
                height: itemSize,
                backgroundColor: item.color,
              }}
            />
          )}
        />
      : null}
    </View>
  )
}

export default NoteList

const styles = StyleSheet.create({
  list: {
    backgroundColor: "black",
  },
  listContainer: {
    paddingHorizontal: 5
  },
  textInput: {
    backgroundColor: "#1a1a1a",
    fontFamily: "monospace",
    color: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    height: "auto"
  }
})