import os
import re

# load objects
# loop through names
# regex match name/state (find) in district address
filenames = []
for root, dirs, files in os.walk('.'):
    for name in files:
        filenames.append(os.path.join(root, name))

names = [item.name + ', ' + item.state for item in Name.objects.all()]
for name in filenames:
    with open(name, 'r') as fh:
        data = json.load(fh)

    for item in data.features:
        if item.properties[""]
