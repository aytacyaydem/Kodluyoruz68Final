import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Button,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import UploadImage from '../../components/uploadImage';

import {styles} from './styles';

const MyPrifile = ({navigation}) => {
  const [userValues, setUserValues] = useState({
    email: '',
    displayName: '',
    userImage: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (auth().currentUser) {
      database()
        .ref(`/users/${auth().currentUser.uid}`)
        .on('value', (snapshot) => {
          setUserValues({
            email: auth().currentUser && auth().currentUser.email,
            displayName: auth().currentUser && auth().currentUser.displayName,
            userImage: snapshot.val().image,
          });
        });
    }
  }, [auth().currentUser]);

  const handleChange = (props) => {
    setUserValues({...userValues, [props.feild]: props.value});
  };

  const forgotPassword = (Email) => {
    auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        alert('Please check your email...');
      });
    // .catch(function (e) {
    //   console.log(e);
    // });
  };

  const handleSubmit = () => {
    const dataChanged = () => {
      if (userValues.email.trim() || userValues.displayName.trim()) {
        if (
          (userValues.email && userValues.email !== auth().currentUser.email) ||
          (userValues.displayName &&
            userValues.displayName.localeCompare(
              auth().currentUser.displayName,
            ) !== 0)
        ) {
          return true;
        }
      } else {
        return false;
      }
    };

    const update = {
      email: userValues.email,
      displayName: userValues.displayName,
    };

    if (dataChanged()) {
      auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setUserValues({
            email: auth().currentUser && auth().currentUser.email,
            displayName: auth().currentUser && auth().currentUser.displayName,
          });
          Snackbar.show({
            text: 'Profil bilgileri güncellendi!',
            duration: 1600,
            backgroundColor: 'tomato',
            textColor: 'white',
          });
        });
    } else {
      Snackbar.show({
        text: 'Bigilerde değişlik yok!',
        duration: 3000,
        action: {
          text: 'Okay',
          textColor: 'green',
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        {userValues.userImage ? (
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + userValues.userImage,
            }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png`,
            }}
            style={styles.profileImage}
          />
        )}
        <Pressable
          style={styles.changeProfileImageBtn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.changeProfileImageBtnText}>Change</Text>
        </Pressable>
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
          />
          <Text onPress={() => forgotPassword(auth().currentUser.email)}>
            Şifremi unuttum
          </Text>
          <View style={styles.updateUserBtnContaienr}>
            <Button
              title="Gönder"
              style={styles.updateUserBtn}
              color="tomato"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.colseModalBtn}>
          <Text style={styles.colseModalBtnText}>X</Text>
        </Pressable>
        <UploadImage />
      </Modal>
    </SafeAreaView>
  );
};

export default MyPrifile;
