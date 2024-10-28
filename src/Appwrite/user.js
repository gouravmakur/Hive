import { Client, Users } from 'node-appwrite';
import conf from '../conf/conf';

// Initialize the Appwrite Client
const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your Project ID from Appwrite console
    .setKey(conf.appwriteApiKey); // Your API Key from Appwrite console

const users = new Users(client);

// Async function to get the user details
export  async function getUserDetails(userid) {
    try {
        const result = await users.get(userid); // Replace <USER_ID> with the actual user ID
        return result;
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
}



