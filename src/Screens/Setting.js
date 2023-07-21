import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  Button,
  Alert
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { EventRegister } from 'react-native-event-listeners';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle' },
      { id: 'wifi', icon: 'bell', label: 'Notification', type: 'toggle' },
      { id: 'bug', icon: 'sun', label: 'Theme', type: 'link' },
    ],
  },
  {
    header: 'Help',
    items: [
      //{ id: 'bug', icon: 'sun', label: 'Theme', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link' },
    ],
  },
];



export default function Setting({ navigation }) {
  const [form, setForm] = useState({
    language: 'English',
  });

  // dark mode
  const [isDarkEnabled, setIsDarkEnabled] = useState(false);

  const [isWifiEnabled, setIsWifiEnabled] = useState(false);
  const toggleWifiSwitch = () => setIsWifiEnabled(previousState => !previousState);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkEnabled ? '#111' : 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        {
                          id === 'contact' && (
                            navigation.navigate('Contact')
                          )
                          id === 'bug' && (
                            navigation.navigate('Theme')
                          )
                        }
                      }}
                    >



                      <View style={[styles.row, { backgroundColor: isDarkEnabled ? 'black' : 'white' }]}>

                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={[styles.rowIcon, { marginLeft: 20 }]}
                          size={22}
                        />

                        <Text style={[styles.rowLabel, { color: isDarkEnabled ? 'white' : 'black' }]}>{label}</Text>

                        {/* เว้นระยะห่างระหว่าง label กับปุ่ม */}
                        <View style={styles.rowSpacer} />

                        {type === 'select' && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {id === 'darkMode' && (
                          <Switch
                            trackColor={{ false: '#767577', true: '#81e0df' }}
                            thumbColor={isDarkEnabled ? '#0074fa' : '#f4f3f4'}
                            
                            value={isDarkEnabled}
                            onValueChange={(value) => { 
                              setIsDarkEnabled(value)
                              EventRegister.emit('ChangeTheme', value)
                            }}
                          />
                        )}

                        {id === 'wifi' && (
                          <Switch
                            trackColor={{ false: '#767577', true: '#81e0df' }}
                            thumbColor={isWifiEnabled ? '#0074fa' : '#f4f3f4'}

                            onValueChange={toggleWifiSwitch}
                            value={isWifiEnabled}
                          />
                        )}

                        {(type === 'select' || type === 'link') && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 20,
    height: 50,
  },
  rowWrapper: {

    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});