import json
import geojson

with open('/Users/johnnyfung/GitHub/toronto-housing-market-map-visualization/data/test/CityofToronto_neighborhood_data.geojson') as f:
    data = json.load(f)

replace=['text1', 'text2']
testdict={"key1" : 1, "key2" : 2}

#print id value only
for prop in data["features"]:
    print (prop["properties"]["_id"])

#print key, value pairs inside properties dictionary
for prop1 in data["features"]:
    for attrib, val in (prop1["properties"]).items():
        print (attrib,val)

i=0
#change and print id value
for prop2 in data["features"]:
    (prop2["properties"]["_id"])=replace[i]
    i+=1
    print (prop2["properties"]["_id"])

#add key,value pair to dictionary
#diction = {0:'this', 1:'is', 2:'a', 3:'test'}  
#add = [{"Price": 0, "Price1": 1, "Price2": 2,}]
