import { View, Text, useColorScheme, StyleSheet, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'

const CustomCard = ({children,style}:{children?:ReactNode,style?:ViewStyle}) => {
    const colorScheme = useColorScheme();
    const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle,style]}>
        {children}
    </View>
  )
}

export default CustomCard

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:25,
      width:"95%",
      elevation:20
    },
    text: {
      fontSize: 20,
    },
    lightContainer: {
      backgroundColor: '#b0c4de',
    },
    darkContainer: {
      backgroundColor: '#1e293b',
    },
    lightThemeText: {
      color: '#242c40',
    },
    darkThemeText: {
      color: '#d0d0c0',
    },
  });