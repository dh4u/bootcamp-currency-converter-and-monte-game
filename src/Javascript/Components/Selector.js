import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Selector extends React.Component{
    constructor(props){
        super(props);
        
        this.onClick = this.props.onClick.bind(this);
        //console.log(this.onClick);
    }
    
    render(){
        const selected = this.props.selected;
        return(
            <>
            <DropdownButton id="dropdown-item-button" ref={this.props.useRef} title="Choose an Activity">
                <Dropdown.Item as="button" active={selected === "Currencyconverter"} selected={selected === "Currencyconverter"} key={"Currencyconverter"} onClick={(e) => this.onClick(e)}>Currency converter</Dropdown.Item>
                <Dropdown.Item as="button" active={selected === "Win!"} selected={selected === "Win!"} key={"Win!"} onClick={(e) => this.onClick(e)}>Win!</Dropdown.Item>
            </DropdownButton>
            <br />
            <br />
            </>
        )
    }
}
export default Selector;