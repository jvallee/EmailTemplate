from django.shortcuts import render

# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import CandidateSerializer  # add this
from .models import Candidate  # add this


class CandidateView(viewsets.ModelViewSet):  # add this
    serializer_class = CandidateSerializer  # add this
    queryset = Candidate.objects.all()  # add this
