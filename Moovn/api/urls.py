from django.conf.urls import url, include
from rest_framework import routers


from . import views

router = routers.DefaultRouter()


urlpatterns = [
    url(r'boundary/(?P<id>[\w]+)/', views),

]

urlpatterns.extend(router)
