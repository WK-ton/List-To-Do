import React, {useState} from "react";
import { View,Modal,StyleSheet,Text, TouchableOpacity, Alert,Button } from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from "react-native-modal-datetime-picker";

const ModalComponent = ({
    modalVisible,
    setModalVisible,
    todoInputValue,
    setTodoInputValue,
    handleAddTodo,
    todos,
    todoToBeEdited,
    setTodoToBeEdited,
    handleEditTodo,
}) => {
        const handleCloseModal = () => {
            setModalVisible(false);
            setTodoInputValue("");
            setTodoToBeEdited(null);
        }
        const handleSubmit = ({datePicked}) => {
            console.log(todoInputValue)
            if(!todoInputValue){
                Alert.alert("Please insert a list name ⚠️")
            }else if(!todoToBeEdited) {
            handleAddTodo({   
                title: todoInputValue,
                date: Date(datePicked).toString(),
                key: `${(todos[todos.length-1] && parseInt(todos[todos.length -1].key) +1) || 1 }`
            })
            } else {
                handleEditTodo({
                    title: todoInputValue,
                    date: todoToBeEdited.date,
                    key: todoToBeEdited.key
                })
            }

            setTodoInputValue("");
        }

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

        const showDatePicker = () => {
          setDatePickerVisibility(true);
        };
      
        const hideDatePicker = () => {
          setDatePickerVisibility(false);
        };
      
        const handleConfirm = datePicked => {
          console.log("A date has been picked: ", datePicked);
          hideDatePicker();
        };


        return (
            <>
            <TouchableOpacity  style = {styles.AddButton} onPress={() => {setModalVisible(true)}}>
                <AntDesign style = {styles.Add} name="plus" color={'#FFFF'} size={26} />
            </TouchableOpacity>
            <Modal animationType="fade" visible={modalVisible} transparent={true}  onRequestClose={handleCloseModal}>
                    <TouchableOpacity onPress = {()=> ('')} style = {styles.modalBackDrop} activeOpacity={1} >
                        <View style = {styles.NewList}>
                            <Text style = {styles.heading}>New List</Text>
                            <TextInput 
                            placeholder='' 
                            style ={styles.input}
                            value={todoInputValue}
                            onChangeText={(text) => setTodoInputValue(text)}
                            autoFocus={true}
                            />
                            <Button title="Add Date" onPress={showDatePicker} />
                            <DateTimePicker
                                isVisible={isDatePickerVisible}
                                mode="datetime"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            {/* <RNDateTimePicker 
                                display="default" 
                                value={new Date()}     
                                onChange={(event, value) => {
                                    console.log('Selected-----------'+value);
                                    setDate(value);
                                }}
                            /> */}

                            <View style = {styles.containerButton}>
                            <TouchableOpacity style = {styles.buttonAdd} onPress = {handleSubmit} >
                                    <Text style = {styles.buttonText}> Add </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style = {styles.buttonAdd} onPress = {handleSubmit} >
                                    <Text style = {styles.buttonText}> Add </Text>
                            </TouchableOpacity> */}
                            </View>
                            <View style = {styles.containerButton}>
                            <TouchableOpacity style = {styles.buttonAdd} onPress = {handleCloseModal} >
                                    <Text style = {styles.buttonText}> Close </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    

                    
            </Modal> 
            </>
        )
}
const styles = StyleSheet.create({
        modalBackDrop: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.68)',
            alignItems:'center',
            justifyContent:'center',
        },
        NewList: {
            width:250,
            height:250,
            borderRadius:10,
            marginBottom: 100,
            backgroundColor:GlobalStyles.colors.primary5000,
            justifyContent:'top',
            alignItems:'center',
            shadowColor:GlobalStyles.colors.primary50,
            shadowOffset: {
                width:0,
                height:2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        heading: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom:15,
            paddingTop:25,
     
        },
        input: {
            width:180,
            height:35,
            backgroundColor: GlobalStyles.colors.primary500,
            borderWidth:0.2,
            borderRadius:10,
            //alignItems: 'center',
            justifyContent: 'center'
            //paddingLeft:,
        },
        buttonAdd: {
            marginTop: 20,
            width:85,
            height: 30,
            borderRadius:14,
            backgroundColor:GlobalStyles.colors.primary50,
            alignItems :'center',
            justifyContent:'center',
        },
        buttonText: {
            color: '#FFFF',
            fontWeight: '600'
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
        containerButton: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
        }

})
export default ModalComponent;