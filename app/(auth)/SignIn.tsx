import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";

function SignIn() {
const [form, setForm] = React.useState({
        email: "",
        password: ""
    });

const [isSubmitting, setIsSubmitting] = React.useState(false);
    const {email, password} = form;
    const setEmail = (value: string) => {
        setForm({
            ...form,
            email: value
        });
    }
    const setPassword = (value: string) => {
        setForm({
            ...form,
            password: value
        });
}
const isSubmitDisabled = !email || !password;
   const onSubmit = () => {
        setIsSubmitting(true);
        // Perform API request here
        setIsSubmitting(false);
   }
    return (
       <SafeAreaView className={"bg-primary h-full"}>
           <ScrollView>
               <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
                   <Image source={images.logo} className={"w-32 h-20"} resizeMode={"contain"}/>
                   <Text className={"text-white font-psemibold text-2xl"}>Log in to Zush</Text>
                   <FormField title={"Email"} value={email} placeholder={"Enter your email"} handleChangeText={setEmail} otherStyles={"mt-5"}
                   keyboardType={"email-address"}
                   />
                   <FormField title={"Password"} value={password} placeholder={"Enter your password"} handleChangeText={setPassword} otherStyles={"mt-5"}/>
                     <CustomButton title={"Submit"} handlePress={onSubmit} containerStyles={"w-full mt-7"} isLoading={isSubmitting} disabled={isSubmitDisabled}/>
                   <View className={"flex flex-row justify-center items-center mt-5"}>
                          <Text className={"text-gray-100"}>Don't have an account?</Text>
                            <Link href="/Signup" className={"text-secondary-200 ml-1"}>Sign up</Link>
                   </View>
               </View>
           </ScrollView>
       </SafeAreaView>
    );
}

export default SignIn;