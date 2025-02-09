# Generated by Django 5.1.1 on 2024-10-09 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_videoprogress'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='genre',
            field=models.CharField(choices=[('science', 'Science'), ('arts', 'Arts'), ('kids', 'Kids')], default='arts', max_length=20),
        ),
        migrations.AddField(
            model_name='video',
            name='type',
            field=models.CharField(choices=[('educational', 'Educational'), ('fun', 'Fun'), ('learning', 'Learning')], default='fun', max_length=20),
        ),
        migrations.AddField(
            model_name='video',
            name='video_length',
            field=models.CharField(choices=[('snippet', 'Snippet'), ('short', 'Short'), ('full', 'Full')], default='full', max_length=20),
        ),
    ]
