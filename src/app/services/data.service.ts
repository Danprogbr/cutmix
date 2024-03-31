import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    });

    return this.httpService.post(
      `https://cutmixrastreio.netlify.app/.netlify/functions/consulta-detalhes-nf?numeroPedido=${pedido}&cpfCnpj=${cpfCnpj}`,
      {},
      { headers: headers }
    ).pipe(
      tap(() => console.log(`VV`)),
      map((res: any) => res.data)
    );
  }
}
