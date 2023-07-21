import { StyleSheet, Text, View, SafeAreaView,FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import ListItems from './ListItems'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';
import { EventRegister } from 'react-native-event-listeners';

const ListTotal = () => {
    const [todos, setTodos] = useState(['todos'])

    const handleDelete = (rowMap, rowKey) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
        newTodos.splice(todoIndex,1);
        setTodos(newTodos);

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

    useEffect(() => {
        getTodos('todos');
    },[todos]);


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

  return (
        <SafeAreaView style={{flex: 1}}>
        <View style = {{ backgroundColor: isDarkEnabled ? 'black' : 'white',flex: 1, justifyContent: 'center', alignItems: 'center',}}> 
            <Text style={[styles.textInput]}> Total List </Text>
            {<ListItems 
                todos={todos}
                setTodos={setTodos}
            />} 

                            {/* <FlatList 
                    data ={todos}
                    keyExtractor={item => item.title}
                    horizontal ={true}
                    showsHorizontalScrollIndicator={false}          
                    renderItem={({item}) => (
                        <TodoList list = {item}/>
                        
                    )}
                /> */}
        </View>
        </SafeAreaView>
  )
}

export default ListTotal

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: GlobalStyles.colors.primary50,
        borderWidth: 10,
        marginTop: 120,
        borderColor: GlobalStyles.colors.primary50,
        backgroundColor: '#FFFF',
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 500,
    }

})