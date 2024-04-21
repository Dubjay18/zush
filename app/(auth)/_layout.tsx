import React from 'react';
import {Text, View} from "react-native";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

function AuthLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="SignIn"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Signup"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
}

export default AuthLayout;