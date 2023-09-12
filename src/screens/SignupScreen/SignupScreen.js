import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DemoLogo from '../../components/DemoLogo';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {CommonActions} from '@react-navigation/native';

const SignupScreen = ({navigation}) => {
  const [signupError, setSignUpError] = useState('');
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validation = Yup.object().shape({
    name: Yup.string().required('*'),
    email: Yup.string().required('*'),
    password: Yup.string().required('*'),
  });

  async function handlePress(data, actions) {
    try {
      const userList = await AsyncStorage.getItem('userList');
      const userListObject = JSON.parse(userList);
      // NO DATA EXIST
      if (!userListObject) {
        const jsonValue = JSON.stringify([data]);
        await AsyncStorage.setItem('userList', jsonValue);
        await AsyncStorage.setItem('currentUser', JSON.stringify(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DashboardScreen'}],
          }),
        );
      }
      if (userListObject.length > 0) {
        const userIndex = userListObject.findIndex(
          item => item.email === data.email,
        );
        if (userIndex > -1) {
          setSignUpError('Email already exists');
          setTimeout(() => setSignUpError(''), 3000);
          return;
        }
        const jsonValue = JSON.stringify([...userListObject, data]);
        await AsyncStorage.setItem('userList', jsonValue);
        await AsyncStorage.setItem('currentUser', JSON.stringify(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DashboardScreen'}],
          }),
        );
      }
      actions.resetForm(initialValues);
    } catch (e) {
      // saving error
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <BackButton />
      <DemoLogo />
      <Text style={styles.header}>Create Account</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => handlePress(values, actions)}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => (
          <>
            <CustomTextInput
              label="Name"
              placeholder="Name"
              value={values.name}
              error={errors.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            <CustomTextInput
              label="Email"
              placeholder="Email"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <CustomTextInput
              label="Password"
              placeholder="Password"
              value={values.password}
              error={errors.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              passwordField={true}
            />
            <CustomButton textString="Signup" handlePress={handleSubmit} />
          </>
        )}
      </Formik>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.error}>{signupError}</Text>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: '#560CCE',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#560CCE',
  },
  error: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
  },
});
