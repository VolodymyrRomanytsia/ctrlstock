import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User, Message} from '../interfaces'
import {Observable} from 'rxjs'
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<User[]> {
    return this.http.get<User[]>('/api/user')
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`)
  }

  getCheck(id: string): Observable<Boolean> {
    return this.http.get<Boolean>(`/api/user/check/${id}`)
  }

  postCheck(id: string, payment): Observable<User> {
    return this.http.post<User>(`/api/user/${id}`, payment)
  }

  update(id: string, user: User): Observable<Message> {
    return this.http.patch<Message>(`/api/user/${id}`, user)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/user/${id}`)
  }

  pay(id: string, form){
    return this.http.post(`/api/user/${id}`, form)
  }
}
