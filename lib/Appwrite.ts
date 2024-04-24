import {Client, Account, ID, Avatars, Databases,Query,Storage} from 'react-native-appwrite/src';
import {TVideoItem} from "@/types";
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jay.zush',
    project: '6624d42b2556fa10f754',
    databaseId:'6624d566ad32ec1b2c9b',
    userCollectionId:'6624d5969274df770078',
    videoCollectionId: '6624d5bf8ac3aa6ca914',
    storageId: "6624ec4e69b0a8930760"

}
// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.project) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Register User

export const CreateUser =async (email:string, password:string, username:string) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, username)
        if(!newAccount){
            throw new Error("User not created")
        }
        const avatar = avatars.getInitials(username)
       await LogIn(email, password)
       const newUser =  await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId,ID.unique(),{
            accountId:newAccount.$id,
            email,
            username,
            avatar
        })
return newUser
    }
    catch(e:any){
       throw new Error(e)
    }

}

// Login User
export const LogIn = async (email:string, password:string) => {
    try{
        const session = await account.createEmailSession(email, password)
        if(!session){
            throw new Error("User not found")
        }
        return session
    }
    catch(e:any){

        throw new Error(e)
    }
}

//get User
export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get()
      if(!currentAccount) throw new Error("User not found")
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)]as any)
        if (!currentUser) throw new Error("User not found")
        return currentUser.documents[0]
    }

    catch(e:any){
        throw new Error(e)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt")])
        return posts.documents
    }catch (e:any) {
        throw new Error(e)
    }
}

export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );

        return posts.documents;
    } catch (error:any) {
        throw new Error(error);
    }
}

// Get video posts created by user
export async function getUserPosts(userId: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("creator", userId)]
        );

        return posts.documents;
    } catch (error:any) {
        throw new Error(error);
    }
}
// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error as any);
    }
}
// Get video posts that matches search query
export async function searchPosts(query: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}
// Upload File
export async function uploadFile(file:any, type:any) {
    if (!file) return;


    // const { mimeType, ...rest } = file;
    // const asset = { type: mimeType, ...rest };
    const asset = {
        name: file.fileName ?? `file-${Date.now()}.${file.uri.split(".").pop()}`,
        type: file.mimeType,
        size:file.fileSize ?? 5000,
        uri: file.uri
    };



    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile?.$id, type);
        return fileUrl;
    } catch (error:any) {
        throw new Error(error);
    }
}

// Get File Preview
export async function getFilePreview(fileId:string, type: "video"|"image") {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error:any) {
        throw new Error(error);
    }
}

// Create Video Post
export async function createVideoPost(form:any) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error: any) {
        throw new Error(error);
    }
}