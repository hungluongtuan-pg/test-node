import {v4} from "uuid";
import * as AWS from 'aws-sdk'
const connection = new AWS.DynamoDB.DocumentClient({region: "ap-southeast-1"})
const DB_TABLE = "blog";

export class BlogService {

    fetchBlogById = async (id: string) => {
        const blogItem = await connection
          .get({
            TableName: DB_TABLE,
            Key: {
                blogId: id,
            },
          })
          .promise();  
        return blogItem['Item'];
    }

    async create(data: any) :Promise<object | Error>{
        const blogItem = {
            ...data,
            blogId: v4(),
            createAt: String(new Date())
        }
        await connection
          .put({
            TableName: DB_TABLE,
            Item: blogItem,
          })
          .promise();
        
        return blogItem;
    }

    async list() :Promise<object | Error>{
        const output = await connection.scan({ TableName: DB_TABLE, }).promise();
        return output;
    }

    async findOne(id: string) :Promise<object | Error>{
        const blog =  this.fetchBlogById(id);
        if (!blog) {
            return {
                status: false,
                message: "not found blog to id " + id
            }
        }
        return {blog}
    }

    async update(id: string, data: any) :Promise<object | Error>{
        const blogItemCheck = await this.fetchBlogById(id);

        if (!blogItemCheck) {
            return {
                status: false,
                message: "not found blog to id " + id
            }
        }

        const blogItem = {
            ...data,
            blogId: id,
        }

        await connection
        .put({
          TableName: DB_TABLE,
          Item: blogItem,
        })
        .promise();
      
        return blogItem;
    }

    async delete(id: string) :Promise<object | Error>{
        const blog = await this.fetchBlogById(id);
        if (!blog) {
            return {
                status: false,
                message: "not found blog to id " + id
            }
        }
        await connection
        .delete({
            TableName: DB_TABLE,
            Key: {
                blogId: id,
            },
        })
        .promise();

        return {
            status: true
        };
    }
}