import {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";

import './app.css';
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John S.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex B.', salary: 1200, increase: true, rise: false, id: 2},
                {name: 'Ted L.', salary: 500, increase: false, rise: false, id: 3},
            ],
            idMax: 4,
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }

        })
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                } else return item
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                } else return item
            })
        }))
    }


    addItem = (event, name, salary) => {
        event.preventDefault();
        this.setState(({data, idMax}) => ({
                data: [
                    ...data,
                    {name, salary, increase: false, rise: true, id: idMax,}
                ],
                idMax: idMax + 1,
            })
        )
    }

    render() {

        const {data} = this.state;
        const employees = data.length;
        const increased = data.filter(item=>item.increase).length
        return (
            <div className={'app'}>
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className={'search-panel'}>
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployeesList
                    data={data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                />
                <EmployeesAddForm addItem={this.addItem}/>
            </div>
        )
    }
}

export default App