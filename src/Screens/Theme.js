import React, { useState } from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Theme = () => {

const backgroundColor = ["#5CD859", "#24A609", "#595BD9", "#54B4EA",  "#15CDCA", "#4FE086"];
const [color, setColor] = useState(backgroundColor[0]);
const renderColor = () => {
        return backgroundColor.map(color => {
            return (
                <>
                <TouchableOpacity 
                key ={color} 
                style={[style.colorSelect, {backgroundColor: color}]} 
                onPress = {() => setColor(color)}
                />
            </>
            )
        })
    }
    return (
        <>
        <KeyboardAvoidingView style = {style.container} behavior="padding">
        <View style = {{ alignSelf: "stretch", marginHorizontal: 32}}>
            <Text style = {style.title}>Theme</Text>
            <View style = {{flexDirection: "row",justifyContent: "space-between",marginTop: 12}}>
                {renderColor()}
            </View>

            <TouchableOpacity 

            style = {[style.create, {backgroundColor: color}]}>
            <Text style={{color: "#FFF", fontWeight:"600"}}></Text>

            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </>
        
    )
}

const style = StyleSheet.create({
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

export default Theme

const styles = StyleSheet.create({})