from django.urls import path
from . import views

app_name = 'website'

urlpatterns = [
    path("", views.index, name="index"),
    path("project-list", views.project_list, name="project-list"),
    path("resume", views.view_resume, name="resume"),
]