import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View ,TouchableOpacity, Modal} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoModal from "./ToDoModal";
import { EventRegister } from 'react-native-event-listeners';

export default TodoList = ({list}) => {
    //const [todos , setTodos] = useState([tempData])
    const [showListVisible, setShowListVisible] = useState(false)

    const toggleListModal = () => {
        setShowListVisible(showListVisible);
    }
    const completedCount =list.todos.filter(todo => todo.completed).length;
    const remainingCount =list.todos.length - completedCount;

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
        <>
        <Modal 
        animationType="slide" 
        visible = {showListVisible}
        onRequestClose = {() => setShowListVisible(false)}>
            <ToDoModal list={list} closeModal={() => setShowListVisible(false)} />
        </Modal>
        <TouchableOpacity style={[styles.listContainer, {backgroundColor: isDarkEnabled ? '#202020' : 'white'}]} onPress={() => setShowListVisible()}>
            <Text style = {[styles.listText, {fontWeight: 'bold',} ]}numberOfLines = {1} >
                {list.name} 
                </Text>
            <View>
                <View>
                    <Text style = {styles.listText}>{completedCount} / {remainingCount} item</Text>
                </View>

            </View>
        </TouchableOpacity>
        </>
       
    )
}
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 6,
        height: 100,
        width: 390,
       // alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 1
        }
      },
    listText: {
        marginTop: 20,
        paddingLeft: 50,
        fontSize: 16,
        letterSpacing: 1,
        color: "black",
        //alignItems: 'center'
            
    },
})

// import React, { useState, useEffect } from "react";
// import { Text,View,StyleSheet,Button ,TouchableOpacity, Modal} from "react-native";
// import { SwipeListView } from "react-native-swipe-list-view";
// import { GlobalStyles } from "../../constants/styles";
// import { Feather } from '@expo/vector-icons';
// import ToDoModal from "./ToDoModal";


// const TodoList = ({handleEdit, todos ,setTodos}) => {

//     const [swipedRow, setSwipedRow] = useState(null);
//     const [showListVisible, setShowListVisible] = useState(false)

//     const handleDelete = (rowMap, rowKey) => {
//         const newTodos = [...todos];
//         const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
//         newTodos.splice(todoIndex,1);
//         setTodos(newTodos);

//     }

//     return(
//     <View style = {{marginTop: 120}}>
//         {todos.length == 0 && 
//             <>
//         <Feather style ={{marginBottom:10, marginLeft: 60}} name="x-circle" size={50} color="#54B4EA" />
//         <Text style ={{textAlign: "center"}}> You have no lists 😤 </Text>
//         <Text style ={{fontSize: 10, padding: 10,}}> Press the + button to create one </Text>
//             </>
//         }
//         {todos.length != 0 &&
        
//         <SwipeListView 
//             data={todos}
//             renderItem={(data) => {
//                 const RowText = data.item.key == swipedRow ? SwipeListView : Text
//                 return (
//                 <View style = {{
//                     height: 85, marginBottom: 40,
//                     shadowColor: GlobalStyles.colors.primary50,
//                     shadowOffset: {
//                         width:0,
//                         height:2,
//                     },
//                     shadowOpacity: 0.35,
//                     shadowRadius: 3,
//                     }}
//                 >
//                     <Modal 
//                     animationType="slide" 
//                     visible = {showListVisible}
//                     onRequestClose = {() => setShowListVisible(false)}>
//                         <ToDoModal closeModal={() => setShowListVisible(false)} />
//                     </Modal>
//                     <TouchableOpacity style = {styles.container}
//                         underlayColor={""}
//                         onPress={() => {
//                            setShowListVisible()
//                         }}
//                     >
//                         <>
//                         <RowText style = {styles.title}>{data.item.title}</RowText>      
//                         {/* <Text style = {styles.titledate}>{data.item.date}</Text> */}
//                         </>
//                     </TouchableOpacity>  
//                 </View>
//                 )
//             }}
//             renderHiddenItem={(data,rowMap) => {
//                 return (
//                 <View style = {styles.hiddenView}>
//                     <TouchableOpacity  style = {styles.hiddenButton} onPress= {()=> handleDelete(rowMap, data.item.key)} >
//                             <Feather name="trash" size={24} color="#FFFF" />
//                     </TouchableOpacity>
//                     <TouchableOpacity  style = {[styles.hiddenButton,{padding: 10}]} onPress= {()=> handleEdit(data.item)} >
//                             <Feather name="edit" size={24} color="#FFFF" />
//                     </TouchableOpacity>
//                 </View>
//                 )
//             }}
//             leftOpenValue={80}
//             previewRowKey={"1"}
//             previewOpenValue={3000}
//             disableLeftSwipe={true}
//             showsVerticalScrollIndicator={false}
//             style ={{
//                 flex: 1,paddingBottom: 30, marginBottom: 40
//             }}
//             onRowOpen={(rowKey) => {
//                 setSwipedRow(rowKey);

//             }}
//             onRowClose={() => {
//                 setSwipedRow(null);
//             }}
//             />
            
//             }
//         </View>
//     );
// }

// export default TodoList;

// const styles = StyleSheet.create({
//     container: {
//         minHeight: 100,
//         width: 350,
//         padding: 15,
//         justifyContent: 'space-around',
//         marginBottom: 15,
//         borderBottomLeftRadius: 10,
//         borderTopLeftRadius: 10,
//         backgroundColor: "#F5F5F5",
//         borderLeftWidth: 1,
//         borderLeftColor: GlobalStyles.colors.primary50,
//       },
//     title: {
//         fontSize: 16,
//         letterSpacing: 1,
//         color: "black"
//       },
//     titledate: {
//         fontSize: 10,
//         letterSpacing: 1,
//         color: "black",
//         textAlign: 'right',
//         textTransform: 'uppercase',
//     },
//     hiddenView: {
//         width: '100%',
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         //marginTop: 50,
//         marginBottom: 15,
//         borderRadius: 10,   
//         backgroundColor: GlobalStyles.colors.primary50,
//     },
//     hiddenButton: {
//         //marginTop: 50,
//         width: '15%',
//         alignItems: 'center',
//       },
//     swipedtext: {
//         color: "black",
//         fontStyle: "italic",
//         textDecoration: 'line-through'
//     }

// });