import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyPrifile from './pages/profile/MyProfile';
import HomeScreen from './pages/home/home';
import SigninPage from './pages/login/SigninPage';
import OrderHistory from './pages/order-history/OrderHistory';
import AddressInformations from './pages/address/AddressInfos';

import CustomSidebarMenu from './components/CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Home':
      return 'Ana Sayfa';
    case 'AddressInformations':
      return 'Address Bilgileri';
    case 'BottomTabStack':
      return 'Home';
  }
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        headerShown={false}
        options={{
          tabBarLabel: 'Ana Sayfa',
          /*tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),*/
        }}
      />
      {/* <Tab.Screen
        name="AddressInformations"
        component={AddressInformations}
        options={{
          tabBarLabel: 'Address Bilgileri',
        }}
      /> */}
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarLabel: 'Sipariş Geçmişi',
        }}
      />
    </Tab.Navigator>
  );
};

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
      {/* <Stack.Screen
        name="AddressInformations"
        component={AddressInformations}
        options={{
          title: 'Adres bilgileri', //Set Header Title
        }}
      /> */}
    </Stack.Navigator>
  );
}

function testSignInScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={SigninPage}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
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
        })}
      />
    </Stack.Navigator>
  );
}

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BottomTabStack}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
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
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }}
          drawerContent={(props) => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="Home"
            options={{drawerLabel: 'Ana Sayfa'}}
            component={HomeScreenStack}
          />
          <Drawer.Screen
            name="MyPrifile"
            options={{drawerLabel: 'My Profile'}}
            component={myProfileScreenStack}
          />
          {/* <Drawer.Screen
            name="Adres bilgileri"
            options={{drawerLabel: 'Adres bilgileri'}}
            component={addressInformationsScreenStack}
          /> */}
          <Drawer.Screen
            name="Sipariş Geçmişi"
            options={{drawerLabel: 'Sipariş Geçmişi'}}
            component={ordersHistoryScreenStack}
          />
          <Drawer.Screen
            name="Signin"
            options={{drawerLabel: 'Sign in Page'}} // this page for test while waiting Beyzanur
            component={testSignInScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
