import {FlatList, Image, StyleSheet} from 'react-native';


import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {TVideoItem, TVideoItems} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {getAllPosts} from "@/lib/Appwrite";

export default function TabOneScreen() {
  const {user}= useGlobalContext()
const posts = useQuery({
  queryKey: ['posts'],
  queryFn: async ()=>{
    const response = await getAllPosts()
    return response
  }


})

  console.log(posts)
  return (
  <SafeAreaView className={"bg-primary min-h-screen"}>
    <FlatList data={posts?.data as unknown as TVideoItems }
              keyExtractor={(item) => item?.$id?.toString()}
              renderItem={({item})=>(

                        <Text className={"text-3xl text-white"}>
                        {item?.$id}
                        </Text>

                )}
              ListHeaderComponent={() => (
                  <View className="flex my-6 px-4 space-y-6">
                    <View className="flex justify-between items-start flex-row mb-6">
                      <View>
                        <Text className="font-pmedium text-sm text-gray-100">
                          Welcome Back
                        </Text>
                        <Text className="text-2xl font-psemibold text-white">
                          {(user as any)?.username}
                        </Text>
                      </View>

                      <View className="mt-1.5">
                        <Image
                            source={images.logoSmall}
                            className="w-9 h-10"
                            resizeMode="contain"
                        />
                      </View>
                    </View>
<SearchInput/>

                    <View className="w-full flex-1 pt-5 pb-8">
                      <Text className="text-lg font-pregular text-gray-100 mb-3">
                        Latest Videos
                      </Text>

{/*<Trending posts={[]}/>*/}
                    </View>
                  </View>
              )}
ListEmptyComponent={() => (
    <EmptyState title={"No videos found"} subtitle={"Be the first to upload a video"}/>
)
    }
              />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
