import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import AddPerson from './AddPerson';  


class People extends Component {
    constructor(props) {
        super(props);
        this.state = {people: []};
    }

    componentDidMount() {
        this.fetchPeople();
    }

    onDelClick = (id) => {
        const jwtToken = sessionStorage.getItem("jwt");    
        if (window.confirm('Are you sure to delete person?')) {    
            fetch('http://localhost:8080/people/' + id, {    
                method: 'DELETE',    
                headers: new Headers({    
                    "Authorization": jwtToken,
                    "Content-Type": "application/json"
                })    
            }).then(res => this.fetchPeople())    
                .catch(err => console.error(err));    
        }    
    }; 
    
    addPerson(person) {
        const jwtToken = sessionStorage.getItem("jwt"); 
        fetch('http://localhost:8080/people/', {
            method: 'POST',    
            body: JSON.stringify(person),           
            headers: {    
                "Authorization": jwtToken,
                "Accept": "application/json",
                "Content_Type": 'application/json'
            },    
        })    
            .then(res => this.fetchPeople())    
            .catch(err => console.log(err))    
    }

    updatePerson(person) { 
        const jwtToken = sessionStorage.getItem("jwt");
        fetch('http://localhost:8080/people', {    
            method: 'PUT',    
            headers: {    
                "Authorization": jwtToken,
                "Content-Type": "application/json"     
            },    
            body: JSON.stringify(person)
        })    
            .then(res => this.fetchPeople)    
            .catch(err => console.log(err))    
    }


    editable = (cell) => {
        return (
            <div style={{backgroundColor: "#fafafa"}} contentEditable suppressContentEditableWarning onBlur={e => {
                const contact = [...this.state.people];
                contact[cell.index][cell.column.id] = e.target.innerHTML;
                this.setState({people: contact});
            }}
                 dangerouslySetInnerHTML={{__html: this.state.people[cell.index][cell.column.id]}}
            />
        );
    };

    render() {

        const columns = [{
            Header: 'Person',
            accessor: 'name',
            Cell: this.editable
        }, {
            Header: 'Place',
            accessor: 'place',
            Cell: this.editable
        }, {
            Header: 'Email',
            accessor: 'email',
            Cell: this.editable
        }, {    
            sortable: false,    
            filterable: false,    
            width: 100,    
            Cell: row => (    
                <div>    
                    <button onClick={() => this.onDelClick(row.original.id)}>Delete</button>    
                </div>    
            )    
        }, {    
            sortable: false,    
            filterable: false,    
            width: 100,    
            Cell: row => (    
                <div>    
                    <button onClick={() => this.updatePerson(row.original)}>Save</button>    
                </div>    
            )    
        }
            ,];
    
        return (
            <div>
                 <AddPerson addPerson={this.addPerson}  fetchPeople={this.fetchPeople} allPeople={this.state.people}/>
                <ReactTable data={this.state.people} columns={columns} filterable={true}/>
            </div>
        );
    }

    fetchPeople = () => {
        const jwtToken = sessionStorage.getItem("jwt");  
        fetch('http://localhost:8080/people', {
            headers: {
                "Authorization": jwtToken,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            } 
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                people: responseData
            })
        })
        .catch(err => console.error(err))
    }

}

export default People;  