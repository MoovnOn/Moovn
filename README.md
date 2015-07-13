# API/DATA Sources
Weather: http://openweathermap.org/current#name

#Design Cues
D3 Zoomable Map http://bl.ocks.org/mbostock/2374239
Comparison Chart example http://www.zillow.com/durham-nc/home-values/
Slide up/fade in example http://normandrobert.com/


# Welcome to your new Django single-page app project!

This template will ease your way in building a single-page app backed by a Django API.

To use this template, run:

```
django-admin.py startproject YOUR_PROJECT_NAME --template=https://github.com/tiyd-python-2015-05/single-page-app-template/archive/master.zip --extension=py,md --name=Procfile
```

Change YOUR_PROJECT_NAME before running the above.

## Files you should know about

* `Moovn/templates/index.html` - This is where all your HTML should go. It has a few funny things in there. Make sure to use `\{% static "path/to/file.css" %\}` for all links to static files.

* `Moovn/static/` - All your static files go here. You can write them by hand or generate them with gulp or another tool.

## Heroku instructions

This app should work well with Heroku as long as you run the following commands:

```
heroku config:set DJANGO_SETTINGS_MODULE=Moovn.heroku_settings
heroku config:set PYTHONPATH=Moovn
heroku config:set SECRET_KEY=$(date | md5 | base64)
```
if you get the gulpshell error or manage.py runserver fail then..
"pip3 install -r dev_requirements.txt"
in ~/dev2/moovnon/moovn