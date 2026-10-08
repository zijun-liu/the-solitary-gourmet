# The Solitary Gourmet · Restaurant Guide

An interactive restaurant guide for **The Solitary Gourmet** (Japanese: **孤独のグルメ**; Chinese: **孤独的美食家**).

**[Open the restaurant guide](https://zijun-liu.github.io/the-solitary-gourmet/)**

## Features

- Browse seasons 1–11: 132 episodes and 197 restaurant appearance records.
- Switch between English and Chinese using the buttons in the upper-right corner.
- Jump between the map and restaurant list; use readable mobile entries with full sorting controls and larger touch targets.
- Explore restaurant locations on an interactive map, including season and search filters.
- Search by restaurant name, address, cuisine, region, or episode theme.
- Open restaurant names in Google Maps for details and directions; use the adjacent Tabelog links for listings and reviews.
- Access both services from restaurant rows, map popups, detail views, and CSV exports.
- Save favorites in your own browser and export the filtered list to CSV.
- View the address, cuisine, and coordinate sources for each restaurant.

The interface, cuisine labels, episode dishes, map controls, and CSV exports are available in English and Chinese. Restaurant names and addresses stay in their original form for lookup. Search accepts either language, and switching keeps your filters, favorites, current page, and map view.

The website remembers your language choice in your browser. Share a link with `?lang=en` or `?lang=zh` to choose the initial language; otherwise it uses a saved choice or the visitor’s browser language.

## Coverage and sources

Data was compiled on **October 4, 2026**. The guide covers the 11 regular seasons; specials, spin-offs, and the film are not included. There are 196 mapped records, including 5 approximate locations; one mobile food truck has no confirmed fixed location. A restaurant may appear in more than one record.

Restaurant details retain source links, address conflicts, and reported closure or relocation notes. The data has not been checked against every restaurant’s current operating status; consult Google Maps or the restaurant before visiting.

Main references:

- [まつこの部屋](https://matutika.com/blog/kodokunogurume)
- [窝日本](https://wow-japan.com/food-lonely-gourmet-tokyo/)
- [放送店舗一覧](https://2tsumuws.com/lonely-gourmet/)
- [MapShelf](https://mapshelf.app/maps/kodokunogourmet)
- [TV Tokyo: Season 11 shops](https://www.tv-tokyo.co.jp/kodokunogurume11/shop/)

Map rendering uses OpenFreeMap, with OpenMapTiles and OpenStreetMap data. Restaurant links open Google Maps and Tabelog. Tabelog links use source listings or listings matched by restaurant name and address; entries without a confirmed listing show “Search Tabelog” and open a name search. The CSV includes the link type.

## Hosting and updates

This is a static web app. GitHub Pages publishes the `docs/` folder from the `main` branch. Changes pushed to that folder are automatically published.

For a local preview:

```sh
python3 -m http.server 8000 --directory docs
```

Open http://localhost:8000/. Map tiles and external links require an internet connection. Favorites are stored locally in each visitor’s browser and are not shared between users or devices.

## Third-party libraries

The bundled Leaflet, Leaflet.markercluster, MapLibre GL JS, and MapLibre–Leaflet adapter license notices are included in `docs/vendor/`. The restaurant references and map data retain their respective source attributions.
