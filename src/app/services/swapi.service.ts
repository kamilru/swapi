import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap } from 'rxjs';
import { BaseApiDto, PeopleCardsDto, PersonCardDto, PersonProprtiesResponseDto, SingleApiResponseDto, StarshipCardDto, StarshipProportiesResponseDto, StarshipsCardsDto } from '../models/swapi.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  static normalizePerson(person: PersonProprtiesResponseDto): PersonCardDto {
    return {
      name: person.name,
      birthYear: person.birth_year,
      height: person.height,
      eyeColor: person.eye_color,
      mass: Number(person.mass)
    }
  }

  static normalizeStarship(starship: StarshipProportiesResponseDto): StarshipCardDto {
    return {
      model: starship.model,
      starshipClass: starship.starship_class,
      manufacturer: starship.manufacturer,
      cost: starship.cost_in_credits,
      shopLength: starship.length,
      crew: Number(starship.crew)
    }
  }

  normalizePersonCards(firstPerson: SingleApiResponseDto, secondPerson: SingleApiResponseDto): PeopleCardsDto {
    return {
      firstPersonCard: SwapiService.normalizePerson(firstPerson.result.properties as PersonProprtiesResponseDto),
      secondPersonCard: SwapiService.normalizePerson(secondPerson.result.properties as PersonProprtiesResponseDto)
    }
  }

  normalizeStarshipsCards(firstStarship: SingleApiResponseDto, secondStarship: SingleApiResponseDto): StarshipsCardsDto {
    return {
      firstStarshipCard: SwapiService.normalizeStarship(firstStarship?.result?.properties as StarshipProportiesResponseDto),
      secondStarshipCard: SwapiService.normalizeStarship(secondStarship?.result?.properties as StarshipProportiesResponseDto),
    }
  }

  getObjectsCount(): Observable<{people: number; starships: number;}>{
    const peopleUri = `${environment.api}people/`;
    const starshipsUri = `${environment.api}starships/`;
    let peopleCount: number;

    return this.http.get<BaseApiDto>(peopleUri).pipe(
      switchMap(people => {
        peopleCount = people.total_records;
        return this.http.get<BaseApiDto>(starshipsUri)
      }),
      map(value => {
        return {
          people: peopleCount,
          starships: value.total_records
        }
      })
    )
  }

  getPersonCard(id: number): Observable<SingleApiResponseDto> {
    const uri = `${environment.api}people/${id}/`
    return this.http.get<SingleApiResponseDto>(uri);
  }

  getStarshipCard(id: number): Observable<any> {
    const uri = `${environment.api}starships/${id}/`
    return this.http.get(uri);
  }

  getPeopleCards(firstCardId: number, secondCardId: number): Observable<PeopleCardsDto> {
    let firstPersonCard: any; 

    return this.getPersonCard(firstCardId).pipe(
      switchMap(person => {
        firstPersonCard = person;

        return this.getPersonCard(secondCardId)
      }),
      map(secondPerson => this.normalizePersonCards(firstPersonCard, secondPerson))
    )
  }

  getStarshipsCards(firstCardId: number, secondCardId: number): Observable<StarshipsCardsDto> {
    let firstStarshipCard: any; 

    return this.getStarshipCard(firstCardId).pipe(
      switchMap(starship => {
        firstStarshipCard = starship;

        return this.getStarshipCard(secondCardId)
      }),
      map(secondStarship => this.normalizeStarshipsCards(firstStarshipCard, secondStarship))
    )
  }
}
