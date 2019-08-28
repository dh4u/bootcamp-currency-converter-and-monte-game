import React from 'react';
//import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Header from './Header.js';
import Selector from './Selector.js';
import CurrencyConverter from './CurrencyConverter/CurrencyConverter.js';
import Game from './Game/Game.js';

class Main extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            path: ""
            ,isNewPathDifferent: false
            ,
        };
    
        this.handleClick = this.handleClick.bind(this);
        this.selectRef = React.createRef();
        //this.props.isNewPathDifferent = false;
        //this.NODE_ENV = this.NODE_ENV.bind(this);
    }

    onComponentMount(){
        
    }

    handleClick(event){
        event.preventDefault();
        //console.log("handleClick");
        //console.log(this.state.path);
        //console.log(event.target.innerHTML);
        const newPath = (event.target.innerHTML).replace(" ", "");
        //console.log(newPath);
        const currentPath = this.state.path;
        //console.log("??: '" + this.state.path + "' '" + newPath + "'");

        // set state
        this.setState({ path: newPath
            ,isNewPathDifferent: (currentPath === newPath ? false : true) }, () => {
            //console.log('newPath', this.state.path);
            //console.log('isNewPathDifferent', this.state.isNewPathDifferent);

            if ( this.state.isNewPathDifferent ) {
                console.log("should change");
                console.log("different: '" + currentPath + "' '" + newPath + "'");
                //this.props.isNewPathDifferent = true;

                //window.location.replace("/" + newPath);
            }else{
                //this.props.isNewPathDifferent = false;
            } 
          }); 
    }
    
    render(){
        const thePath = this.state.path;
        //const thePath = "Win!";
        let whichComponentToDisplay;
        //console.log("RENDER PATH: " + thePath);
        if( thePath === "Currencyconverter" ){
            whichComponentToDisplay = <CurrencyConverter />
            //console.log("whichComponentToDisplay is CurrencyConverter");
        }else if ( thePath === "Win!" ){
            //<Redirect to="/Game" />
            whichComponentToDisplay = <Game />
            console.log("whichComponentToDisplay is Win!");
        }
        
        // how would I do this with BrowserRouter? The conditional kind of negates the need
        return(
            <>
                <Header /><br />
                <Selector onClick={this.handleClick} selected={thePath} /><br />
                {whichComponentToDisplay}
            </>
        )


        /* if( thePath ){
            if( thePath === "Currencyconverter" ){
                whichComponentToDisplay = <CurrencyConverter />
            }else{
                whichComponentToDisplay = <Game />
            }
        }else{
            whichComponentToDisplay = null;
        }
        
        // how would I do this with BrowserRouter? The conditional kind of negates the need
        return(
            <>
            <BrowserRouter>
                <main role="main">
                <Header /><br />
                <Selector onClick={this.handleClick} selected={this.state.path} /><br />
                {whichComponentToDisplay}
                </main>
            </BrowserRouter>
            </>
        ) */
    }

    /*  */
}
export default Main;