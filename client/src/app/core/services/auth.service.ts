import { Injectable } from "@angular/core";
import { User, Message } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
}) 
export class AuthServise {

    constructor(private http: HttpClient) {}

    private token = null
    private id = null

    register(user: User): Observable<User> {
        return this.http.post<User>('api/auth/register', user)

    }

    login(user: User): Observable<{token: string, id: string}> {
        return this.http.post<{token: string, id: string}>('api/auth/login', user)
            .pipe(
                tap(
                    ({token, id}) => {
                        localStorage.setItem('auth-token', token)
                        localStorage.setItem('userId', id)
                        this.setToken(token)
                        this.setId(id)
                    }
                )

            )
    }

    setToken(token: string) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }
    

    setId(id: string) {
        this.id = id
    }

    getId(): string {
        return this.id
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.setId(null)
        this.setToken(null)
        localStorage.clear()
    }

    forgot(user: User): Observable<Message> {
        return this.http.post<Message>('api/auth/forgot', user)

    }

    postReset(token: string, user: User): Observable<Message> {
        return this.http.post<Message>(`api/auth/new-password/${token}`, user)

    }

}