import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../servicios/facturas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  facturas: any;
  primerDiaMesCurso: any;
  ultimoDiaMesCurso: any;
  primerDiaUltimoMes: any;
  ultimoDiaUltimoMes: any;
  primerDiaPenultimoMes: any;
  ultimoDiaPenultimoMes: any;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.loadFacturas();
    this.setFechas();
  }

  loadFacturas(){
    this.facturasService.getFacturas()
                .subscribe((res:any)=>{
                    this.facturas = res.facturas;
                    
                  },(err:any)=>{
                    console.log(err);
                  })
  }

  setFechas(){
    let mesCurso = new Date().getMonth();
    let ultimoMes = mesCurso - 1;
    let penultimoMes = mesCurso -2;
    let anyoMesCurso = new Date().getFullYear();
    let anyoUltimoMes = anyoMesCurso;
    let anyoPenultimoMes = anyoMesCurso;
    if(mesCurso === 1) {
      penultimoMes += 12;
      anyoPenultimoMes -= 1;
    } else if (mesCurso === 0) {
      ultimoMes += 12;
      penultimoMes += 12;
      anyoUltimoMes -= 1;
      anyoPenultimoMes -= 1;
    }
    this.primerDiaMesCurso = this.getDias(mesCurso, anyoMesCurso)[0];
    this.ultimoDiaMesCurso = this.getDias(mesCurso, anyoMesCurso)[1];
    this.primerDiaUltimoMes = this.getDias(ultimoMes, anyoUltimoMes)[0];
    this.ultimoDiaUltimoMes = this.getDias(ultimoMes, anyoUltimoMes)[1];
    this.primerDiaPenultimoMes = this.getDias(penultimoMes, anyoPenultimoMes)[0];
    this.ultimoDiaPenultimoMes = this.getDias(penultimoMes, anyoPenultimoMes)[1];
    console.log(this.primerDiaMesCurso, 
                this.ultimoDiaMesCurso,
                this.primerDiaUltimoMes,
                this.ultimoDiaUltimoMes,
                this.primerDiaPenultimoMes,
                this.ultimoDiaPenultimoMes);
  }
  
  getDias(mes, anyo){
    let dias = [];
    let dia = new Date(anyo, mes, 1);
    while(dia.getMonth() === mes) {
      dias.push(new Date(dia));
      dia.setDate(dia.getDate() + 1);
    }
    return [dias[0],dias[dias.length - 1]];
  }

}
