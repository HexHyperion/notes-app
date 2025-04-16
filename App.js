import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import NoteList from './screens/NoteList';
import AddNote from './screens/AddNote';
import EditNote from './screens/EditNote';
import AddCategory from './screens/AddCategory';
import * as SecureStore from "expo-secure-store";
import Info from "./assets/info-square.png";
import Plus from "./assets/plus-square.png";
import Stickies from "./assets/stickies.png";

const randomColors = ["#770000", "#007700", "#000077", "#777700", "#770077", "#007777"];

export default function App() {
  const Drawer = createDrawerNavigator();

  const [lastId, setLastId] = React.useState(0);
  const [notes, setNotes] = React.useState([]);
  const [categories, setCategories] = React.useState(["test", "test2"]);
  const [isNotesLoaded, setIsNotesLoaded] = React.useState(false);

  const saveNotes = async () => {
    if (!isNotesLoaded) return;
    try {
      await SecureStore.setItemAsync("notes", JSON.stringify(notes));
      await SecureStore.setItemAsync("lastId", JSON.stringify(lastId));
      await SecureStore.setItemAsync("categories", JSON.stringify(categories));
    }
    catch (error) {
      console.error("Failed to save notes:", error);
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await SecureStore.getItemAsync("notes");
      const storedLastId = await SecureStore.getItemAsync("lastId");
      const storedCategories = await SecureStore.getItemAsync("categories");

      if (storedLastId) setLastId(JSON.parse(storedLastId));
      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedCategories) setCategories(JSON.parse(storedCategories));
    }
    catch (error) {
      console.error("Failed to load notes:", error);
    }
    finally {
      setIsNotesLoaded(true);
    }
  };


  React.useEffect(() => {
    loadNotes();
  }, []);

  React.useEffect(() => {
    saveNotes();
  }, [notes]);


  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} style={styles.menu} contentContainerStyle={{display: "flex", justifyContent: "center", height: "100%"}}>
        <Text style={styles.title}>Notes App pt. 2</Text>
        <Text style={styles.subtitle}>Save and delete notes</Text>
        <DrawerItem
          label="Note list"
          labelStyle={styles.menuItem}
          onPress={() => props.navigation.navigate("list")}
          icon={() => <Image style={styles.icon} source={Stickies}/>}
        />
        <DrawerItem
          label="Add note"
          labelStyle={styles.menuItem}
          onPress={() => props.navigation.navigate("add")}
          icon={() => <Image style={styles.icon} source={Plus}/>}
        />
        <DrawerItem
          label="Add category"
          labelStyle={styles.menuItem}
          onPress={() => props.navigation.navigate("addCat")}
          icon={() => <Image style={styles.icon} source={Plus}/>}
        />
        <DrawerItem
          label="Info"
          labelStyle={styles.menuItem}
          onPress={() => Alert.alert("App Info", "NotesApp pt. 2 by Szymon Urbaniak, 3P2")}
          icon={() => <Image style={styles.icon} source={Info}/>}
        />
      </DrawerContentScrollView>
    )
  }

  const drawerOptions = {
    drawerLabelStyle: styles.menuItem,
    drawerActiveBackgroundColor: "#ff000044",
    drawerItemStyle: {borderRadius: 10},
    headerStyle: {backgroundColor: "black"},
    headerTitleStyle: {color: "white", fontFamily: "monospace", fontWeight: "bold"},
    headerTitleAlign: "center",
    headerTintColor: "white"
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>}>

        <Drawer.Screen name="list" options={{
          drawerLabel: "Note list",
          headerTitle: "Note List",
          drawerIcon: () => <Image style={styles.icon} source={Stickies}/>,
          ...drawerOptions
        }}>
          {({navigation}) => (
            <NoteList
              notes={notes}
              setNotes={setNotes}
              lastId={lastId}
              setLastId={setLastId}
              randomColors={randomColors}
              loadNotes={loadNotes}
              saveNotes={saveNotes}
              navigation={navigation}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="add" options={{
          drawerLabel: "Add note",
          headerTitle: "Add note...",
          drawerIcon: () => <Image style={styles.icon} source={Plus}/>,
          ...drawerOptions
        }}>
          {({navigation}) => (
            <AddNote
              notes={notes}
              setNotes={setNotes}
              lastId={lastId}
              setLastId={setLastId}
              randomColors={randomColors}
              navigation={navigation}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="edit" options={{
          drawerLabel: "Edit note",
          headerTitle: "Edit note...",
          ...drawerOptions
        }}>
          {({navigation, route}) => (
            <EditNote
              notes={notes}
              setNotes={setNotes}
              navigation={navigation}
              route={route}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="addCat" options={{
          drawerLabel: "Add category",
          headerTitle: "Add category...",
          drawerIcon: () => <Image style={styles.icon} source={Plus}/>,
          ...drawerOptions
        }}>
          {({navigation}) => (
            <AddCategory
              categories={categories}
              setCategories={setCategories}
              navigation={navigation}
            />
          )}
        </Drawer.Screen>

      </Drawer.Navigator>
      <StatusBar/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "black",
    fontSize: 16,
  },
  menuItem: {
    color: "white",
    fontFamily: "monospace",
  },
  icon: {
    width: 25,
    height: 25
  },
  title: {
    color: "white",
    fontFamily: "monospace",
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 18,
    alignSelf: "center"
  },
  subtitle: {
    color: "#bbb",
    fontFamily: "monospace",
    fontSize: 14,
    position: "absolute",
    top: 55,
    alignSelf: "center"
  }
});
