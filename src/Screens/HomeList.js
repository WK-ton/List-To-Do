import React, {useState, useEffect } from "react";
import { View,Text,StyleSheet, Modal, TouchableHighlight, TouchableOpacity,FlatList,alert, Alert } from "react-native";
import ModalComponent from "../components/ModalComponents";
import ListItems from "./ListItems";
import { GlobalStyles } from "../../constants/styles";
import tempData from "../../tempData";
import TodoList from "./TodoList";
import { AntDesign } from '@expo/vector-icons';
import AddListModal from "./AddListModal";
import { EventRegister } from 'react-native-event-listeners';

const HomeList = () => {
    const [todos, setTodos] = useState([])
    const [addTodoVisible, setAddTodoVisible] = useState(false);
    //const [todoInputValue, setTodoInputValue] = useState();

    toggleAddTodoModal = () => {
        setAddTodoVisible(addTodoVisible);
    }

    const [isDarkEnabled, setIsDarkEnabled] = useState(false)
    useEffect(() => {
      const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
        setIsDarkEnabled(data)
        console.log('DarkMode is ' + data)
      })
      return () => {
        EventRegister.removeAllListeners(listener)
      }
    }, [isDarkEnabled])

    return(
        <>
        <View>
            <Modal animationType="slide" 
                    visible={addTodoVisible}
                    onRequestClose = {() => setAddTodoVisible(false)}>
                    <AddListModal 
                    // handleAdd={handleAdd}
                    // todoInputValue={todoInputValue}
                    // setTodoInputValue={setTodoInputValue}
                    todos = {todos}
                    setTodos = {setTodos}

                    closeModal = {() => setAddTodoVisible(false)}      
                    />
            </Modal>
             
        </View>
        <View style= {{backgroundColor: isDarkEnabled ? 'black' : 'white', flex: 20, alignItems: 'center', justifyContent: 'center', }}> 
                <FlatList 
                    data ={tempData}
                    keyExtractor={item => item.name}
                    horizontal ={true}
                    showsHorizontalScrollIndicator={false}          
                    renderItem={({item}) => (
                        <TodoList list={item} />
                    )}
                />
                {/* <TodoList
                todos={todos}
                setTodos={setTodos}
                //handleEdit={handleEdit}
            /> */}
                <View style = {{marginLeft: 380}}>
                    <TouchableOpacity  style = {styles.AddButton} onPress={() => {setAddTodoVisible(true)}}>
                        <AntDesign style = {styles.Add} name="plus" color={'#FFFF'} size={26} />
                    </TouchableOpacity>
                </View>
        </View>
        </>
    )
}
            
    


const styles = StyleSheet.create({
    container: {

    },
    AddButton: {
        width: 77,
        height: 77,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius:100,
        display:'flex',
        bottom:0,
        right:0,
        position:'absolute',
        marginRight: 20,
        marginBottom: 40,
        shadowColor:'#000',
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems:'center',
        justifyContent: 'center',
    },
    Add: {
        width: 29.31,
        height:29.31,
    },
  });
export default HomeList;