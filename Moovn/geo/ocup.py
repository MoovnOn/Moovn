from geo.models import City, Name
import pandas as pd


def add_ocup_codes():
    area = pd.read_csv('geo/oe_area.csv', converters={'state_code': lambda x: str(x), 'area_code': lambda x: str(x)})
    industrycode = "000000"

    city_names = Name.objects.all()

    for name in city_names:
        areacode = area.loc[
            (area['area_name'].str.contains(name.name)) & (
                area['state'].str.contains(name.state)), "area_code"].tolist()

        if areacode != []:
            city = name.city
            series_ids = []

            for num in areacode:
                series_ids.append(
                    ("OEUM" + num + industrycode)
                )
            out = ""
            for series in series_ids:
                out += series + ','
            out = out[:-1]
            city.ocp_id = out
            city.save()

