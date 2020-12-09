import json
import boto3

def lambda_handler(event, context):
    connection_id=event['requestContext']['connectionId'] # connection_id 받아옴
   
    dynamodb = boto3.resource('dynamodb')
    table1 = dynamodb.Table('mask_ws')#
    
    table1.put_item(
        Item={
            'connection_id': connection_id
        }
    )
    
    return {
        'statusCode': 200
    }
    