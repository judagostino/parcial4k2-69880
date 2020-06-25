import { Component, OnInit } from '@angular/core';
import {ContratoService} from '../../services/contrato.service';
import {Contrato} from '../../models/contrato';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  Titulo = "Contratos"
  Items: Contrato[] = [];
  EstadoForm:string;
  FormReg: FormGroup;
  submitted = false;

  constructor(private contratosService: ContratoService,
  private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.submitted = false;
    this.getContrato();
    this.FormReg = this.formBuilder.group({
          ContratoId:['',[Validators.required]],
         ContratoDescripcion: ['',[Validators.required],[Validators.minLength(4)],[Validators.maxLength(50)]],
         ContratoImporte: ['',[Validators.required]]
    });
  }

  getContrato(){ 
    this.contratosService.get()
    .subscribe((res:Contrato[])=>{
      this.Items = res;
    });
  }

  Agregar(){
  window.scroll(0,0);
  this.EstadoForm = 'A';
  this.submitted = false;
}

Grabar(){
  this.submitted = true;
  if(this.FormReg.invalid){
      window.alert("Verifique los datos ingresados")
    return;
  }
  const itemCopy = { ...this.FormReg.value };
  itemCopy.IdEquipo = 0;
  this.contratosService.post(itemCopy).subscribe((res:any)=>{
    this.getContrato();
    this.Volver();
  
  });
}

Volver() {
    this.EstadoForm = "L";
  };

}