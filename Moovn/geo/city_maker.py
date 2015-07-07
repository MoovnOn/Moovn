from geo.models import City, Name, Boundary



def make():
    cities = {}
    with open('geo/cities.py', 'r', encoding='utf-8') as fh:
        items = fh.readlines()

    for item in items:
        item = item.split(':')
        cities[item[0].strip()] = item[1].strip()

    for item in cities:
        full = item.split(', ')
        name = Name.objects.create(name=full[0], state=full[1])

        if City.objects.filter(geo_id=cities[item]).exists():
            city = City.objects.get(geo_id=cities[item])
            city.names.add(name)

        else:
            city = City.objects.create(geo_id=cities[item])
            city.names.add(name)

            with open('geo/CityBoundaries/' + cities[item] + '.json', 'r', \
                      encoding='utf-8') as fh:

                boundary=Boundary.objects.create(data=fh.read(), city=city)
