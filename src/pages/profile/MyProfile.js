import React from 'react';
import {SafeAreaView, View, Text, TextInput, Image} from 'react-native';

import {styles} from './styles';

const MyPrifile = () => {
  const [userValues, setUserValues] = React.useState({
    email: "",
    displayName: "",
  })

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png`,
          }}
          style={styles.sideMenuProfileIcon}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formInputsBesideContainer}>
          <TextInput
            style={styles.formInputsBeside}
            // onChangeText={onChangeNumber}
            value={userValues.email}
            placeholder="Email Address"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.formInputsBeside}
            // onChangeText={onChangeNumber}
            value={userValues.displayName}
            placeholder="Full Name"
            // keyboardType="numeric"
          />
          {/* <TextInput
            style={styles.formInputsBeside}
            // onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.formInputsBeside}
            // onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPrifile;
