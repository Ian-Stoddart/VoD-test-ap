# Generated by Django 5.1.1 on 2024-10-09 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_video_thunbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='thunbnail',
            field=models.CharField(blank=True, max_length=2000),
        ),
    ]
