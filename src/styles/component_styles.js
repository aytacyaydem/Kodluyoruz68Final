import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const category_button = StyleSheet.create({
  activeContainer: {
    backgroundColor: '#ff3d00',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: deviceWidth / 4,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    alignSelf: 'baseline',
    borderRadius: deviceWidth / 30,
    backgroundColor: 'white',
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: '#ff3d00',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 15,
  },
  activeText : {
      color:"white"
  }
});

const suggestion_list = StyleSheet.create({
    container : {
        paddingHorizontal:10,
        marginTop:5
    },
    title : {
        fontSize:20,
        marginBottom:10
    }
})

const suggestion_item = StyleSheet.create({
    container : {
        marginHorizontal:5,
        borderRadius:deviceWidth,
        borderWidth:1.5,
        borderColor:"#ff3d00"
    },
    image : {
        width:deviceWidth / 5,
        height : deviceWidth /5,
        borderRadius:deviceWidth 
    }
})

export {category_button,suggestion_list,suggestion_item};
