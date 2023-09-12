import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const CustomTextInput = ({
  label = '',
  error = '',
  placeholder = '',
  value = '',
  onChangeText = () => {},
  passwordField = false,
}) => {
  const [secureText, setSecureText] = useState(true);
  const EYE = require('../assets/eye.png');
  const EYE_SLASH = require('../assets/eye-slash.png');
  function handleSecureText() {
    setSecureText(!secureText);
  }
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.flexView}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          numberOfLines={1}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={passwordField ? secureText : false}
        />
        {/* image goes here */}
        {passwordField ? (
          <TouchableOpacity activeOpacity={0.5} onPress={handleSecureText}>
            <Image source={secureText ? EYE_SLASH : EYE} style={styles.image} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  label: {fontSize: 14, color: '#555', fontWeight: '400'},
  error: {
    fontWeight: '400',
    fontSize: 14,
    color: 'red',
  },
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#c8c7cc',
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 14,
  },
  image: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});
