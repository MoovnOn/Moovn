


with open('CityBoundaries/dict.py', 'r') as fh:
    lines = fh.readlines()

cities = {}
FE_cities = []
for item in lines:
    city = item.split('\t')

    # nameA--nameB, State--State--State \t ID

    city[0] = city[0].split(',')

    city[0][0] = city[0][0].split('--') # city
    city[0][1] = city[0][1].split('--') # state


    if len(city[0][0]) == len(city[0][1]):
        for idx in range(len(city[0][0])):
            FE_cities.append(city[0][0][idx] + ', ' + city[0][1][idx].strip())
            cities[city[0][0][idx] + ', ' + city[0][1][idx].strip()] = city[1]

    else:
        if len(city[0][0]) > len(city[0][1]):
            for item in city[0][0]:
                FE_cities.append(item + ', ' + city[0][1][0].strip())
                cities[item + ', ' + city[0][1][0].strip()] = city[1]

        else:
            for item in city[0][1]:
                FE_cities.append(city[0][0][0] + ', ' + item.strip())
                cities[city[0][0][0] + ', ' + item.strip()] = city[1]


with open('FE_cities.py', 'w') as fh:
    for item in FE_cities:
        fh.write(item + '\n')

with open('cities.py', 'w') as fh:
    for item in cities:
        fh.write(item + ':' + cities[item] + '\n')
