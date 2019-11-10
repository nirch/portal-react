import React from 'react';
// import { Form, Button, FormControl} from 'react-bootstrap';
import '../pages/courses/courses.css';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputvalue: '',
            pages: this.props.pages,
            page: 1
        }
    }
    handleChange = (e) => {
        this.setState({ inputvalue: e.target.value })
        console.log(this.state.inputvalue)
    }
    increment = () => {
        this.setState({ 
            page: +this.state.page + 1 }, () => {this.props.updateSearch(this.state.page)});
        // this.props.updateSearch(this.state.page);
    }
    decrement = () => {
        this.setState({ 
            page: this.state.page - 1 }, () => {this.props.updateSearch(this.state.page)});
        }

    render() {
        const searchValue = this.state.inputvalue
        return (
            <div className="search-bar">

                <form onSubmit={() => { this.props.handleSearch(searchValue) }}>
                    <input type="text" placeholder={this.props.searchLabel} value={this.state.inputvalue} onChange={this.handleChange} />
                </form>
                <div>

                    <span className={this.state.page == this.props.pages ? "disactive" : ""} onClick={this.increment}>  <img src="images/ArrowRight/drawable-mdpi/arrow_down.png" alt="" /> </span>
                    <span>{this.state.page}</span>
                    <span className={this.state.page == 1 ? "disactive" : ""} onClick={this.decrement}>    <img src="images/ArrowLeft/drawable-mdpi/arrow_down.png" alt="" /> </span>
                </div>

            </div>
        )
    }
}
export default SearchBar;