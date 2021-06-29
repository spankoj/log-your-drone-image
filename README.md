# Log Your Drone Image (LYDI)

## General description

The project is intended to serve educational purposes. Web technologies being exposed to during UpLeveled bootcamp should be used for creating a full stack web application that is deployed to production. The topic choosen also could be useful for hobby purposes and as a 'pet project' going forward.

## Aim

The web application "Log Your Drone Image" (LYDI) would like to make possible for users to log their activities with UAV-s especially drones making benefit of image attributes like geospatial data (GPS coordinates, etc).
Web page description: 'Web application to collect drone images and its meta-data'

## Scope - technologies

- [ ] Next.js - full stack web app
- [ ] PostgreSQL database
- [ ] Expo native as strech

### Dev tools

- [ ] ESLint
- [ ] React leaflet
- [ ] Typescript for leaflet

## Approach

- [ ] feature minimal - serves only as simple logger for data
- [ ] limited data tables - not too many data and relationships between them
- [ ] basic search functionality
- [ ] native app as froned too

## Design

- [ ] shapes: minimalist - clean more like square
- [ ] geometrical
- [ ] font modern, sans-serif like roboto or computer style
- [ ] color options
  - [ ] black & white
  - [ ] black & green -> old computer
  - [ ] white & green -> like Leaflet

## Research topics

- [ ] Image’s Geo meta-data -> GeoJSON, npm exif reader for geo-metadata
- [ ] Store geospatial data -> Postgres? OpenSource: GeoServer -> own scheema : PostreGIS
- [ ] Map API’s?
- [ ] JS libraries: Leaflet -> ESRI plugins
- [ ] ESRI software stack
- [ ] developers.arcgis.com
- [ ] Research ESRI tools
- [ ] VertiGIS application -> apps.geocortex.com

## External resources

- [ ] ?
- [ ] arc gis online ->img can be used
- [ ] Patrick
- [ ] Gábor
- [ ] Hannes
- [ ] Tamás - Dima

## Miscellinous

- [ ] geo server using drona data
- [ ] npm exif reader for geo-metadata

## Resources

- [ ] mapty app?
- [ ] sample pictures
- [ ] favicon
- [x] logo
  - [x] simple - geometric https://studio.tailorbrands.com/business/77072797/wizard/editor?backTo=logos&currentId=5508446236&logosStepId=476303315&origBrandVersionId=5508399159&originalIndex=7
- [ ] swipetool for before-after pictures

## Project plan

- [ ] User stories

1. As a user, I want to upload my drone image(s) to an application to be able to store them in one place
2. As a user, I want to categorise my drone image(s) based on the type of landscape (vegatation, buildings, ruins)
3. As a user, I want to see my drone image(s) or pin(s) on a map to see where I was taking pictures already
4. As a user, I want to be able to search by category or “place” to see my previously uploaded drone pics
5. As a user, I want to see other users images (certain data on map?)

- [ ] Features

1. Upload image

- get meta-data from image

2. Input fields and button for name and category.
3. place map in a div on a page

- show pin on map (based on gps data)
- show img preview on map by clicking on the pin
- show list of img imstances

4. input field /text + scroll down menu/ for search place and category
5. fetch all images from data base and show pin(location) on map from all users uploaded images

- [ ] Wire frame

- [ ] Data tables (DRAW SQL)
- [ ] Pages
- [ ] Input fields

# TODO's

1. Upload image

- get meta-data from image
  https://www.exif.org/
  npm: exif, exif-js

3. place map in a div on a page

- show pin on map (based on gps data)

- show img preview on map by clicking on the pin
  https://leafletjs.com/reference-1.7.1.html#imageoverlay

- show list of img imstances

- hosting images servecies that get the image and returns a link. the link will be in the data basa (service will get it back) - memem scarper example

- complete the data base schema
