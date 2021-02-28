import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import ImgToBase64 from 'react-native-image-base64';
import database from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadImage = () => {
  const [imageData, setImageData] = useState('');
  const [filePath, setFilePath] = useState({});
  let imagetest;

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'UploadImage needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'UploadImage needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        // console.log('Response = ', response);

        // if (response.didCancel) {
        //   alert('User cancelled camera picker');
        //   return;
        // } else if (response.errorCode == 'camera_unavailable') {
        //   alert('Camera not available on device');
        //   return;
        // } else if (response.errorCode == 'permission') {
        //   alert('Permission not satisfied');
        //   return;
        // } else if (response.errorCode == 'others') {
        //   alert(response.errorMessage);
        //   return;
        // }

        ImgToBase64.getBase64String(filePath.uri).then((base64String) => {
          setImageData(base64String);
          imagetest = base64String;
        });
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      // if (response.didCancel) {
      //   alert('User cancelled camera picker');
      //   return;
      // } else if (response.errorCode == 'camera_unavailable') {
      //   alert('Camera not available on device');
      //   return;
      // } else if (response.errorCode == 'permission') {
      //   alert('Permission not satisfied');
      //   return;
      // } else if (response.errorCode == 'others') {
      //   alert(response.errorMessage);
      //   return;
      // } else {
      //   console.log("response.errorCode", response)
      // }

      ImgToBase64.getBase64String(filePath.uri).then((base64String) => {
        setImageData(base64String);
        imagetest = base64String;
      });
      setFilePath(response);
    });
  };

  const handleChangeImage = () => {
    // console.log(imagetest);
    if (imageData) {
      if (auth().currentUser.uid) {
        database()
          .ref(`/users/${auth().currentUser.uid}`)
          .update({
            image: imageData,
          })
          .then(() => {
            setImageData('');
            Snackbar.show({
              text: 'Fotoğraf başarıyla değiştirildi',
              duration: 3000,
              action: {
                text: 'Okay',
                textColor: 'green',
              },
            });
          })
          // .catch((err) => console.log(err));
      } else {
        database()
          .ref(`/users/${auth().currentUser.uid}`)
          .set({
            image: imageData,
          })
          .then(() => {
            setImageData('');
            Snackbar.show({
              text: 'Fotoğraf başarıyla değiştirildi',
              duration: 3000,
              action: {
                text: 'Okay',
                textColor: 'green',
              },
            });
          })
          // .catch((err) => console.log(err));
      }
    } else {
      Snackbar.show({
        text: 'Fotoğraf değişmedi!',
        duration: 3000,
        action: {
          text: 'Okay',
          textColor: 'green',
        },
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        {/* {console.log(filePath)} */}
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          // style={styles.buttonStyle}
          onPress={() => handleChangeImage()}>
          <Text style={styles.textStyle}>Choose foto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
