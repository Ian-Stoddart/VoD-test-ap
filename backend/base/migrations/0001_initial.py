# Generated by Django 5.1.1 on 2024-09-24 12:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('video_file', models.FileField(upload_to='videos/')),
                ('upload_date', models.DateTimeField(auto_now_add=True)),
                ('is_published', models.BooleanField(default=True)),
                ('number_of_views', models.IntegerField(default=0)),
                ('pre_set1', models.DurationField()),
                ('pre_set2', models.DurationField()),
                ('pre_set3', models.DurationField()),
                ('pre_set4', models.DurationField()),
                ('pre_set5', models.DurationField()),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
