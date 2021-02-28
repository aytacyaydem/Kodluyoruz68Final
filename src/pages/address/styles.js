import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 8,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'tomato',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  openModalBtn: {
    borderRadius: 4,
    paddingVertical: 8,
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'tomato',
    marginBottom: 30,
    marginTop: 10
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
    color: '#fff',
  },
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
  addressItem: {
    padding: 10,
    fontSize: 20,
    elevation: 2,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    shadowRadius: 6,
    shadowOpacity: 0.1,
    borderColor: 'tomato',
    shadowColor: 'tomato',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addressText: {
    color: "#333",
    fontSize: 16
  },
});

export {styles};
