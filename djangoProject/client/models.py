from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=240)
    subject = models.CharField(default='', max_length=140, null=True)
    poster = models.ForeignKey(Client, related_name='jobs', on_delete=models.CASCADE)
    template = models.TextField()
    hasDraft = models.BooleanField(default=False)
    templateDraft = models.TextField(default="")
    subject = models.CharField(default='', max_length=140)

    def _str_(self):
        return self.name

