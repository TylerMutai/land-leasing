import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SignOut from "../../SignOut";
import {
  ActionDiv,
  DescInput,
  FormDiv,
  Input,
  InputDiv,
  Label,
  Links,
  MainDiv,
  Name,
  ProfileDiv,
  Title,
  TopDiv,
  UploadButton,
} from "../Dashboard";
import {getUserObject} from "../../../helpers/login";
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST, PATCH_REQUEST, POST_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import Swal from "sweetalert2";
import {handleChangeData} from "../../../helpers/helper_functions";


class FarmerDashboard extends Component {

  state = {
    data: {},
    loading: false,
    loadingSearch: false,
    errors: {},
    showChatModal: false,
    search_results: [],
  };

  componentDidMount() {
    this.getLandDetails();
  }

  getLandDetails = () => {
    const id = this?.props?.match?.params?.id;
    if (id) {
      makeRequest(GET_REQUEST, `${endpoints.lands}${id}`, {}, response => {
        const data = {...response.data};
        if (data) {
          console.log(data);
          this.setState({
            data: data,
          });
        }
      });
    }
  };

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    const {data} = this.state;
    const {id} = this?.props?.match?.params || {};
    const {history} = this.props;
    const path = id ? PATCH_REQUEST : POST_REQUEST;
    makeRequest(POST_REQUEST, `${endpoints.farmers_lands}`, data, response => {
      Swal.fire(
        'Success!',
        `Land ${id ? "updated" : "added"} successfully!`,
        'success',
      ).then(() => {
        history.push(`lands/${response.data.id}`);
      });
    }, (error) => {
      this.setState({
        errors: error.response.data,
      });
    }, () => {
      this.setState({loading: false});
    });
  };

  handleSearch = e => {
    // let searchQuery = e.target.value;
    this.saveLocation({
      geometry: {
        location: {
          lat: 1.2921,
          lng: 36.8219,
        },
      },
    });
  };

  /*searchFunc = debounce((searchQuery) => {
      this.setState({
          loadingSearch: true
      })
      makeRequest(GET_REQUEST, `${endpoints.location_search}?search_query=${searchQuery}`, {}, response => {
          this.setState({
              search_results: response.data.results
          })
      }, (error) => {
          this.setState({
              errors: error.response.data
          })
      }, () => {
          this.setState({loadingSearch: false})
      })
  }, 1000);*/

  saveLocation = location => {
    let data = {...this.state.data};
    data["lon"] = location.geometry.location.lng;
    data["lat"] = location.geometry.location.lat;
    this.setState({data: data});
  };

  handleOpenChatModal = () => {
    this.setState({showChatModal: true});
  };

  handleCloseChatModal = () => {
    this.setState({showChatModal: false});
  };

  render() {
    const user = getUserObject();
    const {data, errors, loading, loadingSearch, search_results} = this.state;
    return (
      <MainDiv>
        <Title>Dashboard</Title>
        <TopDiv>
          <ProfileDiv>
            <Name>
              {user.name}
            </Name>
            <ActionDiv>
              <Link to={`${ROUTES.DASHBOARD}`}>
                <Links>Add Land</Links>
              </Link>
              <Link to={`${ROUTES.VIEWLAND}`}>
                <Links>All Land</Links>
              </Link>
              <Link to={`${ROUTES.SOLD_LAND}`}>
                <Links>Sold Land</Links>
              </Link>
              {/*     <Button
                                variant="contained"
                                style={{backgroundColor: "white", color: "#3D9A04", fontWeight:"500"}}
                                onClick={this.handleOpenChatModal}>
                                Chats</Button>
                            <ReactModal
                                isOpen={this.state.showChatModal}
                                contentLabel="Chat">
                                <div className="d-flex flex-column h-100">
                                    <iframe style={{width: "100%", height: "100%"}}
                                            src="https://go-chat.netlify.app/"
                                            title="description"/>
                                    <Button className="bg-danger my-2" onClick={this.handleCloseChatModal}>
                                        Cancel
                                    </Button>
                                </div>
                            </ReactModal> */}
            </ActionDiv>
            <SignOut/>
          </ProfileDiv>
          <FormDiv>
            <InputDiv>
              <Label>Land Name</Label>
              <Input
                type="text"
                value={data.name || ""}
                placeholder="E.g Kamakis 40*100"
                name="name"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.name && (
                <p className="mb-0 small text-danger">{errors.name[0]}</p>
              )}
            </InputDiv>

            <InputDiv>
              <div className="row mx-auto align-items-center">
                <Label>Location</Label>
                {loadingSearch && <div className="spinner-border spinner-border-sm ml-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>}
              </div>

              <div className="dropdown">
                <Input
                  autocomplete="off"
                  data-toggle="dropdown"
                  type="text"
                  name="location"
                  placeholder="Search your location"
                  onChange={this.handleSearch}
                />
                <div className="dropdown-menu w-75" aria-labelledby="dropdownMenuButton">
                  {
                    search_results.map(location =>
                      <a key={location.id} onClick={() => this.saveLocation(location)}
                         className="dropdown-item"
                         href="#">
                        <i className="fas fa-location-arrow mr-2"/>
                        {location.name + " - " + location.formatted_address}
                      </a>,
                    )
                  }
                </div>
                {errors.lon && (
                  <p className="mb-0 small text-danger">{errors.lon[0]}</p>
                )}
                {errors.lat && (
                  <p className="mb-0 small text-danger">{errors.lat[0]}</p>
                )}
              </div>
            </InputDiv>
            <InputDiv>
              <Label>Suitable crop(s) to grow</Label>
              <Input
                type="text"
                value={data.crops || ""}
                placeholder="Maize,Beans"
                name="crops"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.crops && (
                <p className="mb-0 small text-danger">{errors.crops[0]}</p>
              )}
            </InputDiv>
            <InputDiv>
              <Label>Size</Label>
              <Input
                type="text"
                value={data.size || ""}
                placeholder="40*100"
                name="size"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.size && (
                <p className="mb-0 small text-danger">{errors.size[0]}</p>
              )}
            </InputDiv>
            <InputDiv>
              <Label>Price</Label>
              <Input
                type="number"
                value={data.price || ""}
                placeholder="100"
                name="price"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.price && (
                <p className="mb-0 small text-danger">{errors.price[0]}</p>
              )}
            </InputDiv>
            <InputDiv>
              <Label>Lease Period</Label>
              <Input
                type="text"
                value={data.lease_period || ""}
                placeholder="2 years"
                name="lease_period"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.lease_period && (
                <p className="mb-0 small text-danger">{errors.lease_period[0]}</p>
              )}
            </InputDiv>
            <InputDiv>
              <Label>Brief Description</Label>
              <DescInput
                type="text"
                value={data.description || ""}
                placeholder="Description about the Land (Max 250 words)"
                name="description"
                onChange={e => handleChangeData(e, this)}
              />
              {errors.description && (
                <p className="mb-0 small text-danger">{errors.description[0]}</p>
              )}
            </InputDiv>
            <UploadButton disabled={loading} type="submit" onClick={this.handleSubmit}>
              {loading ? "Loading" : "Upload"}
            </UploadButton>
          </FormDiv>
        </TopDiv>
      </MainDiv>
    );
  }
}

export default FarmerDashboard;