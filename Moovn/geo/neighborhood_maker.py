import geojson
import os

from geo.models import NeighborhoodBoundary, City, Name

def make():
    filenames = []
    for root, dirs, files in os.walk('geo/neighborhoods/'):
        for name in files:
            if name != '.DS_Store' and name != 'changer.py':
                filenames.append(os.path.join(root, name))


    for name in filenames:

        with open(name, 'r') as fh:
            features = geojson.load(fh)

        for item in features.features:
            name = item.properties['NAME']
            city_name = item.properties['CITY']
            region_id = item.properties['REGIONID']
            state_name = item.properties['STATE']

            if Name.objects.filter(name=city_name, state=state_name):
                city_name1 = Name.objects.get(name=city_name, state=state_name)

                NeighborhoodBoundary.objects.create(city=city_name1.city, name=name, \
                                region_id=region_id, \
                                data=geojson.dumps(geojson.FeatureCollection([item,])))
