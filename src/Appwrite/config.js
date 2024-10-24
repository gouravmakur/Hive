import { Client ,Account, ID, Databases , Query , Storage} from "appwrite";
import conf from "../conf/conf";

export class Service{

    client = new Client()
    account;
    databases;
    bucket;
  

    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) 

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    //databse operations

    async createPost({title, slug , content , userid , status, featuredImage}){

        try {
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userid,
                    featuredImage
                }
            )

        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title,content, status , featuredImage, userid}){

        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userid,
                    status
                }
            )
            
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){

        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;

        } catch (error) {
            
            console.log("Appwrite serive :: deletePost :: error", error);
        }
    }

    async getPost(slug){

        try {
            
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            
            console.log("Appwrite serive :: getPost :: error", error);
        }
    }

    async getAllPost(queries = [Query.equal('status' , 'active')]){

        try {
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            
            console.log("Appwrite serive :: getAllPost :: error", error);
        }
    }

    //Storeage Operations

    async uploadFile(file){

        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            
            console.log("Appwrite serive :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileId){
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;

        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
        }
    }  
    
    getFilePreview(fileId){

        return  this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }


}

const service = new Service();
export default service;