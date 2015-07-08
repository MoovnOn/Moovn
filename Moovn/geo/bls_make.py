from geo.models import City, Name
import pandas as pd


def add_bls_codes():
    bls = pd.read_csv('geo/final_bls.csv')

    city_names = Name.objects.all()

    for name in city_names:
        blsvalue = bls.loc[(bls["state"].str.contains(name.state))
                           & (bls["city"].str.contains(name.name)), "code"].tolist()
        if blsvalue != []:
            city = name.city
            city.ind_id = blsvalue[0]
            city.save()
        else:
            print("{}, {} is not in bls data :(".format(name.city, name.state))
