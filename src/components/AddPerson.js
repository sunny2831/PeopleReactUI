import React, {Component} from 'react'; 
import SkyLight from 'react-skylight';

class AddPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            place: "",
            email: ""
        }
    }

    handleChange = (event) => {    
        this.setState(    
            {[event.target.name]: event.target.value}    
        );    
    };    
    
    handleSubmit = (event) => {    
        event.preventDefault();    
        var person = {name: this.state.name, place: this.state.place, email: this.state.email};    
        this.props.addPerson(person);    
        this.refs.addDialog.hide();    
    } 

    render() {    
        return (    
            <div>    
                <SkyLight hideOnOverlayClicked ref="addDialog">    
                    <h3>Add Contact</h3>    
                    <form>    
                        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/><br/>    
                        <input type="text" placeholder="Place" name="place" onChange={this.handleChange}/><br/>    
                        <input type="text" placeholder="Email" name="email" onChange={this.handleChange}/><br/>    
                        <button onClick={this.handleSubmit}>Add</button>    
                    </form>    
                </SkyLight>    
                <div>    
                    <button style={ {'margin': '10px'} } onClick={() => this.refs.addDialog.show()}>Add contact</button>    
                </div>    
            </div>    
        )    
    } 
}

export default AddPerson;