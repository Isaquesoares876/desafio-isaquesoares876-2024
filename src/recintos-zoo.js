class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, ocupacao: 3, animais: ['MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, ocupacao: 0, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, ocupacao: 2, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, ocupacao: 0, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, ocupacao: 1, animais: ['LEAO'] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const dadosAnimal = this.animais[animal];
        const tamanhoNecessario = dadosAnimal.tamanho * quantidade;
        const recintosViaveis = [];

        this.recintos.forEach((recinto) => {
            if (!dadosAnimal.biomas.includes(recinto.bioma) && !(dadosAnimal.biomas.includes('savana') && recinto.bioma === 'savana e rio')) {
                return;
            }

            if (dadosAnimal.carnivoro && recinto.animais.length > 0 && !recinto.animais.every(a => a === animal)) {
                return;
            }

            let espacoOcupado = recinto.ocupacao + tamanhoNecessario;
            if (recinto.animais.length > 0 && !recinto.animais.every(a => a === animal)) {
                espacoOcupado += 1;
            }

            if (espacoOcupado <= recinto.tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado} total: ${recinto.tamanhoTotal})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
