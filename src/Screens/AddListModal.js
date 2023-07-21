import React, { useState } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import tempData from "../../tempData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddListModal = ({closeModal,todos, setTodos}) => {
    const backgroundColor = ["#5CD859", "#24A609", "#595BD9", "#54B4EA",  "#15CDCA", "#4FE086"];
    const [text, setText] = useState("");
    const [color, setColor] = useState(backgroundColor[0]);
    //const [todos, setTodos] = useState(['todos'])
    
const createTodo = (todo) => {
    console.log('todo name : ', todo)
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    closeModal(
    Alert.alert("Successful ✌️")
    );
}

    const renderColor = () => {
        return backgroundColor.map(color => {
            return (
                <>
                <TouchableOpacity 
                key ={color} 
                style={[styles.colorSelect, {backgroundColor: color}]} 
                onPress = {() => setColor(color)}
                />
            </>
            )
        })
    }
    // const handleSubmit = ({datePicked}) => {
    //     console.log(todoInputValue)
    //     if(!todoInputValue){
    //         Alert.alert("Please insert a list name ⚠️")
    //     }else {
    //     handleAdd({   
    //         title: todoInputValue,
    //         date: Date(datePicked).toString(),
    //         key: `${(todos[todos.length-1] && parseInt(todos[todos.length -1].key) +1) || 1 }`
    //     })
    //     } 
    //     setTodoInputValue("");
    // }
        return (
            <>
            <KeyboardAvoidingView style = {styles.container} behavior="padding">
                <TouchableOpacity style = {{position: 'absolute', top: 64, right: 32,}} onPress={closeModal}>
                    <AntDesign name="close" size={24} color = {'black'} />
                </TouchableOpacity>
            <View style = {{ alignSelf: "stretch", marginHorizontal: 32}}>
                <Text style = {styles.title}>TO DO LIST</Text>
                <TextInput 
                    style = {styles.input} 
                    placeholder="title"
                    value={text} 
                    onChangeText= {(text) => setText(text)}
                />
                <View style = {{flexDirection: "row",justifyContent: "space-between",marginTop: 12}}>
                    {renderColor()}
                </View>

                <TouchableOpacity 

                style = {[styles.create, {backgroundColor: color}]} 
                onPress = {createTodo }>
                <Text style={{color: "#FFF", fontWeight:"600"}}>Create</Text>

                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            </>
            
        )
    }

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize:28,
        fontWeight:"800",
        alignSelf: 'center',
        marginBottom:16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'blue',
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop:24,
        height: 50,
        borderRadius:6,
        alignItems:'center',
        justifyContent:"center",
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    }
})
export default AddListModal;