from django.conf.urls import url, include
#from rest_framework import routers

from . import views

#router = routers.DefaultRouter()


urlpatterns = [
    url(r'^boundary/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.city_boundary_view),
    url(r'^homeprices/(?P<state>[\w\-]+)/(?P<city>[\w\-]+)/$', views.HomeView.as_view()),
    url(r'^celldata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+/$', views.cell_view),
    url(r'^neighborhoods/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.neighborhood_view),
]

#urlpatterns.extend(router)
