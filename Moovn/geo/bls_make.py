from geo.models import City, Name
import pandas as pd


def add_bls_codes():
    bls = pd.read_csv('geo/final_bls.csv')
    abv = pd.read_csv('geo/bls_abv.csv')

    city_names = Name.objects.all()

    for name in city_names:
        blsvalue = bls.loc[
            (bls["state"].str.contains(name.state)) & (bls["city"].str.contains(name.name)), "code"].tolist()
        statecode = abv.loc[(abv["state"].str.contains(name.state)), "code"].tolist()

        if (blsvalue != []) & (statecode != []):
            city = name.city
            series_ids = []
            with open('geo/bls_industry.csv') as file:
                for line in file:
                    series_ids.append(("SMU" + str(statecode[0]) + str(blsvalue[0]) + line.split(',')[0] + "01"))
            out = ""
            for series in series_ids:
                out += series + ','
            out = out[:-1]
            city.ind_id = out
            city.save()
        else:
            print("{}, {} is not in bls data :(".format(name.name, name.state))
