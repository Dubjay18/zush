import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useGlobalContext} from "@/context/GlobalProvider";
import {useQuery} from "@tanstack/react-query";
import {getLatestPosts, getUserPosts, signOut} from "@/lib/Appwrite";
import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox";
import VideoCard from "@/components/VideoCard";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import {router} from "expo-router";

export  default function Profile({}){
    const { user, setUser, setIsLogged } = useGlobalContext();
    // const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
    const userPosts= useQuery({
        queryKey: ['trendingPosts'],
        queryFn: async ()=>{
            return await getUserPosts((user as any)?.$id)
        }
    })
    console.log(userPosts.data)
    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLogged(false);

        router.replace("/(auth)/SignIn");
    };
    return(
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={userPosts.data as any[]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item?.title}
                        thumbnail={item?.thumbnail}
                        video={item?.video}
                        creator={item?.creator?.username}
                        avatar={item?.creator?.avatar}
                    />
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this profile"
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity

                            onPress={logout}
                            className="flex w-full items-end mb-10"
                        >
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
                            <Image
                                source={{ uri: (user as any)?.avatar }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={(user as any)?.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="mt-5 flex flex-row">
                            <InfoBox
                                title={userPosts?.data?.length || 0}
                                subtitle="Posts"
                                titleStyles="text-xl"
                                containerStyles="mr-10"
                            />
                            <InfoBox
                                title="1.2k"
                                subtitle="Followers"
                                titleStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}