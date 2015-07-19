from geo.models import Occupation


def oe_ocup_load():
    with open('geo/oe_ocup.csv') as file:
        for line in file:
            Occupation.objects.create(code=line.split(',', 1)[0].rstrip('\n'),
                                      job=line.split(',', 1)[1].strip().replace('"', ''))
