from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

def the_ultimate_function(request):
    data = request.POST
    grid = data.get('grid')
    ships = data.get('ships')

    return HttpResponse('hello')

urlpatterns = [
    path('', the_ultimate_function)
]
