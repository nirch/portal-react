import React from 'react';
// import { Form, Button, FormControl} from 'react-bootstrap';
import '../pages/courses/courses.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputvalue: ''}
    }
    handleChange = (e) => {
        this.setState({ inputvalue: e.target.value})
        console.log(this.state.inputvalue)
    }
    render() {
        const searchValue = this.state.inputvalue
        return (
            <div>
                <form onSubmit = {() => {this.props.handleSearch(searchValue)}}>
                    <input type = "text" placeholder = {this.props.searchLabel} value = {this.state.inputvalue} onChange = {this.handleChange}/>
                    
                </form>
               
            </div>
        )
    }
}
export default SearchBar;