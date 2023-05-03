from channels.generic.websocket import WebsocketConsumer
import json
import time
from asgiref.sync import async_to_sync
from .models import *
from channels.layers import get_channel_layer



class consumer(WebsocketConsumer):

    def connect(self):
        osbj = self.scope['url_route']['kwargs']['user']
        p = c_id.objects.create(user = osbj , user_channel = self.channel_name)
        self.accept()
    def receive(self , text_data):
        v1 = json.loads(text_data)['to']
        v2 = json.loads(text_data)['from']
        v3 = json.loads(text_data)['type']
        v4 = json.loads(text_data)['data']
        lop = json.dumps({'from' : v2 , 'type' : v3 , 'data' : v4})
        var = c_id.objects.filter(user = v1)
        if var.exists() != True:
            pass
        else:
            
           print(var[0].user_channel , var[0].user)
           async_to_sync(get_channel_layer().send)(
           var[0].user_channel,
           {
              'type': 'chat',
              'signal_type': 'notification',
              'message': {'from' : v2 , 'rec_type' : v3 , 'data' : v4},
           }
        
          )
    def disconnect(self , close_code):
         pop = self.scope['url_route']['kwargs']['user']
         p = c_id.objects.filter(user = pop)
         p.delete()

    def chat(self , event):
        msg = event['message']
        c = {'signal_type': event['signal_type'] , 'info' : event['message']}
        m = json.dumps(c)
        self.send(text_data = m)

