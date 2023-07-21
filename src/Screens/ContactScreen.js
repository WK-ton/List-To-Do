import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tonURL = 'https://www.instagram.com/wk.tton/?next=%2F';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <View style = {{marginBottom: 80}}>
        <Ionicons name="person-circle-sharp" size={100} color="#338AFF" />
      </View>
      <Text style = {styles.textname}>นายวรพงษ์ แก้วพานิช 6321602698</Text>
      <View style = {{marginBottom: 20}}>
        <OpenURLButton url={tonURL}>IG : wk.tton</OpenURLButton>
      </View >
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 70,
      alignItems: 'center',
    },
    textname: {
        color: "black",
        fontSize: 20,
        fontWeight: '600',
    }
  });

export default ContactScreen