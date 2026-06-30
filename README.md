# TianaOpenData

Public Open Data for the Tiana Viva mobile app.

## Files

- `places.json`: public-interest places in Tiana.
- `routes.json`: walking routes using GeoJSON-style coordinates.
- `metadata.json`: dataset version and language support.

The mobile app consumes these files from GitHub Raw:

```text
https://raw.githubusercontent.com/seifreed/TianaOpenData/main
```

## Contract

- Coordinates are `[longitude, latitude]`.
- Text fields support Catalan, Spanish, and English: `ca`, `es`, `en`.
- Update `metadata.json.version` whenever public data changes.
- Keep data compatible with public reuse.

## License

The dataset is published under the Open Data Commons Open Database License
(ODbL). See `LICENSE`.
