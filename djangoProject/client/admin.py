# candidate/admin.py

from django.forms import ModelChoiceField
from django.contrib import admin
from .models import Client, Job, Outreach  # add this


# class JobAdmin(admin.ModelAdmin):  # add this
#     list_display = ['name', 'poster']  # add this


class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'id']


class CustomContentTypeChoiceField(ModelChoiceField):
    def label_from_instance(self, obj):
        return "Pretty name for %s" % obj.name


class JobAdmin(admin.ModelAdmin):
    list_display = ['name', 'poster', 'id']  # add this

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "poster":
            return CustomContentTypeChoiceField(queryset=Client.objects.all())
        return super(JobAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


class OutreachAdmin(admin.ModelAdmin):
    list_display = ['state', 'job']  # add this

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'job':
            return CustomContentTypeChoiceField(queryset=Job.objects.all())
        return super(OutreachAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models here.
admin.site.register(Client, ClientAdmin)  # add this
admin.site.register(Job, JobAdmin)  # add this
admin.site.register(Outreach, OutreachAdmin)
