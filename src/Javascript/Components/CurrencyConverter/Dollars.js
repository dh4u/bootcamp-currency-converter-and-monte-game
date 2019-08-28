import React from 'react';

class Dollars extends React.Component{

    render(){

        return(
            <>
                $ {this.props.value} Dollars
            </>
        )
    }

}
export default Dollars;