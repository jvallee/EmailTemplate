# Generated by Django 3.1.4 on 2021-01-19 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0010_remove_job_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='subject',
            field=models.CharField(default='', max_length=140, null=True),
        ),
    ]
