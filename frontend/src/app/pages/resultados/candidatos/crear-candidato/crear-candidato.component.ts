import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidatos } from 'src/app/modelos/candidatos.model';
import { CandidatosService } from 'src/app/servicios/candidatos.service';

@Component({
  selector: 'app-crear-candidato',
  templateUrl: './crear-candidato.component.html',
  styleUrls: ['./crear-candidato.component.scss']
})
export class CrearCandidatoComponent implements OnInit {
  modoCreacion: boolean = true;
  id_candidato: string = '';
  intentoEnvio: boolean = false;
  elCandidato: Candidatos = {
    cedula: "",
    apellido:"",
    nombre:"",
    numero_resolucion:""
  }

  constructor(private miServicioCandidatos: CandidatosService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params["id_candidato"]) {
      this.modoCreacion = false;
      this.id_candidato = this.rutaActiva.snapshot.params["id_candidato"];
      this.getCandidato(this.id_candidato);
      } else {
      this.modoCreacion = true;
      }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.elCandidato.apellido == "" ||
      this.elCandidato.nombre == "" ||
      this.elCandidato.cedula =="" ||
      this.elCandidato.numero_resolucion ) {
      return false;
    } else {
      return true;
    }
  }
  getCandidato(id: string) {
    this.miServicioCandidatos.getCandidato(id).subscribe(
      data => { this.elCandidato = data }
    );
  }

  agregrarCandidato(): void {
    if (this.validarDatosCompletos()){
      this.intentoEnvio=true;
      this.miServicioCandidatos.crear(this.elCandidato).
      subscribe(
        data => {
          alert("Candidato creado"),
          this.router.navigateByUrl("candidatosListar");
      },
        error => {alert("No se pudo crear los datos")}
      );
    }
  }

  editarCandidato():void{
    if(this.validarDatosCompletos()){
      let id_de_el_candidato = JSON.stringify(this.elCandidato._id).replace("\"", "");
      id_de_el_candidato = id_de_el_candidato.replace("\"", "");
      this.miServicioCandidatos.editar(id_de_el_candidato, this.elCandidato).
      subscribe(data => {
        alert("Candidato modificado"),
        this.router.navigateByUrl("candidatosListar");
      },
      error => {alert("No se pudo crear los datos")});
    }
  }

  cancelar():void{
    this.router.navigateByUrl("candidatosListar");
  }
    
}
