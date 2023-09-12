import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import DemoLogo from '../../components/DemoLogo';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({navigation}) => {
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const getCurrentUser = async () => {
      const isUserLoggedin = await AsyncStorage.getItem('currentUser');
      if (isUserLoggedin !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DashboardScreen'}],
          }),
        );
      }
    };
    getCurrentUser();
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validation = Yup.object().shape({
    email: Yup.string().required('*'),
    password: Yup.string().required('*'),
  });

  async function handlePress(data, actions) {
    try {
      const userList = await AsyncStorage.getItem('userList');
      const userListObject = JSON.parse(userList);
      // NO DATA EXIST
      if (!userListObject) {
        setLoginError('Username doesnot exist, Signup to continue.');
        setTimeout(() => setLoginError(''), 3000);
      }
      if (userListObject.length > 0) {
        const userIndex = userListObject.findIndex(
          item => item.email === data.email && item.password === data.password,
        );
        if (userIndex < 0) {
          setLoginError('Username/password mismatch');
          setTimeout(() => setLoginError(''), 3000);
          return;
        }
        await AsyncStorage.setItem('currentUser', JSON.stringify(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DashboardScreen'}],
          }),
        );
        actions.resetForm(initialValues);
      }
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
      <DemoLogo />
      <Text style={styles.header}>Welcome to MyKare Demo</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => handlePress(values, actions)}>
        {({values, errors, handleChange, handleBlur, handleSubmit}) => (
          <>
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
            <CustomButton textString="Login" handlePress={handleSubmit} />
          </>
        )}
      </Formik>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.error}>{loginError}</Text>
    </ScrollView>
  );
};

export default LoginScreen;

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
