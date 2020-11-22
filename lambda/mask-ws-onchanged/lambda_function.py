import boto3
import ast
import hmac
import base64
import json
import uuid
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import logging
import urllib3

logger = logging.getLogger('dev')
logger.setLevel(logging.DEBUG)
client = boto3.client('apigatewaymanagementapi')
dynamodb = boto3.resource('dynamodb')

def _send_to_connection(connection_id, data, event):
    gatewayapi = boto3.client("apigatewaymanagementapi",
            #endpoint_url = "https://" + event["requestContext"]["domainName"] +
            #        "/" + event["requestContext"]["stage"])
            endpoint_url = "https://osthfcjrw8.execute-api.us-east-1.amazonaws.com/production")
    response = gatewayapi.post_to_connection(ConnectionId=connection_id,
            Data=json.dumps(data).encode('utf-8'))
    print(response)
    print("response>>>>>>>")
    return response
    
    
def lambda_handler(event, context):
    print(event)
    
    table = dynamodb.Table("mask_ws")
    response = table.scan()
    data1 = response['Items']
    length = data1.__len__()
    print("data1:::")
    print(data1)
    dateitem = event['Records'][0]['dynamodb']['NewImage']['date']['S']
    outingitem = event['Records'][0]['dynamodb']['NewImage']['outing']['N']
    wearingitem = event['Records'][0]['dynamodb']['NewImage']['wearing']['N']
    data = {'date':dateitem, 'outing':outingitem, 'wearing':wearingitem}
    valresp = ""
    for x in range(length):
        connectionID = data1[x]['connection_id']
        valresp =  _send_to_connection(connectionID, data, event)
    print(valresp)
    
    return {'statusCode':200}