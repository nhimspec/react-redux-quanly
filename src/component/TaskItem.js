import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskItem extends React.Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdate = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }
    render() {
        const { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        className={task.status === true ? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, props) => ({
    onUpdateStatus: id => {
        dispatch(actions.updateStatus(id))
    },
    onEditTask: task => {
        dispatch(actions.editTask(task))
    },
    onDelete: id => {
        dispatch(actions.deleteTask(id))
    },
    onCloseForm: () => {
        dispatch(actions.closeForm());
    },
    onOpenForm: () => {
        dispatch(actions.openForm());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);