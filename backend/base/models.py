from django.db import models
from django.contrib.auth.models import User


class Series(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title
    

class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    video_file = models.URLField(max_length=2000)
    thunbnail = models.CharField(max_length=2000, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)
    number_of_views = models.IntegerField(default=0)
    pre_set1_desc = models.CharField(max_length=200, blank=True)
    pre_set1 = models.IntegerField(null=True, blank=True)
    pre_set2_desc = models.CharField(max_length=200, blank=True)
    pre_set2 = models.IntegerField(null=True, blank=True)
    pre_set3_desc = models.CharField(max_length=200, blank=True)
    pre_set3 = models.IntegerField(null=True, blank=True)
    pre_set4_desc = models.CharField(max_length=200, blank=True)
    pre_set4 = models.IntegerField(null=True, blank=True)
    pre_set5_desc = models.CharField(max_length=200, blank=True)
    pre_set5 = models.IntegerField(null=True, blank=True)
    series = models.ForeignKey(Series, on_delete=models.SET_NULL, null=True, blank=True, related_name='videos')
    _id = models.AutoField(primary_key=True, editable=False)
    GENRE_CHOICES = [
        ('science', 'Science'),
        ('arts', 'Arts'),
        ('kids', 'Kids'),
    ]
    VIDEO_LENGTH_CHOICES = [
        ('snippet', 'Snippet'),
        ('short', 'Short'),
        ('full', 'Full'),
    ]
    TYPE_CHOICES = [
        ('educational', 'Educational'),
        ('fun', 'Fun'),
        ('learning', 'Learning'),
    ]
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES, default='arts')
    video_length = models.CharField(max_length=20, choices=VIDEO_LENGTH_CHOICES, default='full')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='fun')

    def __str__(self):
        return self.title


class VideoProgress(models.Model):
    user = models.CharField(max_length=200)
    video_id = models.CharField(max_length=200)
    time = models.IntegerField()
    date_time = models.DateTimeField(blank=True, null=True)


# class Playlist(models.Model):


