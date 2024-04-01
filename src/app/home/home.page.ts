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
  linkRastreio = '';

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
          this.data = res;
          this.linkRastreio = this.gerarLinkRastreio(res);
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

  gerarLinkRastreio(data: Data): string {
    let retorno = ``;
    if (data.transporte.transportador.nome === "TEX COURIER S.A") {
       retorno = `https://tracking.totalexpress.com.br/poupup_track.php?reid=26040&pedido=${data.transporte.volumes[0].id}&nfiscal=${data.numero}`;
    } else if (data.transporte.transportador.nome === "TNT MERCURIO CARGAS E ENCOMENDAS EXPRESSAS LTDA.") {
       retorno = `https://radar.tntbrasil.com.br/radar/public/localizacaoSimplificada.do`;
    } else if (data.transporte.transportador.nome === "REUNIDAS TRANSPA RODOVIARIA DE CARGAS S.A") {
       retorno = `https://ssw.inf.br/ssw_resultSSW.asp?cnpj=44655274000194&NR=${data.numero}`;
    } else if (data.transporte.transportador.nome === "JOSE OSVALDO DE OLIVEIRA EIRELI") {
       retorno = `https://ssw.inf.br/ssw_resultSSW.asp?cnpj=44655274000194&NR=${data.numero}`;
    } else if (data.transporte.transportador.nome === "VITÓRIA PROVEDORA LOGÍSTICA LTDA") {
       retorno = `https://ssw.inf.br/ssw_resultSSW.asp?cnpj=44655274000194&NR=${data.numero}`;
    } else if (data.transporte.transportador.nome === "MIRA OTM TRANSPORTES LTDA") {
       retorno = `https://web.mira.com.br/webmira/portalmira/(S(3kwmu0jtsl4ty53tl0nuw5rq))/default.aspx`;
    } else if (data.transporte.transportador.nome === "PATRUS TRANSPORTES LTDA") {
      `https://portal.patrus.com.br/tracking/cli/e/Tracking/Info.aspx/cli/e/Tracking/Info.aspx?CGC=44.655.274%2f0001-94&NF=${data.numero}&TIPO=R`;
    } else if (data.transporte.transportador.nome === "VELOG EXPRESS LTDA") {
       retorno = `https://www.postexexpress.com.br/rastreamento`;
    } else if (data.transporte.transportador.nome === "DISK & TENHA LTDA") {
       retorno = `https://disktenha.com.br/`;
    } else if (data.transporte.transportador.nome === "TECMAR TRANSPORTES LTDA.") {
       retorno = `https://tecmartransportes.com.br`;
    } else if (data.transporte.transportador.nome === "POSTAL MOV BR MARKETPLACE E LOGISTICA LTDA") {
       retorno = `https://postalmovbr.com`;
    }
    return retorno
  }
}
