import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const DashboardScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null);
  async function getCurrentUser() {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (!currentUser) return;
      setUser(JSON.parse(currentUser));
    } catch (error) {}
  }
  useEffect(() => {
    getCurrentUser();
  }, [isFocused]);

  async function getUserList() {
    try {
      const userList = await AsyncStorage.getItem('userList');
      var users = userList ? JSON.parse(userList) : [];
      setUserList(users);
    } catch (error) {}
  }

  async function handleSubmit() {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
    } catch (error) {}
  }

  const UserItem = ({item}) => {
    return (
      <View style={styles.userItemContainer}>
        <Text style={styles.userName}>Name: {item.name}</Text>
        <Text style={styles.userEmail}>Email: {item.email}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 12}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Text style={styles.welcome}>{`Hi, ${user ? user?.email : ''}`}</Text>
      <CustomButton
        textString="Fetch user list"
        mode="outlined"
        handlePress={getUserList}
      />
      <CustomButton textString="Logout" handlePress={handleSubmit} />
      {!!userList ? (
        <View>
          <Text style={styles.userListTitle}>
            List of users {userList.length}
          </Text>
          <FlatList
            data={userList}
            renderItem={({item}) => <UserItem item={item} />}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 12,
  },
  userListTitle: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  userItemContainer: {
    marginVertical: 8,
    borderWidth: 0.25,
    borderColor: '#AAA',
    borderRadius: 4,
    padding: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000',
  },
});
