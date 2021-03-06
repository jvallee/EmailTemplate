# Generated by Django 3.1.4 on 2021-02-06 16:17

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('name', models.CharField(max_length=240)),
                ('template', models.TextField()),
                ('hasDraft', models.BooleanField(default=False)),
                ('templateDraft', models.TextField(default='')),
                ('subject', models.CharField(default='', max_length=140)),
                ('poster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='client.client')),
            ],
            options={
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Outreach',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('state', models.CharField(choices=[('DRAFT', 'DRAFT'), ('FINALIZED', 'FINALIZED')], default='DRAFT', max_length=10)),
                ('editor_state', models.JSONField(null=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outreaches', to='client.job')),
            ],
            options={
                'db_table': 'outreach',
            },
        ),
    ]
