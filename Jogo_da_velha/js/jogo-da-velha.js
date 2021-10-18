//variavel para ativar/desativar bot
var bot = 1;
var comeca = "player";

//variavel para controlar dificuldade
var dificuldade = "Media";

// TIC TAC TOE
const tic_tac_toe = {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                turn_index: 0,
                change(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    container_element: null,
    gameover: false,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    
    init(container) {
        this.container_element = container;
    },

    //função para que o bot inicie o jogo
    BotComeca(){
        if(bot == 1){
            if(comeca == "player"){
                this.bot(Math.round(Math.random() * (8 - 0) + 0));
                comeca = "bot";
            }else{
                alert("O bot já iniciou esta partida !")
            }
        }else{
            alert("Ative o bot para que ele possa começar !");
        }
    },

    make_play(position) {
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }

        //chama a jogada do bot
        if(bot == 1){

            //inteligencia do bot para defesas
            if(dificuldade == "Media" || dificuldade == "Dificil"){
            if(this.board[1] == currentSymbol && this.board[2] == currentSymbol && this.board[0] == "" 
            || this.board[3] == currentSymbol && this.board[6] == currentSymbol && this.board[0] == "" 
            || this.board[4] == currentSymbol && this.board[8] == currentSymbol && this.board[0] == ""
            ){
                this.bot(0);
            }

            else if(this.board[0] == currentSymbol && this.board[2] == currentSymbol && this.board[1] == "" 
            || this.board[7] == currentSymbol && this.board[4] == currentSymbol && this.board[1] == "" 
            ){
                this.bot(1);
            }

            else if(this.board[0] == currentSymbol && this.board[1] == currentSymbol && this.board[2] == "" 
            || this.board[5] == currentSymbol && this.board[8] == currentSymbol && this.board[2] == "" 
            || this.board[6] == currentSymbol && this.board[4] == currentSymbol && this.board[2] == ""
            ){
                this.bot(2);
            }
            
            else if(this.board[0] == currentSymbol && this.board[6] == currentSymbol && this.board[3] == "" 
            || this.board[4] == currentSymbol && this.board[5] == currentSymbol && this.board[3] == "" 
            ){
                this.bot(3);
            }
            
            else if(this.board[0] == currentSymbol && this.board[8] == currentSymbol && this.board[4] == "" 
            || this.board[1] == currentSymbol && this.board[7] == currentSymbol && this.board[4] == "" 
            || this.board[2] == currentSymbol && this.board[6] == currentSymbol && this.board[4] == "" 
            || this.board[3] == currentSymbol && this.board[5] == currentSymbol && this.board[4] == "" 
            ){
                this.bot(4);
            }
            
            else if(this.board[2] == currentSymbol && this.board[8] == currentSymbol && this.board[5] == "" 
            || this.board[3] == currentSymbol && this.board[4] == currentSymbol && this.board[5] == ""
            ){
                this.bot(5);
            }
            
            else if(this.board[0] == currentSymbol && this.board[3] == currentSymbol && this.board[6] == "" 
            || this.board[2] == currentSymbol && this.board[4] == currentSymbol && this.board[6] == "" 
            || this.board[8] == currentSymbol && this.board[7] == currentSymbol && this.board[6] == "" 
            ){
                this.bot(6);
            }
            
            else if(this.board[1] == currentSymbol && this.board[4] == currentSymbol && this.board[7] == "" 
            || this.board[6] == currentSymbol && this.board[8] == currentSymbol && this.board[7] == ""
            ){
                this.bot(7);
            }
            
            else if(this.board[0] == currentSymbol && this.board[4] == currentSymbol && this.board[8] == "" 
            || this.board[2] == currentSymbol && this.board[5] == currentSymbol && this.board[8] == "" 
            || this.board[6] == currentSymbol && this.board[7] == currentSymbol && this.board[8] == "" 
            ){
                this.bot(8);
            }
            
            else{
                this.bot(Math.round(Math.random() * (8 - 0) + 0));
            }
        }else{
            this.bot(Math.round(Math.random() * (8 - 0) + 0));
        }

        }
        
        return true;
    },

    bot(position) {
        
            //essa linha checa se ja foi marcado o espaço
            if (this.gameover || this.board[position] !== '') {
                this.bot(Math.round(Math.random() * (8 - 0) + 0));
                return false;
            };
        
        const currentSymbol = this.symbols.options[this.symbols.turn_index];

            //inteligencia do bot para ataques
        if(dificuldade == "Dificil"){
            if(this.board[1] == currentSymbol && this.board[2] == currentSymbol && this.board[0] == "" 
            || this.board[3] == currentSymbol && this.board[6] == currentSymbol && this.board[0] == "" 
            || this.board[4] == currentSymbol && this.board[8] == currentSymbol && this.board[0] == ""
            ){
                position = 0;
            }

            else if(this.board[0] == currentSymbol && this.board[2] == currentSymbol && this.board[1] == "" 
            || this.board[7] == currentSymbol && this.board[4] == currentSymbol && this.board[1] == "" 
            ){
                position = 1;
            }

            else if(this.board[0] == currentSymbol && this.board[1] == currentSymbol && this.board[2] == "" 
            || this.board[5] == currentSymbol && this.board[8] == currentSymbol && this.board[2] == "" 
            || this.board[6] == currentSymbol && this.board[4] == currentSymbol && this.board[2] == ""
            ){
                position = 2;
            }
            
            else if(this.board[0] == currentSymbol && this.board[6] == currentSymbol && this.board[3] == "" 
            || this.board[4] == currentSymbol && this.board[5] == currentSymbol && this.board[3] == "" 
            ){
                position = 3;
            }
            
            else if(this.board[0] == currentSymbol && this.board[8] == currentSymbol && this.board[4] == "" 
            || this.board[1] == currentSymbol && this.board[7] == currentSymbol && this.board[4] == "" 
            || this.board[2] == currentSymbol && this.board[6] == currentSymbol && this.board[4] == "" 
            || this.board[3] == currentSymbol && this.board[5] == currentSymbol && this.board[4] == "" 
            ){
                position = 4;
            }
            
            else if(this.board[2] == currentSymbol && this.board[8] == currentSymbol && this.board[5] == "" 
            || this.board[3] == currentSymbol && this.board[4] == currentSymbol && this.board[5] == ""
            ){
                position = 5;
            }
            
            else if(this.board[0] == currentSymbol && this.board[3] == currentSymbol && this.board[6] == "" 
            || this.board[2] == currentSymbol && this.board[4] == currentSymbol && this.board[6] == "" 
            || this.board[8] == currentSymbol && this.board[7] == currentSymbol && this.board[6] == "" 
            ){
                position = 6;
            }
            
            else if(this.board[1] == currentSymbol && this.board[4] == currentSymbol && this.board[7] == "" 
            || this.board[6] == currentSymbol && this.board[8] == currentSymbol && this.board[7] == ""
            ){
                position = 7;
            }
            
            else if(this.board[0] == currentSymbol && this.board[4] == currentSymbol && this.board[8] == "" 
            || this.board[2] == currentSymbol && this.board[5] == currentSymbol && this.board[8] == "" 
            || this.board[6] == currentSymbol && this.board[7] == currentSymbol && this.board[8] == "" 
            ){
                position = 8;
            }
        }

        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence_bot(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }

        return true;
    },

    //estilização da vitoria do jogador
    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
        alert(`A vitória é do ${this.symbols.options[this.symbols.turn_index]} !`);
      },
    
    //estilização da vitoria do bot
    stylize_winner_sequence_bot(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('botwinner');
        });
        alert('Você Perdeu!');
    },

    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('este jogo foi reiniciado!')
        } else if (confirm('Tem certeza que deseja iniciar um novo jogo?')) {
            this.start();
            console.log('este jogo foi reiniciado!')
        }
        comeca = "player";
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
    
};

//liga e desliga o bot
function BotaoBot(){
    if(bot == 1){
        bot = 0;
        document.querySelector('button#btnbot').innerText = "Ativar Bot";
    }else{
        bot = 1;
        document.querySelector('button#btnbot').innerText = "Desativar Bot";
    }
}

//Altera a dificuldade do bot
function Dificuldade(){
    if(bot == 1){
        if(dificuldade === "Facil"){
            dificuldade = "Media"
            document.querySelector('button#btndif').innerText = "Nivel do Bot: Médio";
        }
        else if(dificuldade === "Media"){
            dificuldade = "Dificil"
            document.querySelector('button#btndif').innerText = "Nivel do Bot: Dificil";
        }
        else if(dificuldade === "Dificil"){
            dificuldade = "Facil"
            document.querySelector('button#btndif').innerText = "Nivel do Bot: Fácil";
        }
    }else{
        alert("Ative o bot para controlar sua dificuldade !");
    }
}
