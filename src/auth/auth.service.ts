import { Injectable } from "@nestjs/common";
@Injectable({})
export class AuthService {
    register(){
        return "Hung Ngo"
    }
    login() {
        return "Ngo Hung"
    }
}