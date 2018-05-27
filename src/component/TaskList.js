import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions';
import _ from 'lodash';

class TaskList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterName: '',
            filterStatus: -1, // all: -1, active: 1, deactive: 0
        }
    }
    render() {
        let { tasks, filterTable, keyword, sort } = this.props;
        let { filterName, filterStatus } = this.state;
        if (filterTable) {
            if (filterTable.name) {
                tasks = _.filter(tasks, (task) => task.name.toLowerCase().indexOf(filterTable.name) !== -1)
            }
            tasks = tasks.filter((task) => {
                if (filterTable.status === -1) {
                    return task;
                } else {
                    return task.status === (filterTable.status === 1 ? true : false);
                }
            });
        }

        if (keyword) {
            tasks = _.filter(tasks, (task) => task.name.toLowerCase().indexOf(keyword) !== -1)
        }

        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return sort.value;
                else if (a.status < b.status) return -sort.value;
                else return 0;
            });
        }

        const elementTask = tasks.map((task, index) =>
            <TaskItem
                key={task.id}
                index={index}
                task={task}
            />
        )

        const bind = (statePath) => ({
            value: this.state[statePath] === null ? "" : this.state[statePath],
            onChange: (e) => {
                let value = e.target.value;
                var filter = {
                    name: statePath === 'filterName' ? value : filterName,
                    status: statePath === 'filterStatus' ? value : filterStatus
                };
                this.props.onFilterTable(filter);
                this.setState({ [statePath]: e.target.value })
            }
        });
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                name="filterName"
                                className="form-control"
                                {...bind("filterName")}
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                {...bind("filterStatus")}
                            >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elementTask}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onFilterTable: (filter) => {
        dispatch(actions.filterTask(filter))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);