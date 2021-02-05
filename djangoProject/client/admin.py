# candidate/admin.py

from django.forms import ModelChoiceField
from django.contrib import admin
from .models import Client, Job  # add this


# class JobAdmin(admin.ModelAdmin):  # add this
#     list_display = ['name', 'poster']  # add this


class ClientAdmin(admin.ModelAdmin):
    list_display = ['name']


class CustomContentTypeChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return "Pretty name for %s" % obj.name


class JobAdmin(admin.ModelAdmin):
    list_display = ['name', 'poster', 'id']  # add this

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        print('hello')
        if db_field.name == "poster":
            print('here')
            return CustomContentTypeChoiceField(queryset=Client.objects.all())
            print('after')
        return super(JobAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models here.
admin.site.register(Client, ClientAdmin)  # add this
admin.site.register(Job, JobAdmin)  # add this
