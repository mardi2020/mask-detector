import json
import boto3

def lambda_handler(event, context):
    print("event:::")
    print(event)
    connection_id=event['requestContext']['connectionId']#
    dynamodb = boto3.resource('dynamodb')
    table1 = dynamodb.Table('mask_ws')
    response = table1.delete_item(
        Key={
            'connection_id': event['requestContext']['connectionId']
        }
    )
    return {
        'statusCode': 200
        
    }