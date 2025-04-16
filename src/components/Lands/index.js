import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {
  Crops,
  Image,
  Item,
  ItemDetailsDiv,
  ItemImageDiv,
  ItemName,
  ItemsContainer,
  ItemsDiv,
  ItemsName,
  Price,
} from "../../elements/ProductsAndLanding";

class LandsList extends Component {
  state = {
    loading: false,
    lands: [],
  };

  render() {
    const {loading, lands} = this.state;
    const {location} = this.props;
    return (
      <ItemsContainer>
        <ItemsName>Land Available</ItemsName>
        {
          loading ?
            <div>Loading...</div> :
            lands.length < 1 ?
              <div>No land available in {this.state.location}</div>
              :
              <ItemsDiv>
                {lands.map((land) => (
                  <Link
                    to={`land-details/${land.id}`}
                    style={{textDecoration: "none", color: "black"}}
                    key={land.id}
                  >
                    <Item>
                      <ItemImageDiv>
                        <Image src={land.image} alt={land.name}/>
                      </ItemImageDiv>
                      <ItemDetailsDiv>
                        <ItemName>{land.name}</ItemName>
                        <Crops>{land.suitableCrop}</Crops>
                        <Price>Ksh. {land.price}</Price>
                      </ItemDetailsDiv>
                    </Item>
                  </Link>
                ))}
              </ItemsDiv>
        }
      </ItemsContainer>
    );
  }
}

export default LandsList;