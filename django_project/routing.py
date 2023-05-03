from channels.routing import ProtocolTypeRouter , URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from share import consumer
from django.core.asgi import get_asgi_application




application = ProtocolTypeRouter({
    'websocket':AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                path('api/<str:user>/' , consumer.consumer.as_asgi()),
            ])
        )
    ),
    'http' : get_asgi_application()
})
