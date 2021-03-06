import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { ValidateCif } from '../../validadores/cif.validator';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})

export class CrearClienteComponent implements OnInit {

  @ViewChild('nombre', {static: false}) nombreRef: ElementRef;
  @ViewChild('cif', {static: false}) cifRef: ElementRef;
  formCliente: FormGroup;
  validacion = false;

  constructor(private clientesService: ClientesService,
              private router: Router,
              private mensajesService: MensajesService) { }

  ngOnInit() {
    this.formCliente = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      cif: new FormControl('',ValidateCif),
      calle: new FormControl(''),
      cp: new FormControl(''),
      localidad: new FormControl(''),
      email: new FormControl(''),
      formaPago: new FormControl(''),
    })
  }

  sendCliente() {
    let cliente: Cliente = new Cliente(
      this.formCliente.get('nombre').value,
      this.formCliente.get('cif').value,
      this.formCliente.get('calle').value,
      this.formCliente.get('cp').value,
      this.formCliente.get('localidad').value,
      this.formCliente.get('email').value,
      this.formCliente.get('formaPago').value
      )
    this.clientesService.postCliente(cliente)
                  .subscribe((res:any)=>{
                      this.mensajesService.setMensaje(res.mensaje, 'exitoTotal');
                      this.router.navigate(['/listado-clientes']);
                    },(err:any)=>{
                      if(err.error.error !== undefined) {
                        this.mensajesService.setMensaje('Ya existe un cliente con ese cif', 'error');
                      } else {
                        this.mensajesService.setMensaje('Error de conexión con los servidores, inténtelo más tarde', 'warning');
                      }
                    })
  }

  showValidacion() {
    this.nombreRef.nativeElement.classList.remove('inicio');
    this.cifRef.nativeElement.classList.remove('inicio');
    this.validacion = true;
  }

}
