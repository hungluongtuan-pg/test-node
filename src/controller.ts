import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {BlogService} from "./services/blogService";
import {TranformerResponse} from "./tranformer/response"

const blogService = new BlogService()
const headers = {
    "content-type": "application/json",
};

export const blogCreate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = JSON.parse(event.body as string);
    try {
        const result = await blogService.create(reqBody);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const result = await blogService.list();
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogDetail = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const result = await blogService.findOne(event.pathParameters?.id as string);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("" + err)
    }
};

export const blogUpdate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id as string;
    const reqBody = JSON.parse(event.body as string);
    try {
        let result = await blogService.update(id, reqBody);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};

export const blogDelete = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id as string
    try {
        let result = await blogService.delete(id);
        return TranformerResponse.success(result)
    } catch (err) {
        return TranformerResponse.error("Error at: " + err)
    }
};