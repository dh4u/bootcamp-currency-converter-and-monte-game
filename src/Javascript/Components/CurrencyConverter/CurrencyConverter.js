import React from 'react';
import Dollars from './Dollars.js';
import Euros from './Euros.js';
import Pounds from './Pounds.js';
import Rands from './Rands.js';
import ValueToConvert from './ValueToConvert.js';
import Table from 'react-bootstrap/Table';

class CurrencyConverter extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            amount: null
            ,amountInUSDollars: null
            ,currency: null
            ,dollars: null // USD
            ,euros: null // EUR
            ,pounds: null // GBP
            ,rands: null // ZAR
            ,apiResult: null
            ,error: null
            ,isLoaded: false
            ,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoaded: true
            ,
        })
    }

    handleChange(event){
        const amount = document.getElementById("amountToConvert").value;
        const currency = document.getElementById("baseCurrency").value;

        console.log("amount: '" + amount + "'");
        console.log("currency: '" + currency + "'");

        // make sure that the amount is numeric and the currency has been selected
        if( !isNaN(amount) && currency  ){
            this.setState({
                amount: amount
                ,currency: currency
                ,
            })


            // the API won't let me do foreign currencies so get all of the exchange rates for USD first and then convert
            // make API call
            fetch(`http://www.apilayer.net/api/live?access_key=${process.env.REACT_APP_API_LAYER_API_KEY}&source=USD&currencies=USD,EUR,GBP,ZAR`)
                .then(res => res.json())
                .then(
                    (result) => {
                        let USDUSD = result.quotes.USDUSD;
                        let USDEUR = result.quotes.USDEUR;
                        let EURUSD = 1 / USDEUR;
                        let USDGBP = result.quotes.USDGBP;
                        let GBPUSD = 1 / USDGBP;
                        let USDZAR = result.quotes.USDZAR;
                        let ZARUSD = 1 / USDZAR;
                        let amountForCalculation = amount;

                        //if the currency is not dollars we need to take one of the values from EURUSD, GBPUSD, or ZARUSD as the rate and turn the amount into the proper value;
                        if( currency !== "USD" ){
                            let temp;
                            switch(currency){
                                case "EUR":
                                    temp = EURUSD * amount; 
                                break;

                                case "GBP":
                                    temp = GBPUSD * amount; 
                                break;

                                case "ZAR":
                                    temp = ZARUSD * amount; 
                                break;

                                default:
                                    temp = "";
                                break;
                            }
                            amountForCalculation = temp;
                            this.setState({
                                amountInUSDollars: temp
                                ,
                            })
                        }
                        
                        console.log(result);
                        // populate some values by multiplying the amount by each exchange rate 
                        let USD, EUR, GBP, ZAR;

                        USD = amountForCalculation * USDUSD;
                        USD = Math.floor(USD * 100) / 100;
                        USD = USD.toFixed(2);
                        EUR = amountForCalculation * USDEUR;
                        EUR = Math.floor(EUR * 100) / 100;
                        EUR = EUR.toFixed(2);
                        GBP = amountForCalculation * USDGBP;
                        GBP = Math.floor(GBP * 100) / 100;
                        GBP = GBP.toFixed(2);
                        ZAR = amountForCalculation * USDZAR;
                        ZAR = Math.floor(ZAR * 100) / 100;
                        ZAR = ZAR.toFixed(2);

                        // set the values to state
                        this.setState({
                            dollars: USD // USD
                            ,euros: EUR // EUR
                            ,pounds: GBP // GBP
                            ,rands: ZAR // ZAR
                            ,isLoaded: true
                            ,apiResult: result
                            ,
                        })
                    },
                    // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
                    (error) => {
                        //console.log("fetch error");
                        //console.log(error);
                        this.setState({
                            isLoaded: true
                            ,error: error.info
                            ,
                        });
                    }
                ).then(() => {
                    if( this.state.apiResult.error ){
                        //console.log("fetch error 404");
                        this.setState({
                            isLoaded: true
                            ,error: this.state.apiResult.error.info
                            ,
                        });
                    }
                })
        }
    }
    
    render(){
        let whatToDisplay;
        //console.log("RENDER PATH: " + thePath);
        // handle errors and if none handle loading state and if not that show the component
        const { error, isLoaded } = this.state;
        if ( error ) { 
            return <div>Error: {error}</div>;
        } else if ( !isLoaded ) { 
            return <div>Please enter a value above...</div>;
        } else { 
            console.log("this.state.amount: '" + this.state.amount + "'");
            console.log("this.state.currency: '" + this.state.currency + "'"); 
            // if they chose an amount and currency  
            if( this.state.amount && this.state.currency ){

                let USD, EUR, GBP, ZAR = "";
                // only display GBP if another currency was selected 
                if( this.state.currency !== "GBP" ){
                    GBP = (
                        <tr>
                            <td>British Pounds</td>
                            <td style={{textAlign: 'right'}}><Pounds value={this.state.pounds} /></td>
                        </tr>
                    )
                }
                // only display EUR if another currency was selected 
                if( this.state.currency !== "EUR" ){
                    EUR = (
                        <tr>
                            <td>Euros</td>
                            <td style={{textAlign: 'right'}}><Euros value={this.state.euros} /></td>
                        </tr>
                    )
                }
                // only display ZAR if another currency was selected 
                if( this.state.currency !== "ZAR" ){
                    ZAR =(
                        <tr>
                            <td>South African Rands</td>
                            <td style={{textAlign: 'right'}}><Rands value={this.state.rands} /></td>
                        </tr>
                    )
                }
                // only display USD if another currency was selected 
                if( this.state.currency !== "USD" ){
                    USD = (    
                        <tr>
                            <td>United States Dollars</td>
                            <td style={{textAlign: 'right'}}><Dollars value={this.state.dollars} /></td>
                        </tr>
                    )
                }
                // set up a string with the name of the currency
                let copyOfStateCurrency = this.state.currency;
                let currencyName = "";
                if(copyOfStateCurrency){
                    
                    //console.log("before the switch. currencyName is: '" + currencyName + "'" );
                    switch(copyOfStateCurrency){
                        case "GBP":
                            currencyName = "British Pounds";
                        break;
                        case "EUR":
                            currencyName = "Euros";
                        break;
                        case "ZAR":
                            currencyName = "South African Rands";
                        break;
                        case "USD":
                            currencyName = "US Dollars";
                        break;
                        
                        default:
                            currencyName = "";
    
                    };
                    //console.log("after the switch. currencyName is: '" + currencyName + "'" );
                }
                console.log("currencyName: '" + currencyName + "'");
                
                // output to display
                whatToDisplay = 
                <>
                    <h3>At the current exchange rate ${this.state.amount} {currencyName} is equivalent to:</h3>
                    <Table striped bordered hover style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GBP}
                            {EUR}
                            {ZAR}
                            {USD}
                        </tbody>
                    </Table>
                </>
            }else{ // missing this.state.amount or this.state.currency
                whatToDisplay = "Please enter an amount and currency above.";
            }
        }

        return(
            <><h1>Currency Converter</h1><br />
            <hr />
            <ValueToConvert handleChange={this.handleChange} /><br /><br />
            {whatToDisplay}
            </>
        )
    }
}
export default CurrencyConverter;