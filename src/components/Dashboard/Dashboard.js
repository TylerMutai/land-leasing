import React, {Component} from "react";
import "./Dashboard.css";
import styled from "styled-components";
/*import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";*/
import renderIf from "render-if";
import {getUserObject} from "../../helpers/login";
import FarmerDashboard from "./Farmer";
import MerchantDashboard from "./Merchant";
import {Roles} from "../../values/globals";
import UserDashboard from "./User";
import AdminDashboard from "./Admin";

export const MainDiv = styled.div`
    padding: 1em;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h3`
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7em;
    line-height: 34px;
    color: #3d9a04;
    padding: 20px;
`;

export const TopDiv = styled.div`
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 100%;
`;

export const ProfileDiv = styled.div`
    height: 60vh;
    width: 30%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #e5e5e5;
    border: none;
    border-radius: 10px;
`;

export const Name = styled.p`
    font-family: Montserrat;
    font-style: normal;
    font-size: 1.4em;
    font-weight: 600;
    margin-top: 30px;
`;

export const ActionDiv = styled.div`
    margin-top: 1em;
    width: 80%;
    height: auto;
    border-radius: 15px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-bottom: 1.5em;
    padding-left: 2.5em;
`;

export const Links = styled.p`
    text-decoration: none;
    color: black;
    font-family: Montserrat;
    variant: contained;
    font-style: normal;
    font-size: 1.2em;
    margin-top: 0.1em;
    cursor: pointer;
    height: 1.5em;
    width: 12em;
    background-color: white;
    border-radius: 8px;
    padding-top: 0.1em;
    padding-left: 0.5em;
`;

export const FormDiv = styled.div`
    height: auto;
    width: 50%;
`;

export const InputDiv = styled.div``;

export const Label = styled.p`
    font-family: Helvetica;
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: -0.1em;
`;

export const Input = styled.input`
    height: 2.3em;
    width: 70%;
    border: none;
    border-radius: 8px;
    background-color: #e5e5e5;
    padding-left: 0.5em;
`;

export const DescInput = styled.textarea`
    height: 6em;
    width: 70%;
    border: none;
    border-radius: 8px;
    background-color: #e5e5e5;
`;

export const LeaseDiv = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    margin-top: 1.5em;
`;

export const LeaseInputDiv = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    width: 100%;
`;

export const UploadButton = styled.button`
    height: 2.4em;
    width: 60%;
    color: white;
    background-color: #3d9a04;
    border: none;
    border-radius: 8px;
    margin-top: 1.5em;
    cursor: pointer;
`;

export const Alert = styled.p`
    margin-top: 0.2em;
    color: #3d94a0;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.setState({pageLoading: true});
  }

  render() {
    const user = getUserObject();
    return (
      <>
        {renderIf(user.role === Roles.farmer)(
          <FarmerDashboard match={this.props.match} history={this.props.history}/>,
        )}
        {renderIf(user.role === Roles.merchant)(
          <MerchantDashboard match={this.props.match}/>,
        )}
        {renderIf(user.role === Roles.user)(
          <UserDashboard match={this.props.match}/>,
        )}
        {renderIf(user.role === Roles.admin)(
          <AdminDashboard match={this.props.match}/>,
        )}
      </>
    );
  }
}

export default Dashboard;