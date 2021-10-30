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
            term: '',
            filter: 'app',
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }

        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                } else return item
            })
        }))
    }

    addItem = (event, name, salary) => {
        if (name && salary) {
            event.preventDefault();
            this.setState(({data, idMax}) => ({
                    data: [
                        ...data,
                        {name, salary, increase: false, rise: false, id: idMax,}
                    ],
                    idMax: idMax + 1,
                })
            )
        }

    }

    searchItem = (items, term) => {
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState(({term}))
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter(item => item.rise)
            case "salary":
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onUpdateFilter = (filter) => {
        this.setState(({filter}))
    }


    render() {

        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleDate = this.filterPost(this.searchItem(data, term), filter);
        return (
            <div className={'app'}>
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className={'search-panel'}>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}
                    />
                </div>
                <EmployeesList
                    data={visibleDate}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}

                />
                <EmployeesAddForm addItem={this.addItem}/>
            </div>
        )
    }
}

export default App