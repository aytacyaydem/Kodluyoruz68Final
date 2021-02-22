import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    marginTop: 18,
    borderWidth: 1,
    marginBottom: 12,
    // resizeMode: "center",
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
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    // flexDirection: "row",
    justifyContent: 'space-evenly',
    // marginTop: 10
  },
  formInputsBesideContainer: {
    // flex: 2,
    // maxWidth: '40%',
    // backgroundColor: '#efecfc',
    // padding: 6,
    width: deviceSize.width / 1 - 40,
    marginTop: 20
  },
  formInputsBeside: {
    backgroundColor: '#efecfc',
    // width: deviceSize.width / 1 - 40,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius: 4,
    marginVertical: 6
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export {styles};
