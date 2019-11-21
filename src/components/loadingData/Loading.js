import React from 'react'
import { Container, Button , Row, Spinner} from 'react-bootstrap';


export default class Loading extends React.Component { 
    constructor(props) {
         super(props);
    }
render(){
    return(
        <Container> 
        <Row className="justify-content-md-center p-3">
        <Button variant="danger" className={this.props.isLoading} disabled >
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
             />
             טוען נתונים, נא להמתין
           </Button>
         </Row>  
       </Container>      
    )
}
}