In 2 weeks our team built Moovn On to solve common problems people encounter when moving from one city to another. We pull in data from several API's, parse, calculate, and then visualize the data so end users can find the info they need for the places they are going.



## Development Files of note

* `Moovn/templates/index.html` - This is where all HTML should go. It has a few funny things in there. Make sure to use `\{% static "path/to/file.css" %\}` for all links to static files.

* `Moovn/static/` - All static files go here. You can write them by hand or generate them with gulp or another tool.

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
