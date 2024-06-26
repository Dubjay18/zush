import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
function App() {
    const { loading, isLogged } = useGlobalContext();
    if (!loading && isLogged) return <Redirect href="/(tabs)" />;
    return (
   <SafeAreaView className={"bg-primary h-full"}>
       <ScrollView contentContainerStyle={{
           height: "100%"
       }}>

           <View className={"w-full justify-center items-center min h-[85vh] px-4"}>
<Image source={images.logo} className={"w-32 h-20"} resizeMode={"contain"}/>
               <Image source={images.cards} className={"max-w-[380px] w-full h-[300px]"} resizeMode={"contain"}/>

               <View className={"relative mt-5"}>
                   <Text className={"text-white text-center font-pbold text-3xl"}>Discover Endless Possibilities with <Text className={"text-secondary-200"}>Zush</Text></Text>
                   {/*<Image source={images.path} */}
                   {/*       className={"absolute -bottom-2 -right-8 w-[136px] h-[15px]"}*/}
                   {/*       resizeMode={"contain"}/>*/}
               </View>
               <Text
               className={"text-sm font-pregular text-gray-100 mt-7 text-center"}
               >
Where creativitu meets technology. Zush is a platform that allows you to create, share and explore a wide range of content, from music to videos, and much more. Get started today and discover the endless possibilities that await you.
               </Text>
               <CustomButton title={"Continue with email"} handlePress={()=> router.push("/(auth)/SignIn")} containerStyles={"w-full mt-7"}/>
           </View>
       </ScrollView>
       <StatusBar style={"light"} backgroundColor={"#161622"}/>
   </SafeAreaView>
    );
}

export default App;