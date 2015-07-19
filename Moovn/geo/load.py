from geo.city_maker import make
from geo.nb_create import create
from geo.ocup import add_ocup_codes
from geo.oe_ocup_loader import load
from geo.bls_loader import bls_load
from geo.college_loader import college_load
from geo.parity_loader import parity_load
from geo.oe_ocup_loader import oe_ocup_load


def load():
    print("Making cities")
    make()
    print("Making neighborhoods")
    create()
    print("load occupations")
    oe_ocup_load()
    print("Adding occupation codes")
    add_ocup_codes()
    print("loading oe_ocup, whatever that means")
    load()
    print("Adding bls data")
    bls_load()
    print("Loading college data")
    college_load()
    print("Loading cost of living")
    parity_load()
