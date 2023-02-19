import { StyleSheet, Text, View, Image } from "react-native";
import "react-native-get-random-values";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeSelected from "./assets/home-selected.png";
import Home from "./assets/home.png";
import Transactions from "./assets/transactions.png";
import Chat from "./assets/chat.png";
import ChatSelected from "./assets/chat-selected.png";
import Profile from "./assets/profile.png";
import ProfileSelected from "./assets/profile-selected.png";
import Login from "./views/Login";

import TransactionsScreen from "./views/Transactions";
import DomieBotScreen from "./views/DomieBot";
import TxnStack from "./views/TxnStack";
import ProfileScreen from "./views/Profile";
import HomeStack from "./views/HomeStack";
import { AuthContext } from "./context/AuthContext";
import { initStripe } from "@stripe/stripe-react-native";

import * as Linking from "expo-linking";
import Constants from "expo-constants";

const convex = new ConvexReactClient(
  "https://frugal-crocodile-166.convex.cloud",
  {
    // We need to disable this to be compatible with React Native
    unsavedChangesWarning: false,
  }
);

const Tab = createBottomTabNavigator();

export default function App() {
  /**
   * User Id's convention:
   * 0: Not logged in
   * 1: Landlord
   * 2: Tenant 1
   * 3: Tenant 2
   */
  const [userId, setUserId] = React.useState(0);

  useEffect(() => {
    console.disableYellowBox = true;
    initStripe({
      publishableKey:
        "pk_test_51Md43MJNJYoa22nr14xn6Cdbu8SK6iAh3ANU5HpCDZd55eaDm9ub6oPizhAbAFlTugORVNTRZhMnodHIwt5ZVn2L00xhk2Ntn7",
      merchantIdentifier: "merchant.identifier",
      urlScheme:
        Constants.appOwnership === "expo"
          ? Linking.createURL("/--/")
          : Linking.createURL(""),
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      <ConvexProvider client={convex}>
        <NavigationContainer>
          {userId !== 0 ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  // You can return any component that you like here!
                  return <GetIcons {...{ focused, routeName: route.name }} />;
                },
                tabBarActiveTintColor: "black",
                tabBarInActiveTintColor: "gray",
                tabBarItemStyle: {
                  paddingTop: 10,
                },
                tabBarStyle: [
                  {
                    display: "flex",
                    minHeight: 85,
                  },
                  null,
                ],
                headerShown: false,
              })}
            >
              {userId === 1 && <Tab.Screen name="Home" component={HomeStack} />}
              <Tab.Screen name="Transactions" component={TxnStack} />
              <Tab.Screen name="DomieBot" component={DomieBotScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
          ) : (
            <Login setUserType={setUserId} />
          )}
        </NavigationContainer>
      </ConvexProvider>
    </AuthContext.Provider>
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
    width: 30,
    height: 30,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
