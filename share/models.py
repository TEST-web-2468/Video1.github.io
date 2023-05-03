from django.db import models

# Create your models here.








class c_id(models.Model):
    user_channel = models.CharField(max_length = 10000000000)
    user = models.CharField(max_length = 100000 , default = 'null')