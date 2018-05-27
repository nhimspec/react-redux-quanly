import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskSort extends React.Component {

    onClick = (sortBy, sortVal) => {
        this.props.onSort({
            by: sortBy,
            value: sortVal
        });
    }

    render() {
        let { sort } = this.props;

        const classSort = (sort, sortBy, value) => (
            sort.by === sortBy && sort.value === value ? 'sort_selected' : ''
        );
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a
                                role="button"
                                className={classSort(sort, "name", 1)}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                    </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a
                                role="button"
                                className={classSort(sort, "name", -1)}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                    </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a
                                role="button"
                                className={classSort(sort, "status", 1)}
                            >Trạng Thái Kích Hoạt</a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a
                                role="button"
                                className={classSort(sort, "status", -1)}
                            >Trạng Thái Ẩn</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSort);