import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: deviceSize.width / 2.3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  buttonSignup: {
    backgroundColor: 'tomato',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: deviceSize.width / 2.3,
    shadowColor: 'tomato',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  inputFields: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'tomato',
    shadowColor: 'tomato',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  inputContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'tomato',
    borderRadius: 5,
    elevation: 10,
    borderWidth: 2,
    fontSize: 12,
  },
  container: {
    margin: 30,
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export {styles};
