import { View, Text, useColorScheme, StyleSheet, TextStyle } from 'react-native'
import React from 'react'

const CustomText = ({children,style}:{children:string,style?:TextStyle}) => {
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  
  return (
      <Text style={[styles.text, themeTextStyle,style]}>{children}</Text>
  )
}


export default CustomText
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    },
    lightContainer: {
      backgroundColor: '#d0d0c0',
    },
    darkContainer: {
      backgroundColor: '#242c40',
    },
    lightThemeText: {
      color: '#1e3a8a',
    },
    darkThemeText: {
      color: '#93c5fd',
    },
  });