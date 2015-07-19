from geo.models import Bls


def bls_load():
    with open('geo/all_bls_codes.csv') as file:
        for line in file:
            Bls.objects.create(code=line.split(',')[0], industry=line.split(',')[1][:-1])
