import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import React from 'react'

const ListItem = ({title, content, date, category, deleteFunc, style, index, navigation, route}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("edit", {noteIndex: index, route: route});
      }}
      onLongPress={() => {
        Alert.alert("Delete note?", "Are you sure you want to delete this note?", [
          {text: "Cancel", onPress: () => {}},
          {text: "Delete", onPress: deleteFunc}
        ]);
      }}
      style={{...styles.wrapper, ...style}}
    >
      <View style={{...styles.insideWrapper, paddingTop: category ? 25 : 0}}>
        {category ?
          <View style={styles.category}>
            <Text style={{...styles.text, color: style.backgroundColor, fontWeight: 900, fontSize: 10}}>{category}</Text>
          </View>
        : null}
        <Text style={{...styles.text, fontWeight: "bold", fontSize: 14}}>{title}</Text>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{content}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default ListItem

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    overflow: "hidden"
  },
  insideWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 12
  },
  date: {
    fontFamily: "monospace",
    color: "white",
    position: "absolute",
    top: 0,
    right: 0,
  },
  category: {
    position: "absolute",
    display: "flex",
    paddingInline: 5,
    paddingBlock: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 5
  }
})