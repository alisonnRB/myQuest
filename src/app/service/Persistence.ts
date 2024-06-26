class Persistence {
    persiste(Tema: string = '', dificuldade: string = 'facil', quests: Object = {}): void {
        const data = {
            Tema: Tema,
            dificuldade: dificuldade,
            quests: quests
        }

        localStorage.setItem('data', JSON.stringify(data));
    }

    answerPersistece(index: number, done: boolean = false, right: boolean = false, answer: number = 0) {
        const data: any = this.getPersistence();
        if (data) {
            const keys = Object.keys(data.quests);
            data.quests[keys[index - 1]].zDone = done;
            data.quests[keys[index - 1]].zRight = right;
            data.quests[keys[index - 1]].zAnswer = answer;

            localStorage.setItem('data', JSON.stringify(data));
        }
    }


    getPersistence(): any {
        if (typeof localStorage !== 'undefined') {
          const data: any = localStorage.getItem('data');
          if (data !== null && data !== undefined) {
            return JSON.parse(data);
          }
        }
        return null;
      }
}

export default Persistence;