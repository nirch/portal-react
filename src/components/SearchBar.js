import React from 'react';
// import { Form, Button, FormControl} from 'react-bootstrap';
import '../pages/courses/courses.css';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputvalue: '',
            page: 1
        }
    }
    handleChange = (e) => {
        this.setState({ inputvalue: e.target.value })
    }
    increment = () => {
        if (this.props.currentPage < this.props.pages) {
           let newPage =  this.props.currentPage +=1;
            this.props.updatePage(newPage);
    }
}
    decrement = () => {
        if (this.props.currentPage > 1) {
            let newPage =  this.props.currentPage -=1;
           this.props.updatePage(newPage);
    }
    }
    render() {
        const searchValue = this.state.inputvalue
        return (
            <div className="search-bar">

                <form onSubmit={() => { this.props.handleSearch(searchValue) }}>
                    <input type="text" placeholder={this.props.searchLabel} value={searchValue} onChange={this.handleChange} />
                </form>
                <div className={this.props.pages < 1 ? "invis" : ""}>
                    <span className={this.props.currentPage == 1 ? "disactive" : "active"} onClick={this.decrement}>
                        <img src="images/arrow_down.svg" alt="" />
                    </span>
                    <span className="page-num">{this.props.currentPage}</span>
                    <span className={this.props.currentPage == this.props.pages ? "disactive" : "active"} onClick={this.increment}>
                        <img src="images/arrow_down_left.svg" alt="" />
                    </span>
                </div>

            </div>
        )
    }
}
export default SearchBar;