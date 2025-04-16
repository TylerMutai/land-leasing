import React, {Component} from 'react';
import {makeRequest} from "../../../helpers/network_utils";
import {DELETE_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import {parseErrorResponse, showAlert} from "../../../helpers/helper_functions";

class SingleUser extends Component {

  state = {};

  handleDelete = e => {
    e.preventDefault();
    const {callback, user} = this.props;
    this.setState({
      loading: true,
    });
    makeRequest(DELETE_REQUEST, `${endpoints.admin_users}${user.id}`, {}, response => {
      this.setState({
        users: response.data,
      });
      if (callback) {
        callback();
      }
    }, error => {
      showAlert('error', 'Error', parseErrorResponse(error));
    }, () => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const {user, index} = this.props;
    const {loading} = this.state;
    return (
      <tr key={user.id}>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone_number} </td>
        <td>{user.role || "-"}</td>
        <td>{user.active === "1" ?
          <span style={{whiteSpace: "nowrap"}} className="badge-success rounded-pill px-1">
                        active
                    </span> :
          <span style={{whiteSpace: "nowrap"}} className="badge-danger rounded-pill px-1">
                        not active
                    </span>
        }</td>
        <td>
          <button onClick={this.handleDelete} disabled={loading} style={{whiteSpace: "nowrap"}}
                  className="btn btn-sm btn-info">
            {loading ? "Loading" : user.active === "1" ? "De-activate" : "Activate"}
          </button>
        </td>
      </tr>
    );
  }
}

export default SingleUser;