import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {BlogService} from "./services/blogService";
import {TranformerResponse} from "./tranformer/response"
import { BlogBody } from "../type/blog"

const blogService = new BlogService()
const headers = {
    "content-type": "application/json",
};


export const blogCreate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = JSON.parse(event.body as string);
    const requestCreateBlog : BlogBody = {
        title: reqBody.title,
        rate: reqBody.rate,
        description: reqBody.description,
    };
    try {
        const result = await blogService.create(requestCreateBlog);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | Error> => {
    try {
        const result = await blogService.list();
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogDetail = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | Error> => {
    try {
        const result = await blogService.findOne(event.pathParameters?.id as string);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("" + err)
    }
};

export const blogUpdate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | Error> => {
    const id = event.pathParameters?.id as string;
    const reqBody = JSON.parse(event.body as string);
    const requestCreateBlog : BlogBody = {
        title: reqBody.title,
        rate: reqBody.rate,
        description: reqBody.description,
    };
    try {
        let result = await blogService.update(id, requestCreateBlog);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogDelete = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult | Error> => {
    const id = event.pathParameters?.id as string
    try {
        let result = await blogService.delete(id);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};