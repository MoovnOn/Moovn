from django.conf.urls import url, include

from . import views


urlpatterns = [
    url(r'^boundary/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.city_boundary_view),
    url(r'^homeprices/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.HomeView.as_view()),
    url(r'^celldata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.cell_view),
    url(r'^neighborhoods/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.neighborhood_view),
    url(r'^neighborhooddata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/(?P<region_id>[\w]+)/$', views.neighborhooddata_view),
    url(r'^neighborhooddata/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.neighborhooddata_view),
    url(r'^salary/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/(?P<job>(?:[\w\.\,]+\s?\-?)+)/$', views.salary_view),
    url(r'^cityschools/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/', views.school_districts_view),
    url(r'^nearbyschools/(?P<state>[\w]+)/', views.nearby_schools_view),
    url(r'^schoolprofile/(?P<state>[\w]+)/(?P<gsid>[0-9]+)/', views.school_view),
    url(r'^industrysize/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.industry_size_view),
    url(r'^college/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.college_view),
    url(r'^parity/(?P<state>[\w]+)/(?P<name>(?:[\w\.]+\s?\-?)+)/$', views.parity_view),

]
