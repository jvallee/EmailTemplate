from django.shortcuts import render

# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import ClientSerializer, JobSerializer  # add this
from .models import Client, Job  # add this


class ClientView(viewsets.ModelViewSet):  # add this
    serializer_class = ClientSerializer  # add this
    queryset = Client.objects.all()  # add this


class JobView(viewsets.ModelViewSet):  # add this
    serializer_class = JobSerializer  # add this
    queryset = Job.objects.all()  # add this
    # ordering_fields = '__all__'


