# ePANNDA Wrapper

Simple wrapper API to shorthand calls to iDigBio, PBDB, and BHL to be consumed by ePANNDA Matching App.

### Example API Calls
- PBDB Taxonomic Reference (https://paleobiodb.org/data1.2/taxa/refs.json?base_name=bembidium&textresult)


### Approach
Initially tried to perform real time matching, I found that PBDB biblio references needed to be matched with a third
party API (Biodiversity Heritage Library) in order to get access to the full OCR text of a journal article to successfully match
against an iDigbio Specimen Record.

The number of API Calls this generates on a small result set ( 800 records ) has caused performance issues in local script, but also BHL's API

Further dividing this up into smaller schedulable tasks would be a better approach:



1. small service that searches PBDB Biblio References by Scientific Name ( Order? ) and searches BHL or similar service for journal names from PBDB result set. This data set would go into a MongoDB
2. data service that pulls these results out and makes buffered API calls to BHL to match the Article title to specific OCR page and push this OCR text back into MongoDB
3. data service to search iDigBio for the same Scientific Name ( Order? ) as well as state/province or locality name to refine the data set and match 
specimen fields against the PBDB and OCR data in the temp MongoDB.


### Data Issues
- PBDB Data Object returned is inconsistent, have seen a few occurences where the title field was missing from the JSON object.
- naming inconsistencies: Journal/ Article Titles, Author Names, Format of Issue, Volume, Pages numbers
  - Sometimes issues, volume, page numbers were present in Article Title but not the issue or volume fields
  - these can be overcome in the wrapper API, but add additional overhead. I know of the Global Names Parser, and it sounds like there is 
differing opinions / attitudes about doing something similar for Author Names. What about Journal / Article Titles?
