import {Image, StyleSheet} from 'react-native';
import React from 'react';

const DemoLogo = () => {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
};

export default DemoLogo;

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
