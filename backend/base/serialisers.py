from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class VideoSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class ProgressSerialiser(serializers.ModelSerializer):
    class Meta:
        model = VideoProgress
        fields = '__all__'

class SeriesSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = '__all__'