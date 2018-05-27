import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskSearch extends React.Component {
    state = {
        keyword: ''
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {

        const bind = (statePath) => ({
            value: this.state[statePath] === null ? '' : this.setState[statePath],
            onChange: (e) => this.setState({ [statePath]: e.target.value })
        })
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        type="text" className="form-control" placeholder="Nhập từ khóa..."
                        {...bind("keyword")}
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5"></span>Tìm
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSearch);