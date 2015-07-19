from geo.models import City, Name, College
import re
import pandas as pd


def college_load():
    colleges = pd.read_csv("geo/university_ranking.csv", header=None)
    new = colleges[3].apply(lambda x: pd.Series([i.strip() for i in x.split(',')]))
    colleges = pd.concat([colleges, new], axis=1)
    colleges.columns = ['delete', 'rank', 'college', 'delete', 'tuition', 'city', 'state']
    del colleges['delete']
    colleges.columns = ['0', '1', '2', '3', '4']
    city_names = Name.objects.all()
    colleges.to_csv("geo/colleges.csv", index=None, headers=None)
    with open("geo/colleges.csv") as file:
        for line in file:
            for name in city_names:
                if name.state == line.split(',')[4].strip('\n') and name.name == line.split(',')[3]:
                    money = re.sub("\$", "", line.split(',')[2])
                    newmoney = re.sub("in-state: ", "", money)
                    clean = re.sub(" out-of-state: ", ",", newmoney)
                    new = clean.split(',')
                    if len(new) <= 1:
                        if new[0] == '':
                            tuition = 0
                            in_state = None
                            out_state = None
                        else:
                            tuition = int(new[0])
                            in_state = None
                            out_state = None
                    else:
                        in_state = int(new[0])
                        out_state = int(new[1])
                        tuition = None

                    College.objects.create(city=name, tuition=tuition, in_state=in_state, out_state=out_state,
                                                     rank=line.split(',')[0], school=line.split(',')[1].strip('"'))

