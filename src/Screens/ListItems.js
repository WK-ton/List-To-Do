import React, { useState, useEffect } from "react";
import { Text,View,StyleSheet,Button ,TouchableOpacity} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { GlobalStyles } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';

const ListItems = ({handleEdit, todos ,setTodos}) => {

    const [swipedRow, setSwipedRow] = useState(null);

    const handleDelete = (rowMap, rowKey) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
        newTodos.splice(todoIndex,1);
        setTodos(newTodos);

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
    <View style = {{marginTop: 120}}>
        {todos.length == 0 && 
            <>
        <Feather style ={{marginBottom:10, marginLeft: 60}} name="x-circle" size={50} color="#54B4EA" />
        <Text style ={{textAlign: "center", color: isDarkEnabled ? '#fafafa' : '#000'}}> You have no lists 😤 </Text>
        <Text style ={{fontSize: 10, padding: 10, color: isDarkEnabled ? '#fafafa' : '#000'}}> Press the + button to create one </Text>
            </>
        }
        {todos.length != 0 &&
        
        <SwipeListView 
            data={todos}
            renderItem={(data) => {
                const RowText = data.item.key == swipedRow ? SwipeListView : Text
                return (
                <View style = {{
                    height: 85, marginBottom: 40,
                    shadowColor: GlobalStyles.colors.primary50,
                    shadowOffset: {
                        width:0,
                        height:2,
                    },
                    shadowOpacity: 0.35,
                    shadowRadius: 3,
                    }}
                >
                    <TouchableOpacity style = {[styles.container, {backgroundColor: isDarkEnabled ? '#303030' : 'white'}]}
                        underlayColor={""}
                        onPress={() => {
                            
                        }}
                    >
                        <>
                        <RowText style = {[styles.title, {color: isDarkEnabled ? '#fff' : '#000'}]}>{data.item.title}</RowText>      
                        <Text style = {[styles.titledate, {color: isDarkEnabled ? '#fff' : '#000'}]}>{data.item.date}</Text>
                        
                        </>
                    </TouchableOpacity>  
                </View>
                )
            }}
            renderHiddenItem={(data,rowMap) => {
                return (
                <View style = {styles.hiddenView}>
                    <TouchableOpacity  style = {styles.hiddenButton} onPress= {()=> handleDelete(rowMap, data.item.key)} >
                            <Feather name="trash" size={24} color="#FFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity  style = {[styles.hiddenButton,{padding: 10}]} onPress= {()=> handleEdit(data.item)} >
                            <Feather name="edit" size={24} color="#FFFF" />
                    </TouchableOpacity>
                </View>
                )
            }}
            leftOpenValue={80}
            previewRowKey={"1"}
            previewOpenValue={3000}
            disableLeftSwipe={true}
            showsVerticalScrollIndicator={false}
            style ={{
                flex: 1,paddingBottom: 30, marginBottom: 40
            }}
            onRowOpen={(rowKey) => {
                setSwipedRow(rowKey);

            }}
            onRowClose={() => {
                setSwipedRow(null);
            }}
            />
            
            }
        </View>
    );
}

export default ListItems;

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        width: 350,
        padding: 15,
        justifyContent: 'space-around',
        marginBottom: 15,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#F5F5F5",
        borderLeftWidth: 1,
        borderLeftColor: "GlobalStyles.colors.primary50",
      },
    title: {
        fontSize: 16,
        letterSpacing: 1,
        color: "black"
      },
    titledate: {
        fontSize: 10,
        letterSpacing: 1,
        color: "black",
        textAlign: 'right',
        textTransform: 'uppercase',
    },
    hiddenView: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        //marginTop: 50,
        marginBottom: 15,
        borderRadius: 10,   
        backgroundColor: GlobalStyles.colors.primary50,
    },
    hiddenButton: {
        //marginTop: 50,
        width: '15%',
        alignItems: 'center',
      },
    swipedtext: {
        color: "black",
        fontStyle: "italic",
        textDecoration: 'line-through'
    }

});