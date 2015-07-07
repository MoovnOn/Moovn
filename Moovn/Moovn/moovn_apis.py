def apis(name):
    keys = {
        'zillowkey': "X1-ZWz1ety9lsdwcr_8fetn",
        'blskey': "2219214867914b3c92e99d8802d036d8"
    }

    for key in keys:
        if name == key:
            return keys[name]
        else:
            print("Not a key")
