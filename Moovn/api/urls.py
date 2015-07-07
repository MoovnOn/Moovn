from django.conf.urls import url, include
from rest_framework import routers


from . import views

router = routers.DefaultRouter()


urlpatterns = [
    url(r'boundary/(?P<state>[\w]+)/(?P<name>[\w]+)/', views.city_boundary_view),
]

#urlpatterns.extend(router)
