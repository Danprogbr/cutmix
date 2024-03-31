import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {NotaFiscal, Data} from "../services/nf.interface"

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(
    private httpService: HttpClient,
  ) {
  }


  public obterNf(pedido: string, cpfCnpj: string): Observable<Data> {
    console.log(`sss`)
    return this.httpService.post(
      `https://cutmixrastreio.netlify.app/.netlify/functions/consulta-detalhes-nf?numeroPedido=${pedido}&cpfCnpj=${cpfCnpj}`,
      {}
    ).pipe(
      tap(() => console.log(`VV`)),
      map((res: any) => res.data)
    )
  }
}
