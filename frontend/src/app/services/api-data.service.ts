import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//I create a db.json file, a simulation for our Data Base.
//You can GET, POST, PUSH from/to this Data Base simulation,
//using the methodes declared in this service.
<<<<<<< HEAD
//Run the db with: `json-server --watch src/db.json --port 3000`,
//after installing the json-server.
=======
//Run the db with: `json-server --watch db.json --port 3000`,
//after installing the json-server.

>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
export class ApiDataService {
  private baseUrl = 'http://localhost:3000'; //link of backend api here.
  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  //The <T> makes the method flexible to work with different data types.
  // If you're posting data and expecting a response of type User, you'd call post<User>.
=======
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
  post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(url, data, { headers });
  }
<<<<<<< HEAD

  put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(url, data, { headers });
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url);
  }
=======
>>>>>>> 3ed76e4b46a5a8fc5f773acece4b2d1ddf8792e9
}
