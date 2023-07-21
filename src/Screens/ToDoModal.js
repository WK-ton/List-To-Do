import React,{useEffect, useState} from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image,FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";
import ModalComponent from "../components/ModalComponents";
import ListItems from "./ListItems";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ToDoModal = ({ closeModal }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const [todos, setTodos] = useState({initialTodos});

    const initialTodos = [];

    const [todoInputValue, setTodoInputValue] = useState();

    useEffect(() => {
        getTodos();
    },[]);

    useEffect(() => {
        saveTodo(todos);
    }, [todos]);


    //AsyncStorage
    const saveTodo = async (todos) => {
        try {
            const stringifyTodos = JSON.stringify(todos);
            await AsyncStorage.setItem("todos", stringifyTodos)
        } catch(error)  {
            console.log(error);
        }
    }



    const getTodos = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if(todos != null){
                setTodos(JSON.parse(todos));
            }
        }catch (error) {
            console.log(error)
        }
    };

    //add to do
    const handleAddTodo = (todo) => {
        console.log('todo name : ', todo)
        const newTodos = [...todos, todo];
        setTodos(newTodos);
        setModalVisible(false);
    }

    //Editing
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    }
    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableOpacity style={{ position: 'absolute', top: 64, alignItems:'center' }} 
                onPress={closeModal}
            >
                {/* Logo */}
                <Image style={{width: 50, height: 50, resizeMode: 'cover',}} source={require('../../assets/Logo.jpg')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32, }} onPress={closeModal}>
                <AntDesign name="close" size={24} color={'black'} />
            </TouchableOpacity>

            <ListItems
                todos={todos}
                setTodos={setTodos}
                handleEdit={handleEdit}
            />
            <ModalComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todos={todos}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                
            />
        </KeyboardAvoidingView>
    )
}
export default ToDoModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        alignSelf: 'center',
        marginBottom: 16,
    },
    AddButton: {
        width: 77,
        height: 77,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 100,
        display: 'flex',
        bottom: 0,
        right: 0,
        position: 'absolute',
        marginRight: 20,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Add: {
        width: 29.31,
        height: 29.31,
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    }
});