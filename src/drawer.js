import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MyPrifile from './pages/profile/MyProfile';
import SigninPage from './pages/login/SigninPage';
import OrderHistory from './pages/order-history/OrderHistory';
import AddressInformations from './pages/address/AddressInfos';

// Import Custom Sidebar
import CustomSidebarMenu from './components/CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

function testSignInScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="SigninPage">
      <Stack.Screen
        name="SigninPage"
        component={SigninPage}
        options={{
          title: 'Sign in', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function myProfileScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="MyPrifile"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="MyPrifile"
        component={MyPrifile}
        options={{
          title: 'My Profile', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function ordersHistoryScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="OrderHistory"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Sipariş Geçmişi', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function addressInformationsScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="AddressInformations"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="AddressInformations"
        component={AddressInformations}
        options={{
          title: 'Adres bilgileri', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="MyPrifile"
          options={{drawerLabel: 'My Profile'}}
          component={myProfileScreenStack}
        />
        <Drawer.Screen
          name="Adres bilgileri"
          options={{drawerLabel: 'Adres bilgileri'}}
          component={addressInformationsScreenStack}
        />
        <Drawer.Screen
          name="Sipariş Geçmişi"
          options={{drawerLabel: 'Sipariş Geçmişi'}}
          component={ordersHistoryScreenStack}
        />
        <Drawer.Screen
          name="SigninPage"
          options={{drawerLabel: 'Sign in Page'}} // this page for test while waiting Beyzanur
          component={testSignInScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
