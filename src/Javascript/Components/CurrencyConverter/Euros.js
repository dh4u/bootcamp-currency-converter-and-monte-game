// display an amount in Euros
import React from 'react';

class Euros extends React.Component{

    render(){

        return(
            <>
                &euro; {this.props.value} Euros&nbsp;&nbsp;
            </>
        )
    }

}
export default Euros;