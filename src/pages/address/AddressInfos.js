import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './styles';

const AddressInformations = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addressesList, setAddressesList] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState({
    title: '',
    text: '',
    zipCode: '',
  });

  useEffect(() => {
    if (auth().currentUser) {
      database()
        .ref(`/users/${auth().currentUser.uid}/addresses`)
        .on('value', (snapshot) => {
          setUserAddresses(snapshot.val());
          setAddressesList(Object.values(snapshot.val()));
        });
    }
  }, [auth().currentUser]);

  const handleChangeInputs = (props) => {
    setAddAddress({...addAddress, [props.feild]: props.value});
  };

  useEffect(() => {
    if (!auth().currentUser) {
      navigation.navigate('Signin');
    }
  }, [auth().currentUser]);

  const handleSubmit = () => {
    if (Object.values(addAddress).length > 0) {
      if (auth().currentUser.uid) {
        if (userAddresses && Object.values(userAddresses).length > 0) {
          database()
            .ref(`/users/${auth().currentUser.uid}/addresses`)
            .push()
            .update(addAddress)
            .then(() => {
              setAddAddress('');
              Snackbar.show({
                text: 'Adres başarıyla eklenmiştir',
                duration: 3000,
                action: {
                  text: 'gizle',
                  textColor: 'green',
                },
              });
            });
        } else {
          database()
            .ref(`/users/${auth().currentUser.uid}/addresses`)
            .push()
            .update(addAddress)
            .then(() => {
              setAddAddress('');
              Snackbar.show({
                text: 'Adres başarıyla eklenmiştir',
                duration: 3000,
                action: {
                  text: 'gizle',
                  textColor: 'green',
                },
              });
            });
        }
      } else {
        database()
          .ref(`/users/${auth().currentUser.uid}`)
          .update({addresses: [(newAddress = addAddress)]})
          .then(() => {
            setAddAddress('');
            Snackbar.show({
              text: 'Adres başarıyla eklenmiştir',
              duration: 3000,
              action: {
                text: 'gizle',
                textColor: 'green',
              },
            });
          });
      }
    } else {
      Snackbar.show({
        text: 'Adres bilgilerini kontrol edin!',
        duration: 3000,
        action: {
          text: 'Anladım',
          textColor: 'red',
        },
      });
    }
  };

  const renderDataItem = ({item}) => (
    <View style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <Text style={styles.addressText}>Adres ismi: {item.title}</Text>
        <Icon name="pin" size={24} color="tomato" />
      </View>
      <Text style={styles.addressText}>Address: {item.text} </Text>
      <Text style={styles.addressText}>Zip kodu: {item.zipCode} </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        style={styles.contentContainer}
        data={addressesList}
        renderItem={renderDataItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <Pressable
            style={styles.openModalBtn}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Yeni Adres ekle</Text>
          </Pressable>
        }
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.colseModalBtn}>
          <Text style={styles.colseModalBtnText}>X</Text>
        </Pressable>
        <View style={styles.formContainer}>
          <View style={styles.formInputsBesideContainer}>
            <TextInput
              style={styles.formInputsBeside}
              onChangeText={(val) =>
                handleChangeInputs({feild: 'title', value: val})
              }
              value={addAddress.title}
              blurOnSubmit={true}
              autoCorrect={false}
              placeholder="Adres ismi"
            />
            <TextInput
              style={styles.formInputsBeside}
              onChangeText={(val) =>
                handleChangeInputs({feild: 'text', value: val})
              }
              value={addAddress.text}
              placeholder="Adres"
              autoCapitalize="none"
              blurOnSubmit={true}
              autoCorrect={false}
            />
            <TextInput
              style={styles.formInputsBeside}
              placeholder="Zip kodu"
              value={addAddress.zipCode}
              keyboardType="numeric"
              blurOnSubmit={true}
              autoCorrect={false}
              onChangeText={(val) =>
                handleChangeInputs({feild: 'zipCode', value: val})
              }
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Kaydet</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default AddressInformations;
