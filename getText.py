import json
import glob
files=glob.glob("JSON/*.json")
for file in files:
    fileName=file.split("/")[1].split(".")[0]
    # print(fileName)
    with open(file) as x:    jdata=json.load(x)

    for target in jdata['targets']:
        name=target['Name']
        for idx, text in enumerate(target["postText"]):
            print('say "%s" -o %s_%s_%s.aiff'%(text, fileName, name, idx)).encode('utf-8').strip()
            # print("Bananas")
# Opening JSON file
# f = open('JSON/aaa.json',)
  
# # returns JSON object as 
# # a dictionary
# data = json.load(f)
# print(data)
# # Iterating through the json
# # list
