import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
    disabled
                      }:{
    title: string,
    handlePress: () => void,
    containerStyles?: any,
    textStyles?: any,
    isLoading?: boolean,
    disabled?: boolean
}) => {
    return (
    <TouchableOpacity onPress={handlePress} disabled={isLoading || disabled} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading && "opacity-50"}`}>
        {
            isLoading ? (
                <View className="">
                    <ActivityIndicator size="small" color="#fff" />
                </View>
            ):<Text className={`text-primary font-psemibold text-lg ${textStyles}`} >{title}</Text>
        }

    </TouchableOpacity>
    );
};

export default CustomButton;