import {FlatList, Image, RefreshControl, StyleSheet} from 'react-native';


import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {TVideoItem, TVideoItems} from "@/types";
import {useQuery} from "@tanstack/react-query";
import {getAllPosts, getLatestPosts} from "@/lib/Appwrite";
import VideoCard from "@/components/VideoCard";

export default function TabOneScreen() {
  const {user}= useGlobalContext()
const posts = useQuery({
  queryKey: ['posts'],
  queryFn: async ()=>{
    return await getAllPosts()
  }
})

  const trendingPosts= useQuery({
    queryKey: ['trendingPosts'],
    queryFn: async ()=>{
      return await getLatestPosts()
    }
  })

  const onRefresh = async () => {

    await posts?.refetch();

  };
  // @ts-ignore
  return (
  <SafeAreaView className={"bg-primary min-h-screen"}>
    <FlatList

        data={posts.data as unknown as TVideoItems }
              keyExtractor={(item) => item?.$id?.toString()}
              renderItem={({item})=>(
                  <>
                  {
                    posts ?
                        // @ts-ignore
                   <View className={ item?.$id == posts?.data[posts?.data?.length -1 as any]?.$id ? "pb-10": ""} >
                     <VideoCard title={item?.title} creator={item?.creator?.username} avatar={item?.creator?.avatar} thumbnail={item?.thumbnail} video={item?.video}/>
                   </View>: null
                  }
                  </>

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
                            className="w-14 h-16"
                            resizeMode="contain"
                        />
                      </View>
                    </View>
<SearchInput/>

                    <View className="w-full flex-1 pt-5 pb-8">
                      <Text className="text-lg font-pregular text-gray-100 mb-3">
                        Latest Videos
                      </Text>

<Trending posts={trendingPosts?.data as unknown as TVideoItems ?? []}/>
                    </View>
                  </View>
              )}
ListEmptyComponent={() => (
    <EmptyState title={"No videos found"} subtitle={"Be the first to upload a video"}/>
)
    }
        refreshControl={
          <RefreshControl refreshing={posts?.isRefetching} onRefresh={onRefresh} />
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
