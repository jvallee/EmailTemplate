import uuid

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import JSONField
from django.db import models
from django_extensions.db import models as ext_models
from django.utils.translation import gettext_lazy as _


class Client(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name


class Job(ext_models.TimeStampedModel):
    name = models.CharField(max_length=240)
    subject = models.CharField(default='', max_length=140, null=True)
    poster = models.ForeignKey(Client, related_name='jobs', on_delete=models.CASCADE)
    template = models.TextField()
    hasDraft = models.BooleanField(default=False)
    templateDraft = models.TextField(default="")
    subject = models.CharField(default='', max_length=140)

    def _str_(self):
        return self.name


class OutreachStatus(models.TextChoices):
    DRAFT = "DRAFT", _("DRAFT")
    FINALIZED = "FINALIZED", _("FINALIZED")


class Outreach(ext_models.TimeStampedModel):
    job = models.ForeignKey(Job, related_name='outreaches', on_delete=models.CASCADE)

    class Meta:
        db_table = "outreach"

    # In a real app this would be tied to a user or job
    # Not starting with that to keep the onsite minimal

    state = models.CharField(max_length=10, choices=OutreachStatus.choices, default=OutreachStatus.DRAFT)
    editor_state = JSONField(null=True)  # state used by the frontend editor
