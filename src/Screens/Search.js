import React, { useState,useEffect } from "react";
import { View, StyleSheet,SafeAreaView,TextInput,Text, TouchableHighlight, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItems from "./ListItems";
import { EventRegister } from 'react-native-event-listeners';

const Search = ({handleEdit, setModalVisible}) => {
    const [filterData, setfilterData] = useState({})
    const [todos, setTodos] = useState(['todos'])
    const [search, setSearch] = useState(''); 

    const getTodos = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if(todos != null){
                setTodos(JSON.parse(todos));
                setfilterData(JSON.parse(todos));
            }
        }catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getTodos();
        //setTodos('todos');
    },[]);


    const searchFilter = (text) => {
        if (text) {
            const newData = todos.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;
            });
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(todos);
            setSearch(text);
        }
    }

    const [isDarkEnabled, setIsDarkEnabled] = useState(false)
    useEffect(() => {
      const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
        setIsDarkEnabled(data)
      })
      return () => {
        EventRegister.removeAllListeners(listener)
      }
    }, [isDarkEnabled])

    return (
        <SafeAreaView style={{flex: 1}}>
        <View style = {[styles.container,  {backgroundColor: isDarkEnabled ? '#111' : 'white'}]}> 
            <TextInput style={[styles.textInput,  {backgroundColor: isDarkEnabled ? '#1c1c1c' : 'white'}]}
            value={search}
            placeholder="Search for a list"
            underlineColorAndroid="transparent"
            onChangeText ={(text) => searchFilter(text)}
            >
            </TextInput>
            <ListItems 
                todos={filterData}
                setTodos={setfilterData} 
            />    
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFF"
    },
    textInput: {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 20,
        marginTop: 150,
        borderColor: "black",
        backgroundColor: '#FFFF'
    }
})

export default Search;