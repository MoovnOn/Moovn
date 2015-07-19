from geo.city_maker import make
from geo.ocup import add_ocup_codes
from geo.bls_loader import bls_load
from geo.college_loader import college_load
from geo.parity_loader import parity_load


def load():
    print("Making cities")
    make()
    print("Adding occupation codes")
    add_ocup_codes()
    print("Adding bls data")
    bls_load()
    print("Loading college data")
    college_load()
    print("Loading cost of living")
    parity_load()
