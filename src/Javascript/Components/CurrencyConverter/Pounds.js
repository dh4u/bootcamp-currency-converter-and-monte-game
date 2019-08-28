// display an amount in Pounds
import React from 'react';

class Pounds extends React.Component{

    render(){

        return(
            <>
                &pound; {this.props.value} Pounds
            </>
        )
    }

}
export default Pounds;