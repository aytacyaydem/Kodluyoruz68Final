import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import {styles} from './styles';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SigninPage({navigation}) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChangeInputs = (props, value) => {
    setUser({...user, [props]: value});
  };

  const handleSubmit = () => {
    // console.log(auth().currentUser)
    // console.log(user.email.trim())
    Keyboard.dismiss();
    if (user.email.trim() && user.password.trim()) {
      if (!auth().currentUser) {
        auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            Snackbar.show({
              text: 'Signed In!',
              duration: 1000,
              backgroundColor: 'tomato',
              textColor: 'white',
            });
            setTimeout(() => {
              navigation.navigate('Home');
            }, 2200);
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              Snackbar.show({
                text: 'This email address is already in use!',
                duration: 2000,
                backgroundColor: 'red',
                action: {
                  text: 'Okay',
                  textColor: 'red',
                },
              });
            }

            if (error.code === 'auth/invalid-email') {
              Snackbar.show({
                text: 'This email address is invalid!',
                duration: 2000,
                backgroundColor: 'red',
                action: {
                  text: 'Okay',
                  textColor: 'red',
                },
              });
            }

            if (error.code === 'auth/user-not-found') {
              Snackbar.show({
                text: 'E-mail or password wrong!',
                duration: 2000,
                action: {
                  text: 'Okay',
                  textColor: 'green',
                },
              });
            }
          });
      } else {
        Snackbar.show({
          text: 'User logged in already',
          duration: 2000,
          action: {
            text: 'Okay',
            textColor: 'green',
          },
        });
      }
    } else {
      Snackbar.show({
        text: 'Please Enter E-mail And Password',
        duration: 3000,
        action: {
          text: 'Okay',
          textColor: 'green',
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        {/* <Icon
          name="comment-text-outline"
          size={100}
          color="tomato"
          style={{alignSelf: 'center', marginBottom: 30}}
        /> */}

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.inputFields}
            onChangeText={(val) => handleChangeInputs('email', val)}
            autoCapitalize="none"
            keyboardType="email-address"
            blurOnSubmit={true}
            autoCorrect={false}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.inputFields}
            onChangeText={(val) => handleChangeInputs('password', val)}
            autoCapitalize="none"
            secureTextEntry={true}
            blurOnSubmit={true}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.buttonSignup}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Create Account
          </Text>
        </TouchableOpacity> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
