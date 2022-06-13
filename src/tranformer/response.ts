const successStatus = 200;
const serverErrorStatus = 500;
const unAuthorizeStatus = 401;
const badRequestStatus = 400;
const forbiddenStatus = 403;


export class BodyResponse <T>{
    private statusCode: number;
    private code: number;
    private message: string;
    private data: T

    constructor(statusCode: number, code: number, message: string, data: T) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.data = data
    }

    toString() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                code: this.code,
                message: this.message,
                data: this.data,
            }),
        }
    }
}

export class TranformerResponse {
    static success(data: object) {
        const result = new BodyResponse(successStatus, successStatus, 'success', data)
        return result.toString()
    }

    static error(message: string, code: number = serverErrorStatus) {
        const result = new BodyResponse(serverErrorStatus, code, message, null)
        return result.toString()
    }
}