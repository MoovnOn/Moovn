import geojson
import os

from geo.models import NeighborhoodBoundary, City, Name

def make():
    filenames = []
    for root, dirs, files in os.walk('geo/neighborhoods/'):
        for name in files:
            if name != '.DS_Store' and name != 'changer.py':
                filenames.append(os.path.join(root, name))

    names = list(Name.objects.all())
    used = []
    for name in filenames:

        with open(name, 'r') as fh:
            features = geojson.load(fh)

        for item in features.features:
            item_name = item.properties['NAME']
            city_name = item.properties['CITY']
            region_id = item.properties['REGIONID']
            state_name = item.properties['STATE']

            for name_obj in names:
                if city_name.find(name_obj.name) != -1 and name_obj.state == \
                   state_name:

                    used.append(name_obj)
            # if Name.objects.filter(name=city_name, state=state_name):
                    NeighborhoodBoundary.objects.create(city=name_obj.city, \
                                    name=item_name, \
                                    region_id=region_id, \
                                    data=geojson.dumps(\
                                           geojson.FeatureCollection([item,])))

    print([(item.name, item.state) for item in names if item not in used])
