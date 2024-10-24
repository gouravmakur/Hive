import { Client , Account , ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password , name}){

        try {

            const UserAccount =  await this.account.create(ID.unique(), email , password, name)
            if(UserAccount){
                return this.login(email , password);
            }
            
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    async login({email , password}){
        try {
            
            return await this.account.createEmailPasswordSession(email , password);

        } catch (error) {
            
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    async getCurrentUser(){

        try {
            
            const user = await this.account.get();
            if(user) return user;

        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    async logout(){

        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;