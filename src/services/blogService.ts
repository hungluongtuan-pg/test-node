import {v4} from "uuid";
import * as AWS from 'aws-sdk'
import * as Config from "../../config";
import { BlogBody } from "../../type/blog"

class Blog {
    title?: string;
    rate?: number;
    description?: string;
    blogId?: string;
    phone?: string;
    createAt?: string;

    constructor(cas : any){
        this.title = cas.title;
        this.rate = cas.rate;
        this.description = cas.description;
        this.blogId = cas.blogId;
        this.phone = cas.phone;
        this.createAt = cas.createAt;
    }

  }
  
export class BlogService {

    connection

    constructor(){
        this.connection = new AWS.DynamoDB.DocumentClient({region: Config.REGION})

    }

    fetchBlogById = async (id: string) : Promise<Blog|null> => {
        const blogItem = await this.connection
          .get({
            TableName: String(Config.DB_TABLE),
            Key: {
                blogId: id,
            },
          })
          .promise();  

        if (!blogItem || !blogItem.Item) {
        return null;
        }
        
        return blogItem.Item as Blog;
    }

    async create(data: BlogBody) :Promise<Blog>{
        const blogItem = {
            ...data,
            blogId: v4(),
            createAt: String(new Date())
        }
        
        await this.connection
          .put({
            TableName: String(Config.DB_TABLE),
            Item: blogItem,
          })
          .promise();

        return blogItem as Blog;
    }

    async list() :Promise<object>{
        return await this.connection.scan({ TableName: String(Config.DB_TABLE), }).promise();
    }

    async findOne(id: string) :Promise<Blog|null>{
        return await this.fetchBlogById(id);
    }

    async update(id: string, data: BlogBody) :Promise<Blog>{
        const blogItemCheck = await this.fetchBlogById(id);

        if (!blogItemCheck) {
            throw new Error("Not Found blog");
        }

        const blogItem = {
            ...data,
            blogId: id,
        }

        await this.connection
        .put({
          TableName: String(Config.DB_TABLE),
          Item: blogItem,
        })
        .promise();
      
        return blogItem as Blog;
    }

    async delete(id: string) :Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput>{
        const blog = await this.fetchBlogById(id);
        if (!blog) {
            throw new Error("Not Found blog");
        }
        await this.connection
        .delete({
            TableName: String(Config.DB_TABLE),
            Key: {
                blogId: id,
            },
        })
        .promise();

        return {};
    }
}