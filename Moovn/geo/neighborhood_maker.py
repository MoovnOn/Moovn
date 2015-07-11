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
    cities = {item.city:[] for item in names}

    for name in filenames:

        with open(name, 'r') as fh:
            features = geojson.load(fh)

        for item in features.features:
            city_name = item.properties['CITY']
            state_name = item.properties['STATE']

            if city_name.find('/') != -1:
                city_name[city_name.find('/')] = '-' # I mean you, Jefferson f'in County
                item.properties['CITY'] = city_name

            for name_obj in names:
                if city_name.find(name_obj.name) != -1 and name_obj.state == \
                   state_name:

                   cities[name_obj.city].append(item)



    for item in cities:
        data = geojson.FeatureCollection(cities[item])
        filename = item.geo_id

        with open('geo/neighborhoods/city/' + filename + '.json', 'w') as fh:
            fh.write(geojson.dumps(data))

        #NeighborhoodBoundary.objects.create(city=item, data=geojson.dumps(data))


                    # NeighborhoodBoundary.objects.create(city=name_obj.city, \
                    #                 name=item_name, \
                    #                 region_id=region_id, \
                    #                 data=geojson.dumps(\
                    #                        geojson.FeatureCollection([item,])))
