import json

from scholarly import scholarly

# Just here as an example, but not really used in practice

# pip install scholarly

# will paginate to the next page by default
pubs = scholarly.search_pubs("This research was made possible, in part, using the Data Science Research Infrastructure (DSRI) hosted at Maastricht University")

valid_pubs = []
limit = 20

for i, pub in enumerate(pubs):
    if i >= limit:
        break
    if 'data science research infrastructure' in pub['bib']['abstract'].lower():
        if 'dsri' in pub['bib']['abstract'].lower():
            if 'maastricht university' in pub['bib']['abstract'].lower():
                valid_pubs.append({
                    'title': pub['bib']['title'],
                    'authors': ', '.join(pub['bib']['author']),
                    'pub_year': pub['bib']['pub_year'],
                    'venue': pub['bib']['venue'],
                    'abstract': pub['bib']['abstract'],
                    'url': pub['pub_url'],
                })

print(json.dumps(valid_pubs, indent=2))
