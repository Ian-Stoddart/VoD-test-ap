# Generated by Django 5.1.1 on 2024-09-24 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_video_pre_set1_alter_video_pre_set2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='pre_set1',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='pre_set2',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='pre_set3',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='pre_set4',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='pre_set5',
            field=models.DurationField(blank=True, null=True),
        ),
    ]
