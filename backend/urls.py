from django.urls import path
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def prosses_data(request):
    data = request.GET
    grid = data.get('grid')
    ships = data.get('ships')
    print(data)
    return HttpResponse('sada')

urlpatterns = [
    path('', home),
    path('api/', prosses_data)
]
