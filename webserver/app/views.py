from django.shortcuts import render
from django.http import JsonResponse

Inventory = [
    '182.18.0.1',
    '182.18.0.3',
    '182.18.0.5',
    '182.18.0.7',
    '182.18.0.9',
]

Status = {
    '182.18.0.1': [2, 'root'],
    '182.18.0.3': [2, 'root'],
    '182.18.0.5': [0, 'thekarananad', 'Fake Error!'],
    '182.18.0.7': [1, 'root'],
    '182.18.0.9': [1, 'root'],
}

def index(request):
    return render(request, "index.html")

def api_inventory(request):

    if request.method == "GET":

        data = {
            'inventory': Inventory,
            'details'  : Status,
        }
        return JsonResponse(data, status=200)
    
    if request.method == "POST":
        IP = request.POST['IP']
        SSHUsername = request.POST['SSHUsername']
        Password = request.POST['Password']

        Inventory.append(IP)
        Status[IP] = ['1', SSHUsername]

        return JsonResponse({'status': 'ok'})