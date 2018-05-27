import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: null,
			status: false
		}
	}

	componentDidMount() {
		if (this.props.taskEditing) {
			let { taskEditing } = this.props;
			this.setState({
				id: taskEditing.id,
				name: taskEditing.name,
				status: taskEditing.status
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.taskEditing) {
			this.setState({
				id: nextProps.taskEditing.id,
				name: nextProps.taskEditing.name,
				status: nextProps.taskEditing.status
			})
		} else {
			this.onClear();
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		let data = this.state;
		this.props.onSaveTask(data);
		this.onClear();
		this.props.onCloseForm();
	}

	onClear = () => {
		this.setState({
			name: null,
			status: false
		})
	}

	render() {
		const bind = (statePath) => ({
			value: this.state[statePath] === null ? "" : this.state[statePath],
			onChange: (e) => this.setState({ [statePath]: e.target.value })
		});

		const { id } = this.state;
		if (!this.props.isDisplayForm) return null
		else
			return (
				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
					<div className="panel panel-warning">
						<div className="panel-heading">
							<h3 className="panel-title">
								{
									id !== null ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'
								}
								<span
									className="fa fa-times-circle pull-right"
									onClick={this.props.onCloseForm}
								></span>
							</h3>
						</div>
						<div className="panel-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label>Tên :</label>
									<input
										type="text"
										className="form-control"
										name="name"
										{...bind("name")}
									/>
								</div>
								<label>Trạng Thái :</label>
								<select
									className="form-control"
									required="required"
									{...bind("status")}
								>
									<option value={true}>Kích Hoạt</option>
									<option value={false}>Ẩn</option>
								</select>
								<br />
								<div className="text-center">
									<button type="submit" className="btn btn-warning">
										{
											id !== null ? 'Sửa' : 'Thêm'
										}
									</button>&nbsp;
							<button
										type="button"
										className="btn btn-danger"
										onClick={this.onClear}
									>Hủy Bỏ</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			);
	}
}

const mapStateToProps = state => ({
	isDisplayForm: state.isDisplayForm,
	taskEditing: state.taskEditing
});

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveTask: (task) => {
			dispatch(actions.saveTask(task));
		},
		onCloseForm: () => {
			dispatch(actions.closeForm());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
