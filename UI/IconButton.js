import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({icon, color , size, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
        <View style = {styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
        buttonContainer: {
            marginHorizontal: 8,
            marginVertical: 2,
            padding: 6,
        }
})

export default IconButton