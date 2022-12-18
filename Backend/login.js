const AWS = require('aws-sdk');
AWS.config.update({
    region:'us-east-1'
})
const util = require('./utils');
const bcypt = require('bcryptjs');
const { getSuggestedQuery } = require('@testing-library/react');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable= 'prototype-username';

async function login(user)
{
    const username = user.username;
    const password = user.password;
    if (!user || !username || !password ) {
        return util.buildResponse(401, {
          message: 'username and password are required'   
        })
    }

    const dynamoUser=  await getUser(username.toLowerCase().trim());
    if (!dynamoUser || !dynamoUser.username){
        return util.buildResponse(403, {
            message: 'user does not exist'
        });
    }
}