import React, {Component} from 'react';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {people: []};
    }

    componentDidMount() {
        fetch('http://localhost:8080/people', {headers: {"Authorization": "BEARER eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU2Njc0NjgwOX0.L7sDZnICU07BwtqnzeVoX8fLC_jxowCmA5y-Jdj5J6aTMlffFHt9xRqDI_C_itYrbpL6I7p1dpfLsNnAkjupfQ"} })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    people: responseData
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        const tableRows = this.state.people.map((person, index) =>
            <tr key={index}>
                <td>{person.name}</td>
                <td>{person.place}</td>
                <td>{person.email}</td>
            </tr>
        );
        return (
            <div className="App">
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    }
}

export default People;  