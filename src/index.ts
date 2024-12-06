import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'this Project is deplyed using Github Actions Pipline : Using AMZON ECR FOR IMAGE BUILD AND DEPLOYED TO AMZON LAMNDA!',
    };
};