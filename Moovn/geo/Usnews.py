from bs4 import BeautifulSoup
import requests
import re
import csv

csv_file = open('university_ranking.csv', 'w')
writer = csv.writer(csv_file)

urls = ['http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+2', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+3', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+4', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+5', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+6', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+7', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+8', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+9', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+10', \
        'http://colleges.usnews.rankingsandreviews.com/best-colleges/rankings/national-universities/data/page+11']
records = []
ranks1 = []
names = []
locations = []
tuitions = []
for url in urls:
    r = requests.get(url)
    soup = BeautifulSoup(r.text)
    for rank in soup.findAll('span', attrs={'class': 'rankscore-bronze cluetip cluetip-stylized'}):
        ranks1.append(int(re.findall('\d+', rank.text)[0]))
    for college in soup.findAll('a', attrs={'class': 'school-name'}):
        names.append(college.text.replace("\xe2\x80\x94\xe2\x80\x8b", "--"))
    for location in soup.findAll('p', attrs={'class': 'location'}):
        locations.append(location.text)
    for tuition in soup.findAll('td', attrs={'class': 'column-odd table-column-odd  search_tuition_display  '}):
        tuitions.append(re.sub(',', "", tuition.text.strip()))

# print len(ranks), len(names), len(locations)
ranks2 = range(203, 281)
ranks = ranks1 + list(ranks2)
# print ranks
for i in range(len(ranks)):
    records.append(i + 1)
    records.append(ranks[i])
    records.append(names[i].encode('utf-8'))
    records.append(locations[i])
    records.append(tuitions[i])
    writer.writerow(records)
    records = []
