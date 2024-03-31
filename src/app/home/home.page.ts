import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {LoadingController} from "@ionic/angular";
import {Data} from "../services/nf.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form!: FormGroup; // Using definite assignment assertion
  isLoading = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpfCnpj: [
        '',
        [Validators.required, Validators.maxLength(2)],
      ],
      numeroPedido: ['', [Validators.required, Validators.maxLength(2)]],
    });
  }

  async pesquisar() {
    this.data = undefined;
    this.isLoading = true;
    this.dataService.obterNf(`241`, ``).subscribe((res) => {
        this.data = res;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.error(error);
      },
      () => {
        this.isLoading = false;
      })
  }



}
