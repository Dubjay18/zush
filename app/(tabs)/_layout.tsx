import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {Image, Pressable, Text, View} from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import {icons} from "@/constants";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
const TabIcon = ({ icon, color, name, focused }:{
    icon: any;
    color: string;
    name: string;
    focused: boolean;
}) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
          screenOptions={{
              tabBarActiveTintColor: "#1594d4",
              tabBarInactiveTintColor: "#CDCDE0",
              tabBarShowLabel: false,
              tabBarStyle: {
                  backgroundColor: "#161622",
                  borderTopWidth: 1,
                  borderTopColor: "#232533",
                  height: 84,
              },
          }}
      >
          <Tabs.Screen
              name="index"
              options={{
                  title: "Home",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                      <TabIcon
                          icon={icons.home}
                          color={color}
                          name="Home"
                          focused={focused}
                      />
                  ),
              }}
          />
          {/*<Tabs.Screen*/}
          {/*    name="bookmark"*/}
          {/*    options={{*/}
          {/*        title: "Bookmark",*/}
          {/*        headerShown: false,*/}
          {/*        tabBarIcon: ({ color, focused }) => (*/}
          {/*            <TabIcon*/}
          {/*                icon={icons.bookmark}*/}
          {/*                color={color}*/}
          {/*                name="Bookmark"*/}
          {/*                focused={focused}*/}
          {/*            />*/}
          {/*        ),*/}
          {/*    }}*/}
          {/*/>*/}

          <Tabs.Screen
              name="create"
              options={{
                  title: "Create",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                      <TabIcon
                          icon={icons.plus}
                          color={color}
                          name="Create"
                          focused={focused}
                      />
                  ),
              }}
          />
          <Tabs.Screen
              name="profile"
              options={{
                  title: "Profile",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                      <TabIcon
                          icon={icons.profile}
                          color={color}
                          name="Profile"
                          focused={focused}
                      />
                  ),
              }}
          />
      </Tabs>
  );
}
