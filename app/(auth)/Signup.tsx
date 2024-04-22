
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Text, ScrollView, Dimensions, Alert, Image, KeyboardAvoidingView} from "react-native";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {CreateUser} from "@/lib/Appwrite";
import {useMutation} from "@tanstack/react-query";
import {useGlobalContext} from "@/context/GlobalProvider";


const SignUp = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const mutation = useMutation({
        mutationFn: (payload: {
            email: string;
            password: string;
            username: string;
        }) => {

           return CreateUser(payload.email, payload.password, payload.username);

        },
        mutationKey: ["create-user"],
        onSuccess: (data) => {
            setUser(data);
            router.replace("/(tabs)");
        },
        onError: (error) => {
            console.log(error)
        }
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.username === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return
        }



        mutation.mutate(form);
        // try {
        //     const result = await createUser(form.email, form.password, form.username);
        //     setUser(result);
        //     setIsLogged(true);
        //
        //     router.replace("/home");
        // } catch (error) {
        //     Alert.alert("Error", error.message);
        // } finally {
        //     setSubmitting(false);
        // }

    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <KeyboardAvoidingView
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[34px]"
                    />

                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign Up to Zush
                    </Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-10"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={mutation?.isPending}
                    />

                    <KeyboardAvoidingView className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already?
                        </Text>
                        <Link
                            href="/SignIn"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Login
                        </Link>
                    </KeyboardAvoidingView>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
