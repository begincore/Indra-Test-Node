
const PLANET_MAPPING  = {
    "count": "cantidad",
    "next": "siguiente",
    "previous": "anterior",
    "results": "resultados",
    "name": "nombre",
    "rotation_period": "periodo_rotacion",
    "orbital_period": "periodo_orbital",
    "diameter": "diametro",
    "climate": "clima",
    "gravity": "gravedad",
    "terrain": "terreno",
    "surface_water": "agua_superficial",
    "population": "poblacion",
    "residents": "residentes",
    "films": "peliculas",
    "created": "creado",
    "edited": "editado",
    "url": "enlace"
};

const PEOPLE_MAPPING = {
    "count": "cantidad",
    "next": "siguiente",
    "previous": "anterior",
    "results": "resultados",
    "name": "nombre",
    "height": "altura",
    "mass": "peso",
    "hair_color": "color_cabello",
    "skin_color": "color_piel",
    "eye_color": "color_ojos",
    "birth_year": "año_nacimiento",
    "gender": "género",
    "homeworld": "planeta_natal",
    "films": "películas",
    "species": "especies",
    "vehicles": "vehículos",
    "starships": "naves_estelares",
    "created": "creado",
    "edited": "editado",
    "url": "enlace"
};

// Función para mapear campos de un objeto JSON de inglés a español
function fieldMapper(json, itemMapping) {
    const jsonEspanol = {};
    Object.keys(json).forEach(key => {
        if (itemMapping[key]) {
            if (key == 'results'){
                const resultJson = [];

                json[key].forEach((item) => {
                    const itemJson = fieldMapper(item,itemMapping);
                    resultJson.push(itemJson);
                });

                jsonEspanol[itemMapping[key]] = resultJson
            }
            else
                jsonEspanol[itemMapping[key]] = json[key];
        } else {
            jsonEspanol[key] = json[key];
        }
    });
    return jsonEspanol;
}

module.exports = {fieldMapper, PLANET_MAPPING, PEOPLE_MAPPING}

// Mapear el JSON con campos en inglés a español
// const planet = fieldMapper(jsonEnIngles, PLANET_MAPPING);

// // Mostrar el JSON con campos en español
// console.log(planet);

// // Mapear el JSON con campos en inglés a español
// const people = mapearCampos(personajeEnIngles, peopleMapping);

// // Mostrar el JSON con campos en español
// console.log(people);