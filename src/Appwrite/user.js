import { Client, Users } from 'node-appwrite';
import conf from '../conf/conf';

// Initialize the Appwrite Client
const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your Project ID from Appwrite console
    .setKey('standard_792d6336b1fb487f574ce5fad9a7b1055d275a84698fcf914aa2090342791efb89a3cef4794b31bc21c50cce3204b04b6c9906279d529ee6c885a01e72abd90335b820e1d80f7c69e4d5afefe3277a9e0585ac491e82b33b84e0e5edb66ea3ff7166d66ef925668ad953b83c06b7ad97d2f57331cf37c4082cfeb1fa7a40d4fe'); // Your API Key from Appwrite console

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



