# 🎨 Sketched

Parse design tokens from .sketch files

```
npm install --save-dev sketched
```

## Requirements

- File should have page named "Tokens"
- Page "Tokens" should have 3 artboards:
    - Palette
    - Typography
    - Spacers
- Palette layer:
    - Name will be used as name of color
    - Fill style as value of color
- Typography layer:
    - Name will be used as name of typography style
    - Text settings will be exported
- Spacers layer:
    - Name will be used as name of spacer
    - Width and height should be equals
    - Width will be used as size of spacer

![Sketch example](https://api.monosnap.com/file/download?id=Rkv4jm6OCVucjjop5izpSAr6LqiUcl)

## Run

```
skecthed --file ./example/design.sketch
```

**Output**

```json
{ "palette":
   [ { "name": "Red", "color": "rgba(1, 0, 0.1768002717391308, 1)" },
     { "name": "Blue", "color": "rgba(0, 0.5889945652173916, 1, 1)" },
     { "name": "Green", "color": "rgba(0.1693274456521741, 1, 0, 1)" } ],
  "typography":
   [ { "name": "Header 1",
       "font": "OpenSans-Bold",
       "size": 44,
       "lineHeight": 60 },
     { "name": "Header 2",
       "font": "OpenSans-Bold",
       "size": 32,
       "lineHeight": 43 },
     { "name": "Header 3",
       "font": "OpenSans-Semibold",
       "size": 24,
       "lineHeight": 33 },
     { "name": "Paragraph 1",
       "font": "OpenSans",
       "size": 16,
       "lineHeight": 22 } ],
  "spacers":
   [ { "name": "xs", "size": 8 },
     { "name": "s", "size": 16 },
     { "name": "m", "size": 24 },
     { "name": "l", "size": 32 },
     { "name": "xl", "size": 48 },
     { "name": "xxl", "size": 64 } ] }
```
