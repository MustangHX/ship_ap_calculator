#!/usr/bin/env python3
"""Remove duplicated rental ships"""

import os
import json
import subprocess as sp
from collections import OrderedDict

# list of all rental ships
# taken from http://maplesyrup.sweet.coocan.jp/wows/shipstats/res/mst_ships.txt
# nation     class       code
ship_list = [
["Germany", "Battleship", "PGSB910"], # Grosser Kurfuerst	
["Germany", "Cruiser", "PGSC910"], # Hindenburg        
["Japan", "AirCarrier", "PJSA917"], # Hakuryu           
["Japan", "Battleship", "PJSB918"], # Yamato            
["Japan", "Cruiser", "PJSC934"], # Zao               
["Japan", "Destroyer", "PJSD912"], # Shimakaze         
["Russia", "Cruiser", "PRSC910"], # Moskva         
["Russia", "Destroyer", "PRSD910"], # Grozovoi          
["United_kingdom", "Battleship", "PBSB910"], # Conqueror         
["USA", "AirCarrier", "PASA915"], # Midway            
["USA", "Battleship", "PASB917"], # Montana            
["USA", "Destroyer", "PASD913"] # Gearing
]

# make sure we start from the root directory of the repo and then go to ./data
rootdir = sp.Popen(['git', 'rev-parse', '--show-toplevel'],
            stdout=sp.PIPE).communicate()[0].rstrip().decode('utf-8')
if os.getcwd() != rootdir:
    os.chdir(rootdir)
os.chdir("data")
cwd = os.path.join(rootdir, "data")

# find all versions
dirs = next(os.walk('.'))[1]
# loop through all versions
for i in dirs:
    # get current path
    tmp = os.path.join(cwd, i)
    # loop through all rental ships
    for ship in ship_list:
        # construct the name of the json file contains this [] ship
        filename = ship[0] + "_" + ship[1] + ".json"
        # get its path
        filepath = os.path.join(tmp, ship[0], filename) 
        # load json
        try:
            with open(filepath) as jsonfile:
                data = json.load(jsonfile, object_pairs_hook=OrderedDict)
            # copy dict to avoid runtime error
            new_data = data
            # loop through all keys
            for key in data:
                # remove rental ship
                if ship[2] in key:
                    new_data.pop(key)
                    # since one nation only has one rental ship in one class
                    # I think it's safe to break after one match
                    break
            # dump modified json back
            with open(filepath, 'w') as output:
                json.dump(new_data, output, indent=4)
            # there is a whitespace after each comma in the original json file
            # add it back to minimize the differences between files
            sp.Popen(['sed', '-i', 's/,/, /g', filepath])
        except FileNotFoundError:
            print('File', filename, 'version', i , 'does not exist. Skip.')
