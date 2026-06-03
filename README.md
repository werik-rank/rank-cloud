# Rank Cloud — Home

Site institucional do Rank Cloud (Grupo Rank). Construído sobre o design system RankMyApp.

## Estrutura

```
index.html            página principal
assets/
  styles.css          estilos da home (importa colors_and_type.css → fonts/fonts.css)
  colors_and_type.css tokens de cor e tipografia do design system
  mockups.css         estilos dos mockups/telas
  app.js              interações da página
  fonts/fonts.css     carregamento das fontes (Roboto via Google Fonts)
  marks/arrow-pattern.svg
  rmads-phones.png
```

## Rodar localmente

É um site estático. Basta servir a pasta com qualquer servidor HTTP, por exemplo:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar (GitHub Pages)

Settings → Pages → Source: `main` / root. A `index.html` na raiz é servida automaticamente.

## Dependências externas (via CDN)

- Roboto e Material Symbols — Google Fonts
- Lucide icons — unpkg
- Vídeo de cases — YouTube embed
