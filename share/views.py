from django.shortcuts import render
from django.http import HttpResponse as hp
# Create your views here.







def home(req , user):
    v = render(req , 'home.php')
    return hp(v)