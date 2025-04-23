import { Button, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import ListItem from '../components/ListItem'

const NoteList = (props) => {
  const notes = props.notes;
  const setNotes = props.setNotes;
  const saveNotes = props.saveNotes;
  const loadNotes = props.loadNotes;

  const screenWidth = Dimensions.get("window").width;
  const padding = 15;
  const gap = 20;
  const itemSize = (screenWidth - padding * 2 - gap) / 2;

  const deleteUser = async (item) => {
    const newNotes = notes.filter((note) => note.id != item.id);
    setNotes(newNotes);
    saveNotes();
  }

  return (
    <FlatList
      key={`flatlist-${2}`}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={notes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({item, index}) => (
        <ListItem
          title={item.title}
          content={item.content}
          date={item.date}
          category={item.category}
          deleteFunc={() => deleteUser(item)}
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
})