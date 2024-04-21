import {Client, Account, ID, Avatars, Databases} from 'react-native-appwrite/src';
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
const databases = new Databases(client);

// Register User

export const CreateUser =async (email:string, password:string, username:string) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, username)
        if(!newAccount){
            throw new Error("User not created")
        }
        const avatar = avatars.getInitials(username)
       await SignIn(email, password)
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
export const SignIn = async (email:string, password:string) => {
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