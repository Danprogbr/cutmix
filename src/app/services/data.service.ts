import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
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
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    });

    console.log(`chamada`);

    return this.httpService.post(
      `https://cutmixrastreio.netlify.app/.netlify/functions/consulta-detalhes-nf?numeroPedido=${pedido}&cpfCnpj=${cpfCnpj}`,
      {},
      { headers: headers }
    ).pipe(
      map((res: any) => res.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
