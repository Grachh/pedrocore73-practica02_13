import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlCliente = environment.urlCliente;

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(this.urlCliente)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

  postCliente(cliente: Cliente) {
    return this.http.post(this.urlCliente, cliente)
                  .pipe(
                    map((res:any)=>{
                      return res;
                    })
                  )
  }

}
