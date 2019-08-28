import React from 'react';
import GameCard from './GameCard.js';
import '../../../CSS/ConnectFour.css';
import Button from 'react-bootstrap/Button';

class Game extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            winningCard: this.getWinningCard()
            ,gamesCount: 0 
            ,oldStreak: 0
            ,streak: 0
            ,streakDetail: ""
            ,winningCardEmoji: "Smiling.png"
            ,losingCardEmoji: "Unhappy.png"
            ,cardClicked: 0
            ,isGameOver: false
            ,
        }

        this.handleCardClick = this.handleCardClick.bind(this);

    }

    // get a random number from an array of [1, 2, 3] and make it the winning card number
    getWinningCard = () => {
        const cardArray = [1, 2, 3];
        const winningCard = Number(cardArray[Math.floor(Math.random()*cardArray.length)]);
        //console.log(winningCard);
        return winningCard;
    }
    
    // this is executed when a card is clicked
    handleCardClick(i){
        // update the count of games
        const newGamesCount = this.state.gamesCount + 1;
        let winningCard = this.state.winningCard;

        // update the number of games played and the card that was clicked
        this.setState({
            gamesCount: newGamesCount
            ,cardClicked: i
            ,
        });

        // declare winner or loser and give feedback about the streak they are on (and set emojis for winning and losing cards)
        const oldStreak = this.state.streak;
        let streak, streakDetail, adjustedStreak;
        let winningCardEmoji = "Smiling.png";
        let losingCardEmoji = "Unhappy.png";
        if( i === winningCard ){
            // won so add one to the streak
            streak = this.state.streak + 1;
            // adjust the streak to make sure we don't have a streak of zero
            adjustedStreak = ( streak === 0 || oldStreak < 1  ? 1 : streak );
            streakDetail = "WINNER: ";

            switch(adjustedStreak){
                case (0,1):
                    if(oldStreak < 0){
                        streakDetail += "Now you're back to winning ways. Keep it up!";
                        winningCardEmoji = "Slightly.Smiling.png";
                    }else{
                        streakDetail += "You're off to a good start!";
                        winningCardEmoji = "Smiling.png";
                    }
                break;

                case 2:
                    streakDetail += "Two in a row... you're heating up!";
                    winningCardEmoji = "Surprised.png";
                break;

                case 3:
                    streakDetail += "That's three... you're on fire!!";
                    winningCardEmoji = "Smiling.Teeth.png";
                break;

                default:
                    streakDetail += "YOU'RE ON FIRE!! THAT'S " + this.state.streak + " IN A ROW!!! WHAT A WINNING STREAK!!!!";
                    winningCardEmoji = "Happy.png";
                break;
            }
        }else{
            // lost so subtract one from the streak
            streak = this.state.streak - 1;
            // adjust the streak to make sure we don't have a streak of zero
            adjustedStreak = ( streak === 0 || oldStreak > 1  ? -1 : streak );

            streakDetail = "SORRY, YOU LOST: ";
            
            switch(adjustedStreak){
                case -1:
                    if(oldStreak > 1){ 
                        streakDetail += "Your winning streak is over. Try to start a new one!";
                        losingCardEmoji = "Confounded.png";
                    }else{
                        streakDetail += "Try again. Let's hope that's not the start of a losing streak!"
                        losingCardEmoji = "Unhappy.png";
                    }
                break;
    
                default:
                    streakDetail += "Uh-oh! You are on a losing streak!";
                    if( adjustedStreak === -2 ){
                        losingCardEmoji = "Anguished.png";
                    }else if ( adjustedStreak === -3 ) {
                        losingCardEmoji = "Angry.png";
                    }else{
                        losingCardEmoji = "Super.Angry.png";
                    }
                break;
            }
        }
        // update state
        this.setState({
            streak: adjustedStreak
            ,streakDetail: streakDetail
            ,oldStreak: oldStreak
            ,winningCardEmoji: winningCardEmoji
            ,losingCardEmoji: losingCardEmoji
            ,
        });

        // delay two seconds and flip the other two cards by changing isGameOver
        setTimeout(()=> 
            {
                this.setState({
                    isGameOver: true
                    ,
                })
            }
        , 2000);
        
    }
    
    resetGame(){
        this.setState({
            winningCard: this.getWinningCard()
            ,cardClicked: 0
            ,streakDetail: ""
            ,oldStreak: this.state.streak 
            ,isGameOver: false
            ,
        });
    }
    
    render(){
        // do we show the play again button? only when a card has been clicked
        let playAgainButton;
        if( this.state.cardClicked !== 0 ){
            playAgainButton = <><br /><Button onClick={() => this.resetGame()}>Play Again?</Button></>
        }
        return (
            <>
            <h3>Pick a Winner!</h3>
            <div className="col-9 row" style={{width: '99%', marginLeft: 'auto', marginRight:'auto'}}>
                <GameCard number="1" handleCardClick={this.handleCardClick} cardClicked={ this.state.cardClicked === 1 ? true : false } isWinningCard={ this.state.winningCard === 1 ? true : false } cardEmoji={ this.state.winningCard === 1 ? this.state.winningCardEmoji : this.state.losingCardEmoji } isGameOver={ this.state.isGameOver } />
                <GameCard number="2" handleCardClick={this.handleCardClick} cardClicked={ this.state.cardClicked === 2 ? true : false } isWinningCard={ this.state.winningCard === 2 ? true : false } cardEmoji={ this.state.winningCard === 2 ? this.state.winningCardEmoji : this.state.losingCardEmoji } isGameOver={this.state.isGameOver} />
                <GameCard number="3" handleCardClick={this.handleCardClick}  cardClicked={ this.state.cardClicked === 3 ? true : false } isWinningCard={ this.state.winningCard === 3 ? true : false } cardEmoji={ this.state.winningCard === 3 ? this.state.winningCardEmoji : this.state.losingCardEmoji } isGameOver={this.state.isGameOver} />
            </div>
            <div style={{width: '99%', marginLeft: 'auto', marginRight:'auto'}}>
                {this.state.streakDetail}<br />
                {playAgainButton}
            </div>
            </>
        );
    }
}
export default Game;