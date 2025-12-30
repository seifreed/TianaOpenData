# Tiana OpenData

Datos abiertos del municipio de Tiana (Barcelona) para la aplicación móvil Tiana Viva.

## 📊 Dataset Actual

- **Versión**: 1.0.0
- **Última actualización**: 2024-12-30
- **Lugares**: 24
- **Eventos**: 0
- **Idiomas**: Catalán, Español, Inglés, Francés

## 📁 Estructura de Archivos

- `tiana-data.json` - Datos principales (lugares, eventos, categorías)
- `version.json` - Control de versiones y changelog

## 🏪 Lugares Incluidos

### Naturaleza y Parques (6)
- Parc de Can Cabot
- Parc del Montnegre
- Parc Infantil de Can Ratés
- Parc de Can Riera
- Camí de Can Bosch

### Comercios y Tiendas (5)
- Pastisseria Sant Jordi
- Mercat Municipal de Tiana
- Estanc Tiana
- Forn de Pa Tiana
- Supermercat Tiana

### Cultura y Patrimonio (4)
- Biblioteca Municipal de Tiana
- Església de Sant Cebrià
- Centre Cívic de Tiana
- Casal d'Avis de Tiana

### Restaurantes (3)
- Can Font Restaurant
- Bar Ca l'Andreu
- El Racó de Tiana

### Servicios (3)
- Ajuntament de Tiana
- Oficina de Correus

### Educación (2)
- Escola Bellulla
- Institut de Tiana

### Deportes (2)
- Poliesportiu Municipal
- Club Tennis Tiana

### Salud (1)
- Farmàcia Central de Tiana

## 🌐 Formato de Datos

Cada lugar incluye:
- **Identificación**: ID único, tipo, categoría
- **Traducciones**: Nombre y descripción en 4 idiomas
- **Ubicación**: Dirección completa y coordenadas GPS
- **Contacto**: Teléfono, email, web, redes sociales
- **Horarios**: Horario regular por día de la semana
- **Características**: WiFi, parking, accesibilidad, etc.
- **Etiquetas**: Tags para búsqueda y filtrado

## 📱 Uso en la App

La aplicación móvil Tiana Viva consume estos datos automáticamente desde:
```
https://raw.githubusercontent.com/seifreed/TianaOpenData/main/tiana-data.json
```

## 🔄 Actualizaciones

Los datos se actualizan regularmente mediante:
- Generación automatizada con LLMs (OpenAI, Grok)
- Validación de calidad
- Control de versiones semántico
- Detección de duplicados

## 📝 Licencia

GNU General Public License v3.0 (GPLv3)

Copyright (C) 2025 Marc Rivero López

## 🤝 Contribuir

Para sugerir cambios o añadir nuevos lugares:
1. Crea un issue en el repositorio
2. Proporciona toda la información necesaria
3. Los cambios serán revisados e integrados

## 📧 Contacto

- **Web**: https://www.tiana.cat
- **Email**: info@tiana.cat
- **Teléfono**: +34 93 395 41 01

---

**Generado con Tiana Viva Data Generator** 🏛️
