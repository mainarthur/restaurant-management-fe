import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEvent } from "../../hooks/useEvent.js";
import {
  deleteRestaurantActionAsync,
  searchActionAsync,
} from "../../redux/actions/restaurants.js";
import { createAsyncAction } from "../../redux/helpers.js";
import { paginationSelector } from "../../redux/selectors/pagination.js";
import { restaurantsSelector } from "../../redux/selectors/restaurants.js";
import { PaginationContainer } from "../PaginationContainer/PaginationContainer.js";
import { Restaurant } from "../Restaurant/Restaurant.js";
import { UpdateModal } from "../UpdateModal/UpdateModal.js";

export const RestaurantsList = () => {
  const [updatingRestaurantId, setUpdatingRestaurantId] = useState<
    number | undefined
  >();

  const restaurants = useSelector(restaurantsSelector);
  const pagination = useSelector(paginationSelector);
  const dispatch = useDispatch();

  const handleDeleteRestaurant = useEvent(async (id: number) => {
    await createAsyncAction(dispatch, deleteRestaurantActionAsync({ id }));
    await createAsyncAction(
      dispatch,
      searchActionAsync({
        searchTerm: pagination.searchTerm,
        page: restaurants.length === 1 ? pagination.page - 1 : pagination.page,
        pageSize: pagination.pageSize,
      }),
    );
  });

  const handleUpdateRestaurant = useEvent((id: number) => {
    setUpdatingRestaurantId(id);
  });

  const handleUpdateModalClose = useEvent(() =>
    setUpdatingRestaurantId(undefined),
  );

  return (
    <RestaurantsListWrapper>
      {restaurants.map(({ id, name, address, email, phone }) => (
        <Restaurant
          key={id}
          id={id}
          name={name}
          address={address}
          email={email}
          phone={phone}
          onDelete={handleDeleteRestaurant}
          onUpdate={handleUpdateRestaurant}
        />
      ))}
      <PaginationContainer />
      {updatingRestaurantId ? (
        <UpdateModal
          id={updatingRestaurantId}
          onClose={handleUpdateModalClose}
        />
      ) : null}
    </RestaurantsListWrapper>
  );
};

const RestaurantsListWrapper = styled.div`
  margin-top: 42pt;
`;
