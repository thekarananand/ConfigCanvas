from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/inventory/", views.api_inventory, name="api_inventory"),
]