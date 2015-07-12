from geo.models import City, NeighborhoodBoundary

import os

def create():

    for root, dirs, files in os.walk('geo/neighborhoods/converted'):
        for item in files:
            with open(os.path.join(root, item), 'r') as fh:
                data = fh.read()

            city = City.objects.get(geo_id=item[:-5])
            NeighborhoodBoundary.objects.create(data=data, city=city)
