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
        if (window.confirm('Are you sure to delete person?')) {    
            fetch('http://localhost:8080/people/' + id, {    
                method: 'DELETE',    
                headers: new Headers({    
                    "Authorization": "BEARER eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2Njc0NjgwOX0.L7sDZnICU07BwtqnzeVoX8fLC_jxowCmA5y-Jdj5J6aTMlffFHt9xRqDI_C_itYrbpL6I7p1dpfLsNnAkjupfQ"    
      })    
            }).then(res => this.fetchPeople())    
                .catch(err => console.error(err));    
        }    
    }; 

    updatePerson(person) {    
        fetch('http://localhost:8080/people', {    
            method: 'PUT',    
            headers: {    
                "Authorization": "BEARER eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2Njc0NjgwOX0.L7sDZnICU07BwtqnzeVoX8fLC_jxowCmA5y-Jdj5J6aTMlffFHt9xRqDI_C_itYrbpL6I7p1dpfLsNnAkjupfQ",    
                "Content-Type": "application/json"    
      },    
            body: JSON.stringify(person)    
        })    
            .then(res => this.fetchPeople())    
            .catch(err => console.log(err))    
    }

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
                 <AddPerson addPerson={this.addPerson}  fetchPeople={this.fetchPeople}/>
                <ReactTable data={this.state.people} columns={columns} filterable={true}/>
            </div>
        );
    }

    fetchPeople = () => {
        fetch('http://localhost:8080/people', {headers: {"Authorization": "BEARER eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2Njc0NjgwOX0.L7sDZnICU07BwtqnzeVoX8fLC_jxowCmA5y-Jdj5J6aTMlffFHt9xRqDI_C_itYrbpL6I7p1dpfLsNnAkjupfQ"} })
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