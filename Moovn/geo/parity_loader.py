from geo.models import Name, City


def parity_load():
    names = Name.objects.all()
    with open("geo/price_parity.csv") as file:
        for line in file:
            for name in names:
                if name.name in line.split(',')[0].strip('"') and name.state in line.split(',')[1].strip('"').strip():
                    name.city.price_parity = float(line.split(',')[2].strip('\n'))
                    name.city.save()
