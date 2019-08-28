// display an amount in Rands
import React from 'react';

class Rands extends React.Component{

    render(){

        return(
            <>
                $ {this.props.value} Rands&nbsp;
            </>
        )
    }

}
export default Rands;