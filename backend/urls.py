from django.urls import path
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import json
import numpy as np

def home(request):
    return render(request, 'index.html')

def prosses_data(request):
    data = json.loads(request.body)
    grid = data.get('grid')
    grid = np.array(grid)

    ships = data.get('ships')

    ss = [4,3,3,2,2,2]
    final_ships = []

    for i in range(len(ships)):
        if ships[i] == 0:
            final_ships.append(ss[i])

    print(final_ships)

    res = np.zeros((10,10))

    for ship in final_ships:
        for row in range(10):
            for col in range(10-ship+1):
                positions = grid[row][col:col+ship]
                if 1 not in positions:
                    for i in range(ship):
                        res[row][col+i] = res[row][col+i] + 1

        for row in range(10-ship+1):
            for col in range(10):
                rows = grid[row:row+ship]
                positions = []
                for r in rows:
                    positions.append(r[col])
                if 1 not in positions:
                    for i in range(ship):
                        res[row+i][col] = res[row+i][col] + 1
    final_dict = {'grid': res}
    return HttpResponse(json.dumps(final_dict))

urlpatterns = [
    path('', home),
    path('api/', prosses_data)
]
