# candidate/admin.py

from django.contrib import admin
from .models import Candidate  # add this


class CandidateAdmin(admin.ModelAdmin):  # add this
    list_display = ('name', 'custom', 'years_experience')  # add this


# Register your models here.
admin.site.register(Candidate, CandidateAdmin)  # add this
