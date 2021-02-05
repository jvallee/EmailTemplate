from django.db import models


class Candidate(models.Model):
    name = models.TextField()
    years_experience = models.DecimalField(max_digits=5, decimal_places=2)
    custom = models.TextField()

    def _str_(self):
        return self.name
