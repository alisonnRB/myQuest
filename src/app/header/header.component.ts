import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  private apiKey = environment.API_KEY;
  Tema: string = '';
  dificuldade: string = 'facil';
  quests: Object = {};
  trys: number = 0;

  async Submit() {

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      "contents": [
        {
          "parts": [
            { "text": `Escreva 5 perguntas de múltipla escolha sobre o tema ${this.Tema} com nível de dificuldade ${this.dificuldade} tendo 4 opções cada pergunta, mas estruture como um JSON. Exemplo de saída: 'pergunta1': {'questao': 'pergunta', 'opcao1': 'opcao', 'resposta': 'opcao correta'}` }
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

  private JsonTransforme(text: string) {
    try {

      let strFiltred = text.replace(/json/, '');
      const RespostInJson = JSON.parse(strFiltred);
      this.quests = RespostInJson;
      this.trys = 0;

      console.log('certo');

    } catch (e) {

      if (this.trys < 2) {
        this.trys = this.trys + 1;
        this.Submit();
      } else {
        console.log('erro');
      }

    }

  }
  
}
