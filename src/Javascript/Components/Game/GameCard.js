import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ReactCardFlip from 'react-card-flip'; // https://github.com/AaronCCWong/react-card-flip

class GameCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          isFlipped: false
        };
        this.handleCardClick = this.props.handleCardClick.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.backOfCardImage = require( "../../../Images/back.of.card.jpg" );
    }

    flipCard(e){
       e.preventDefault();
       this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    } 

    render(){
        
        let onClick = null;
        // make sure to pass the card number back up
        if( ! this.props.isAnyCardUp ){
            onClick = () => {this.handleCardClick(Number(this.props.number)); this.flipCard(window.event);};
        }
        
        const cardEmoji = require( "../../../Images/" + this.props.cardEmoji );
        
        /*
        if the game is over all of them should be showing winner / loser
        or, if this card is the one that was clicked need to use the current state otherwise use false
        */
        const isFlipped = this.props.isGameOver ? true : this.props.cardClicked ? true: false;

        // cards are either winners or losers and have emojis associated with each based on the duration of the winning / losing streak.
        if( this.props.isWinningCard ){
            return(  
                <ReactCardFlip isFlipped={ isFlipped }>
                    <div key="front">
                        <Image src={this.backOfCardImage} style={{ width: '200px', height: '300px', margin: '5px' }} onClick={onClick} />
                    </div>
    
                    <div key="back">
                        <Card style={{ width: '200px', height: '300px', margin: '5px' }} onClick={onClick}>
                            <Card.Body>
                                <Card.Text>
                                    <br /><br /><h4>Winner!</h4><img src={ cardEmoji} style={{width: '25%'}} alt={this.props.cardEmoji} /><br /><br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </ReactCardFlip>
            )
        }else{
            return(
                <ReactCardFlip isFlipped={ isFlipped }>
                    <div key="front">
                        <Image src={this.backOfCardImage} style={{ width: '200px', height: '300px', margin: '5px' }} onClick={onClick} />
                    </div>
    
                    <div key="back">
                        <Card style={{ width: '200px', height: '300px', margin: '5px' }} onClick={onClick}>
                            <Card.Body>
                                <Card.Text>
                                    <br /><br /><h4>Not a Winner</h4><img src={ cardEmoji} style={{width: '25%'}} alt={this.props.cardEmoji} /><br /><br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </ReactCardFlip>
            )
        }
    }
}

export default GameCard;