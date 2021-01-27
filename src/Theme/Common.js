/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors }) {
  return StyleSheet.create({
    button: {
      backgroundColor: Colors.primary,
    },
    backgroundPrimary: {
      backgroundColor: Colors.primary,
    },
    backgroundReset: {
      backgroundColor: Colors.transparent,
    },
    textInput: {
      borderWidth: 1,
      borderColor: Colors.text,
      backgroundColor: Colors.inputBackground,
      color: Colors.text,
      minHeight: 50,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      padding:10
    },
  })
}
