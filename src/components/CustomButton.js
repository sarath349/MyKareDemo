import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = ({textString = '', mode = '', handlePress = () => {}}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        mode === 'outlined' && {
          backgroundColor: null,
          borderWidth: 1,
          borderColor: '#c8c7cc',
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.5}>
      <Text style={[styles.text, mode === 'outlined' && {color: 'black'}]}>
        {textString}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#764abc',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    paddingVertical: 8,
    color: 'white',
  },
});
