// this component is the form for the amount and currency type to convert
import React from 'react';
import Form from 'react-bootstrap/Form';

class ValueToConvert extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.props.handleChange;
    }

    render(){

        return(
            <>
                <Form>
                    <Form.Row style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Form.Group md="5" controlId="amountToConvert" style={{float: 'left'}}>
                            <Form.Label>Amount $</Form.Label>
                            <Form.Control type="number" onBlur={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="baseCurrency" style={{float: 'right'}}>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control as="select" onChange={this.handleChange}>
                                <option value="">Convert from...</option>
                                <option value="GBP">British Pound</option>
                                <option value="EUR">Euro</option>
                                <option value="ZAR">South African Rand</option>
                                <option value="USD">United States Dollar</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </>
        )
    }
    
}
export default ValueToConvert;