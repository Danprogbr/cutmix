import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../services/data.service";
import { LoadingController, ToastController } from "@ionic/angular";
import { Data } from "../services/nf.interface";
import { catchError } from 'rxjs/operators'; // Corrigido o import

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form!: FormGroup; // Using definite assignment assertion
  isLoading = false;
  data: Data | undefined; // Definindo o tipo para a variável data
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpfCnpj: [
        '',
        [Validators.required], // Removido Validators.maxLength(2)
      ],
      numeroPedido: ['', [Validators.required]], // Removido Validators.maxLength(2)
    });
  }

  async pesquisar() {
    this.data = undefined;
    this.isLoading = true;
    this.dataService.obterNf(this.form.get('numeroPedido')?.value, this.form.get('cpfCnpj')?.value)
      .subscribe(
        (res) => {
          console.log(`retorno`, res);
          this.data = res;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
          this.showToast();
        }
      );
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar NF, tente novamente mais tarde.',
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position of the toast message
      color: 'danger'
    });
    toast.present();
  }
}
