import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import "react-native-get-random-values";
import { useMutation, useQuery } from "./convex/_generated/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeSelected from "./assets/home-selected.png";
import Home from "./assets/home.png";
import Transactions from "./assets/transactions.png";
import Chat from "./assets/chat.png";
import ChatSelected from "./assets/chat-selected.png";
import Profile from "./assets/profile.png";
import ProfileSelected from "./assets/profile-selected.png";

import HomeScreen from "./views/Home";
import TransactionsScreen from "./views/Transactions";
import DomieBotScreen from "./views/DomieBot";
import ProfileScreen from "./views/Profile";

const convex = new ConvexReactClient(
  "https://frugal-crocodile-166.convex.cloud",
  {
    // We need to disable this to be compatible with React Native
    unsavedChangesWarning: false,
  }
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // You can return any component that you like here!
              return <GetIcons {...{ focused, routeName: route.name }} />;
            },
            tabBarActiveTintColor: "black",
            tabBarInActiveTintColor: "gray",
            tabBarItemStyle: {
              paddingVertical: 10,
            },
            tabBarStyle: [
              {
                display: "flex",
                minHeight: 70,
              },
              null,
            ],
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="DomieBot" component={DomieBotScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}

function GetIcons({ focused, routeName }) {
  const iconName = routeName.toLowerCase();
  let icon = null;

  if (iconName === "home") {
    icon = focused ? HomeSelected : Home;
  } else if (iconName === "transactions") icon = Transactions;
  else if (iconName === "domiebot") {
    icon = focused ? ChatSelected : Chat;
  } else if (iconName === "profile") icon = focused ? ProfileSelected : Profile;

  return <Image style={styles.tinyLogo} source={icon} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
