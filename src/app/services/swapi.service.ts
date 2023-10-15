import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, switchMap } from 'rxjs';
import { BaseApiResponse } from '../models/swapi.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getObjectsCount(): Observable<{people: number; starships: number;}>{
    const peopleUri = `${environment.api}people/`;
    const starshipsUri = `${environment.api}starships/`;
    let peopleCount: number;

    return this.http.get<BaseApiResponse>(peopleUri).pipe(
      switchMap(people => {
        peopleCount = people.total_records;
        return this.http.get<BaseApiResponse>(starshipsUri)
      }),
      map(value => {
        return {
          people: peopleCount,
          starships: value.total_records
        }
      })
    )
  }

  getPersonCard(id: number): Observable<any> {
    const uri = `${environment.api}people/${id}/`
    return this.http.get(uri);
  }

  getPeopleCards(firstCardId: number, secondCardId: number): Observable<any> {
    let firstPersonCard: any; 

    return this.getPersonCard(firstCardId).pipe(
      switchMap(person => {
        firstPersonCard = person;

        return this.getPersonCard(secondCardId)
      }),
      map(secondPerson => {
        return {
          firstPersonCard: firstPersonCard?.result?.properties,
          secondPersonCard: secondPerson?.result?.properties
        }
      })
    )
  }
}
