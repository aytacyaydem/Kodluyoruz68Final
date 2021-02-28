import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');
const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 18,
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 100 / 2,
    backgroundColor: '#eee',
    borderColor: 'rgba(0,0,0,.4)',
    alignSelf: 'center',
  },
  imageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
    paddingBottom: 10,
    marginBottom: 10,
    // flex: 2,
    // justifyContent: "center",
    // backgroundColor: "blue"
  },
  // formContainer: {
  //   flex: 1,
  //   backgroundColor: "red"
  // },
  formInputsBesideContainer: {
    width: deviceSize.width / 1 - 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  formInputsBeside: {
    backgroundColor: '#efecfc',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 4,
    marginVertical: 6,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  updateUserBtnContaienr: {
    marginTop: 10,
    width: deviceSize.width / 2,
    alignSelf: 'center',
  },
  changeProfileImageBtn: {
    top: -58,
    paddingTop: 10,
    paddingBottom: 16,
    alignSelf: 'center',
    paddingHorizontal: 25,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  changeProfileImageBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
  colseModalBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'tomato',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 6,
    marginRight: 6,
  },
  colseModalBtnText: {
    color: "#fff"
  }
});

export {styles};
