// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';

import userImage from '../assets/images/user.png';

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  const userDisplayName =
    auth().currentUser && auth().currentUser.displayName !== null
      ? auth().currentUser.displayName
      : '';

  const userEmail =
    auth().currentUser && auth().currentUser.email !== null
      ? auth().currentUser.email
      : '';

  return (
    <SafeAreaView style={{flex: 1}}>
      {auth().currentUser ? (
        <View style={styles.sideMenuHeader}>
          <Image
            source={{uri: BASE_PATH + proileImage}}
            style={[
              styles.sideMenuProfileIcon,
              styles.sideMenuProfileIconLoggedIn,
            ]}
          />
          <View>
            <Text>{userDisplayName}</Text>
            <Text>{userEmail}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.sideMenuHeader}>
          <Image
            source={require(`../assets/images/user.png`)}
            style={[
              styles.sideMenuProfileIcon,
              styles.sideMenuProfileIconNotLoggedIn,
            ]}
          />
          <View>
            <DrawerItem
              label="Giriş yap"
              onPress={() => props.navigation.navigate('Signin')}
            />
          </View>
        </View>
      )}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Visit Us"
          // onPress={() => } You Can handle click this item
        />
        <View style={styles.customItem}>
          <Text
          // onPress={() => } You Can handle click this item
          >
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Çıkış yap"
        // onPress={() => } You Can handle click this item
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sideMenuProfileIcon: {
    width: 64,
    height: 64,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
    backgroundColor: '#eee',
  },
  sideMenuProfileIconLoggedIn: {
    marginBottom: 12,
  },
  sideMenuProfileIconNotLoggedIn: {
    padding: 20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
