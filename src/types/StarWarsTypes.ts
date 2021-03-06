export interface CharacterType {
  name: string,
  birth_year: string,
  eye_color: string,
  gender: string,
  hair_color: string,
  height: string,
  mass: string,
  skin_color: string,
  homeworld: string,
  films: Array<string>,
  species: Array<string>,
  starships: Array<string>,
  vehicles: Array<string>,
  url: string,
}

export interface Planet {
  name: string,
  diameter: string,
  rotation_period: string,
  orbital_period: string,
  gravity: string,
  population: string,
  climate: string,
  terrain: string,
  surface_water: string,
  residents: Array<string>,
  films: Array<string>,
  url: string,
}
