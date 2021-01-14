const game = {
  players: { // criando os players 
    activePlayer: 0, // controla o jogador da vez
    switchPlayer: function(){
      this.activePlayer = (this.activePlayer === 0 ? 1 : 0); // alterna o player 
    },
    options: ['O','X']
  },
  divContainer: null, // vai fazer a ponte do JS com o HTML 
  gameover: false, // controla o fim do jogo
  board: ['','','','','','','','',''], // criando os 9 espaços onde as div's serão geradas 
  win: [ // todas as combinaçõesque configuram uma vitória de acordo com o index do array 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ],
  scoreX: 0,
  scoreO: 0,
 
  init: function(container) {
      this.divContainer = container; // armazdena a div onde tudo irá acontecer 
  },

  playing: function(position) {
      if (this.gameover) return false; // se chegar como true, nada do resto da função será executado 
      
      if (this.board[position] === ''){ // se onde o player clicou estiver vazio, os comando vão ser executados 
          
          this.board[position] = this.players.options[this.players.activePlayer]; // adiciona os dados do player onde ele clicou
          this.draw();

          let canWin = this.check( this.players.options[this.players.activePlayer] ); // passa as coordenadas do player para verificar se ele ganhou
          
          if (canWin >= 0){ // caso ele tenha ganhado,a função vai retornar 0,1 ou 2, por isso '>= 0'
              this.finish(); 
              
              if(this.players.options[this.players.activePlayer] === 'X'){ // verifica se o ganhador foi o X
                this.scoreX += 1 // adiciona um ponto
                document.getElementById('Xpoints').innerHTML = this.scoreX // coloca a pontuação no elemento HTML
              } else if(this.players.options[this.players.activePlayer] === 'O'){ // verifica se o ganhador foi o O
                this.scoreO += 1
                document.getElementById('Opoints').innerHTML = this.scoreO
              }
          } else {
              this.players.switchPlayer(); // caso o player não ganhe com a jogada, a vez é passada para o seu oponente 
          }
      }
  },

  restart: function(){
    let restartGame = '';
    this.board = ['','','','','','','','',''];
    for ( i in this.board ) {
      restartGame += '<div onclick="game.playing(' + i + ')">'+ this.board[i] +'</div>';
    };
    this.divContainer.innerHTML = restartGame;
    this.start();
  },

  finish: function() { // só é chamada quando um player ganha
      this.gameover = true; // aqui vai fazer com que o jogo pare do jeito que estiver, proibindo mais jogadas serem executadas 
  },

  start: function() {
      this.draw();
      this.gameover = false;       
  },
  
  check: function(simbol) { // função que vai verificar se o player ganhou, os parâmetros são as coordenadas do player 
    for ( i in this.win ) { // fazemos um for dentro do array que contém todas as possíveis combinações que configuram uma vitória 
        if (this.board[ this.win[i][0] ] == simbol  && this.board[ this.win[i][1] ] == simbol && this.board[ this.win[i][2] ] == simbol) {
            return i; // caso as coordenadas do player bata com alguma combinação,será retornado 0,1 ou 2
        }
    };
    return -1; // caso as coordenadas não configurem uma vitória, será retornado -1, o que faz com que a troca de player aconteça 
  },

  draw: function() {
      let content = '';
      for ( i in this.board ) {// percorre o vetor que criamos para armazenar as Div´s
          content += '<div onclick="game.playing(' + i + ')">' + this.board[i] + '</div>';// chama as funções a partir do click do jogador
      };
      this.divContainer.innerHTML = content;
  }
}; 