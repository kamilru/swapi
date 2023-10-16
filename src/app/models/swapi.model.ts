export interface BaseApiDto {
  message: string;
  total_records: number;
  total_pages: number;
  previous: number;
  next: string;
}

export interface SingleApiResponseDto {
    message: string;
    result: {
        description: string,
        properties: PersonProprtiesResponseDto | StarshipProportiesResponseDto
    }
}

export interface PersonProprtiesResponseDto {
    birth_year: string;
    created: Date;
    edited: Date;
    eye_color: string;
    gender:string;
    hair_color: string;
    height:string;
    homeworld:string;
    mass:string;
    name: string;
    skin_color: string;
    url: string;
}

export interface StarshipProportiesResponseDto {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: [];
    starship_class: string;
    url: string;
}

export interface PersonCardDto {
    name: string;
    birthYear: string;
    height: string;
    eyeColor: string;
    mass: number;
}

export interface StarshipCardDto {
    model: string;
    starshipClass: string;
    manufacturer: string;
    cost: string;
    shopLength: string;
    crew: number;
}

export interface PeopleCardsDto {
    firstPersonCard: PersonCardDto;
    secondPersonCard: PersonCardDto;
}

export interface StarshipsCardsDto {
    firstStarshipCard: StarshipCardDto;
    secondStarshipCard: StarshipCardDto;
}