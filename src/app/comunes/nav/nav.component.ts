import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild('nav', {static: false}) navRef: ElementRef;
  texto: string;
  tipoMensaje: string;
  subscripMensaje: Subscription;

  constructor(private mensajesService: MensajesService) { }

  ngOnInit() {
    this.subscripMensaje = this.mensajesService.isMensajeIn
                                    .subscribe((data:any)=>{
                                        this.texto = data.texto;
                                        this.tipoMensaje = data.tipoMensaje;
                                      },(err:any)=>{
                                        console.log(err);
                                      })
  }

  toggleMenu() {
    this.navRef.nativeElement.classList.toggle('open');
  }

}
