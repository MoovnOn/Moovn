def apis(name):
    keys = {
        'zillowkey': "X1-ZWz1ety9lsdwcr_8fetn",
        'blskey': "2219214867914b3c92e99d8802d036d8",
        'mapbox': "pk.eyJ1IjoiZ3Jlc2hqcyIsImEiOiIzOTc0MjU3OWIzYjMxYzJlYjJmZTAyMDQ3ZGYzMTFlMSJ9.KLK7KanId5cdSASUOge0gg",
        'opensignal': "b6ca3f15d741e43e7764717cc778ebde",
        'greatschools': "q89oqzboaqxfplmpcg8enwxx",
        }


    for key in keys:
        if name == key:
            return keys[name]
        else:
            print("Not a key")
