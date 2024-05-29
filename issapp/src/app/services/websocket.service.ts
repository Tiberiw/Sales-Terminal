import { Injectable } from "@angular/core";
import { Client, Message } from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { Subject } from "rxjs";
import { Product } from "../models/product";
import { AuthenticationService } from "../login/auth.service";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private client: Client;
    private productUpdates: Subject<Product> = new Subject<Product>();

    constructor(private authService: AuthenticationService) {
        const token = this.authService.token;
        this.client = new Client({
            webSocketFactory: () => new SockJS(`http://localhost:8080/ws?token=${token}`),
            reconnectDelay: 5000,
            debug: (str) => console.log(str)
        })

        this.client.onConnect = (frame) => {
            this.client.subscribe("/topic/products", (message: Message) => {
                this.productUpdates.next(JSON.parse(message.body) as Product);
            });
        };

        this.client.activate();
    }

    getProductUpdates() {
        return this.productUpdates.asObservable();
    }
}
