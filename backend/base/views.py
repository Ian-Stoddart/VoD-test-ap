from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime

from .models import *
from .serialisers import *

import redis
import json


r = redis.Redis(
  host='redis-12812.c16.us-east-1-3.ec2.redns.redis-cloud.com',
  port=12812,
  password='WhD54GJnAEVYrEjk30MQvNUtrDB35oTD')



@api_view(['GET'])
def getRoutes(request):
    routes =[
        '/api/videos',
        'api/videos/create',

        'api/videos/<id>/',

        'api/videos/delete/<id>/',
        'api/videos/<update>/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def getSeries(request):
    series = Series.objects.all()
    serialiser = SeriesSerialiser(series, many=True)
    return Response(serialiser.data)


@api_view(['GET'])
def getVideos(request):
    videos = Video.objects.all()
    serialiser = VideoSerialiser(videos, many=True)
    return Response(serialiser.data)


# Save heartbeat data into Redis.
@api_view(['POST'])
def track_video(request):
    if request.method == 'POST':

        data = json.loads(request.body)

        user = data.get("userName")
        video_id = data.get("videoId")
        progress = data.get("videoPlayTime")
        date_in_mils = data.get("dateInMils")

        redis_key = f"user:{user}:video:{video_id}"

        r.hset(redis_key, 'user', user)
        r.hset(redis_key, 'video_id', video_id)
        r.hset(redis_key, 'progress', progress)
        r.hset(redis_key, 'date_in_mils', date_in_mils)

        return JsonResponse({'status': 'success'})


# On logging out, migrate video progress data from Redis to the DB.
@api_view(['POST'])
def trigger(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = data.get("user")

        keys = r.keys(f"user:{user}:video:*")

        for key in keys:
            data = r.hgetall(key)
            decoded_data = {}
            for key, value in data.items():
                decoded_data[key.decode('utf-8')] = value.decode('utf-8')

            VideoProgress.objects.create(
                user=decoded_data['user'],
                video_id=decoded_data['video_id'],
                time=float(decoded_data['progress']),
                date_time=datetime.fromtimestamp(int(decoded_data['date_in_mils']) / 1000)
                )

    # TODO add code to delete redis db at this stage

        return JsonResponse({'status': 'success'})


# get the videos that are being watched and append the progress time and the date & time watched, to them.
@api_view(['POST'])
def getProgress(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_name = data.get("user")

        progress_list = VideoProgress.objects.filter(user = user_name).order_by('-date_time')
        video_ids = [progress.video_id for progress in progress_list]
        videos = Video.objects.filter(_id__in = video_ids)

        progress_by_video_id = {
            str(progress.video_id): {'time': progress.time, 'date_time': progress.date_time} for progress in progress_list
        }
        serialiser = VideoSerialiser(videos, many=(True))

        for video_data in serialiser.data:
            video_id = video_data.get('_id')
            progress_info = progress_by_video_id.get(str(video_id))

            if progress_info:
                video_data['progress'] = progress_info.get('time')
                video_data['date_time'] = progress_info.get('date_time').isoformat()

        return Response(serialiser.data)



# @api_view(['GET'])
# def getVideo(request, pk):
#     video = None
#     for i in videos:
#         if i['_id'] == pk:
#             video = i
#             break
#     return JsonResponse('Video', safe=False)
