import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationRequest } from "./authentication.request";
import { AuthenticationResponse } from "./authentication.response";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from "../models/role";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    private apiServerUrl = "http://localhost:8080/auth";

    constructor(private http: HttpClient) {}

    public login(loginObj: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/authenticate`, loginObj);
    }

    public isLoggedIn(): boolean {
        return this.token !== null;
    }

    public isTokenValid(): boolean {
        const token = this.token;
        if (!token) {
            return false;
        }    
        // Decode token
        const jwtHelper = new JwtHelperService();
        const isTokenExpired = jwtHelper.isTokenExpired(token);
        if (isTokenExpired) {
            localStorage.clear();
            return false;
        }

        return true;
    }

    public logout() {
        localStorage.removeItem('token');
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }

    get token(): string {
        return localStorage.getItem('token') as string;
    }

    public getDecodedToken(): any {
        const token = this.token;
        if (!token) {
            return null;
        }
        return JSON.parse(atob(token.split('.')[1]));
    }

    public getRole(): Role {
        const decodedToken = this.getDecodedToken();
        if (!decodedToken) {
            return Role.NONE;
        }
        return decodedToken.role;
    }

    


}