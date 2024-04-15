import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';
import Persistence from '../service/Persistence';
import { ScrollTopService } from '../service/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
  ],
  providers: [
    Persistence,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  private apiKey = environment.API_KEY;
  Tema: string = '';
  dificuldade: string = 'facil';
  quests: Object = {};
  load: string = 'none';
  @Output() ChangeLoad = new EventEmitter<string>();
  @Output() ChangeQuests = new EventEmitter<Object>();
  trys: number = 0;

  constructor(private persistense: Persistence, private scrollTopService: ScrollTopService) { }

  async Submit() {
    if (this.load == 'in') {
      return
    }

    this.load = 'in';
    this.ChangeLoad.emit(this.load);

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      "contents": [
        {
          "parts": [
            { "text": `Escreva 8 perguntas de múltipla escolha sobre o tema ${this.Tema} com nível de dificuldade ${this.dificuldade} tendo sempre 4 opções cada pergunta e dizendo a resposta, mas estruture como um JSON. Exemplo de saída: 'pergunta1': {'questao': 'pergunta', 'opcao1': 'opcao', 'opcao2': 'opcao', 'opcao3': 'opcao','opcao4': 'opcao', 'resposta': 'opcao'}` }
          ]
        }
      ]
    };

    try {
      const resposta: AxiosResponse = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, body, { headers });
      this.JsonTransforme(resposta.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  }

  private JsonTransforme(text: string): void {
    try {

      let strFiltred = text.replace(/json/, '');
      const RespostInJson = JSON.parse(strFiltred);
      this.quests = RespostInJson;
      this.trys = 0;
      this.load = 'none';

      this.ChangeLoad.emit(this.load);
      this.ChangeQuests.emit(this.quests);

      this.persistense.persiste(this.Tema, this.dificuldade, this.quests);

      console.log(text);

    } catch (e) {

      if (this.trys < 2) {
        this.trys = this.trys + 1;
        this.load = 'fail';
        this.Submit();
      } else {
        this.load = 'erro';
        this.ChangeLoad.emit(this.load);
      }

    }

  }

  ngOnInit() {
    const data: any = this.persistense.getPersistence();
    if (data) {
      this.Tema = data.Tema;
      this.dificuldade = data.dificuldade;
      this.quests = data.quests;
    }
  }

  toTop() {
    this.scrollTopService.scrollToTop();
  }
}
