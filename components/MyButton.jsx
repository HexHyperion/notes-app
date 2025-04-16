import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MyButton = ({style, color, text, pressFunc}) => {
  return (
    <TouchableOpacity onPress={pressFunc}
      style={{
        borderRadius: 10,
        backgroundColor: color,
        padding: 8,
        minWidth: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}>
      <Text style={{
        fontFamily: "monospace",
        fontWeight: "bold",
        color: "white",
        fontSize: 12
      }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({})