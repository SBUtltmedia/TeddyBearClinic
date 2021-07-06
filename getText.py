import json
import glob
files=glob.glob("JSON/*.json")
for file in files:
    print(file)
    with open(file) as x:    jdata=json.loads(x)

    print(jdata)