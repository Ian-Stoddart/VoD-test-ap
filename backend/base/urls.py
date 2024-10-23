from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('videos/', views.getVideos, name="videos"),
    # path('videos/<str:pk>', views.getVideo, name="video"),
    path('videos-update/', views.track_video, name="track-video"),
    path('logout/', views.trigger, name="logout"),
    path('login/', views.getProgress, name="login"),
    path('series/', views.getSeries, name="series")
]
