from django.conf.urls import url, include
#from rest_framework import routers

from . import views

#router = routers.DefaultRouter()


urlpatterns = [
    url(r'^boundary/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.city_boundary_view),
    url(r'^homeprices/(?P<state>[\w]+)/(?P<city>(?:[\w\.]+\s?\-?)+)/$', views.HomeView.as_view()),
<<<<<<< HEAD
    # url(r'^celldata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+/$', views.cell_view),
=======
    url(r'^celldata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.cell_view),
>>>>>>> 541cd54d7b853c6b51452295554369bbbfb55ba2
    url(r'^neighborhoods/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.neighborhood_view),
    url(r'^industrydata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.industry_view),

]

#urlpatterns.extend(router)
