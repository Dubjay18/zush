import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {View, Text, FlatList, Alert, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useQuery} from "@tanstack/react-query";
import {searchPosts} from "@/lib/Appwrite";
import VideoCard from "@/components/VideoCard";
import {TVideoItems} from "@/types";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";


const Search = () => {
    const { query } = useLocalSearchParams();
const searchQuery = useQuery({
    queryKey: ['searchQuery'],
    queryFn: async ()=>{
        return await searchPosts(query as string)
    }
})
    useEffect(() => {
       searchQuery.refetch();
    }, [query]);

    useEffect(() => {
        console.log(searchQuery?.data,"searchQuery")
        if(searchQuery?.isError){
            Alert.alert("Error", "An error occurred while fetching search results")
        }
    }, [searchQuery]);

    return (
        <SafeAreaView className="bg-primary h-full">


                    <FlatList
                        data={searchQuery?.data as unknown as TVideoItems}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => (
                            <>
                                {    searchQuery?.isFetching || searchQuery?.isRefetching ? (
                                        <View className="flex justify-center items-center h-full">
                                            <Text className="text-white font-psemibold text-2xl"><ActivityIndicator color={"#fff"} size={40}/></Text>
                                        </View>):

                            <VideoCard
                                title={item?.title}
                                thumbnail={item?.thumbnail}
                                video={item?.video}
                                creator={item?.creator?.username}
                                avatar={item?.creator?.avatar}
                            />
                                }
                            </>
                        )}
                        ListHeaderComponent={() => (
                            <>
                                <View className="flex my-6 px-4">
                                    <Text className="font-pmedium text-gray-100 text-sm">
                                        Search Results
                                    </Text>
                                    <Text className="text-2xl font-psemibold text-white mt-1">
                                        {query}
                                    </Text>

                                    <View className="mt-6 mb-8">
                                        <SearchInput initialQuery={query as string}  />
                                    </View>
                                </View>
                            </>
                        )}
                        ListEmptyComponent={() => (
                            <EmptyState
                                title="No Videos Found"
                                subtitle="No videos found for this search query"
                            />
                        )}
                    />


        </SafeAreaView>
    );
}


export default Search;