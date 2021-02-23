import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput, Image, Button} from 'react-native';

import auth from '@react-native-firebase/auth';

import {styles} from './styles';

const MyPrifile = () => {
  const [userValues, setUserValues] = React.useState({
    email: '',
    displayName: '',
  });

  useEffect(() => {
    setUserValues({
      email: auth().currentUser && auth().currentUser.email,
      displayName: auth().currentUser && auth().currentUser.displayName,
    });
  }, [auth().currentUser]);

  const handleChange = (props) => {
    setUserValues({...userValues, [props.feild]: props.value});
  };

  const forgotPassword = (Email) => {
    auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  // auth().signOut();

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
            onChangeText={(val) => handleChange({feild: 'email', value: val})}
            value={userValues.email}
            placeholder="Email Address"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.formInputsBeside}
            onChangeText={(val) =>
              handleChange({feild: 'displayName', value: val})
            }
            value={userValues.displayName}
            placeholder="Full Name"
            // keyboardType="numeric"
          />
          <Text onPress={() => forgotPassword(auth().currentUser.email)}>
            Şifremi unuttum
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPrifile;
