import React from 'react';
import {Alert, Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {useMutation} from "@tanstack/react-query";
import {getCurrentUser, LogIn} from "@/lib/Appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

function SignIn() {
    const { setUser, setIsLogged } = useGlobalContext();
    const mutation = useMutation({
        mutationFn: (payload: {
            email: string;
            password: string;
        }) => {
            return LogIn(payload.email, payload.password);

        },
        mutationKey: ["login-user"],
        onSuccess: async (data) => {
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);
            router.replace("/(tabs)");
        },
        onError: (error) => {
            Alert.alert(error?.message|| "An Error occurred while logging in")
            console.log(error)
        }
    });
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

   const onSubmit = () => {
       if (form.email === "" || form.password === "") {
           Alert.alert("Error", "Please fill in all fields");
           return
       }
      mutation.mutate(form)
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
                     <CustomButton title={"Submit"} handlePress={onSubmit} containerStyles={"w-full mt-7"} isLoading={mutation?.isPending} />
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