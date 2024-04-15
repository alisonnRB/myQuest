import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios, { AxiosResponse } from 'axios';
import Persistence from '../service/Persistence';
import { ScrollTopService } from '../service/scroll.service';
import { environment } from '../../environments/environment.prod';

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
  private apiKey: string | undefined = environment.API_KEY;
  Tema: string = '';
  dificuldade: string = 'facil';
  quests: Object = {};
  load: string = 'none';
  @Output() ChangeLoad = new EventEmitter<string>();
  @Output() ChangeQuests = new EventEmitter<Object>();

  constructor(private persistense: Persistence, private scrollTopService: ScrollTopService) { }

  async Submit() {
    if (this.load == 'in') {
      return;
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
            { "text": `Escreva 8 perguntas de múltipla escolha sobre o tema ${this.Tema} com nível de dificuldade ${this.dificuldade} tendo sempre 4 opções cada pergunta e dizendo a resposta, mas estruture como um JSON sem absolutamente mais nada. Exemplos de saída: 'pergunta1': {'questao': 'qual dos seguintes é uma ave','opcao1': 'gato', 'opcao2': 'cachorro', 'opcao3': 'pinguin', 'opcao4': 'guaxinin', 'resposta': 'pinguin'}` }
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

      const RespostInJson = JSON.parse(text);
      console.log(text);
      this.quests = RespostInJson;
      this.load = 'none';

      this.ChangeLoad.emit(this.load);
      this.ChangeQuests.emit(this.quests);

      this.persistense.persiste(this.Tema, this.dificuldade, this.quests);

    } catch (e) {

      console.log(e)
      console.log(text)
      this.load = 'erro';
      this.ChangeLoad.emit(this.load);


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
