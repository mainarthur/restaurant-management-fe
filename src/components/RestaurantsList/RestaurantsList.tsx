import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Pagination, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEvent } from "../../hooks/useEvent.js";
import {
  deleteRestaurantActionAsync,
  searchActionAsync,
} from "../../redux/actions/restaurants.js";
import { createAsyncAction } from "../../redux/helpers.js";
import { RootState } from "../../redux/reducers";
import { Restaurant } from "../Restaurant/Restaurant.js";

export const RestaurantsList = () => {
  const [updatingRestaurantId, setUpdatingRestaurantId] = useState<
    number | undefined
  >();

  const restaurants = useSelector((state: RootState) => state.restaurants);
  const pagination = useSelector((state: RootState) => state.pagination);
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
      <Space>
        <Button type="primary">
          <PlusOutlined />
        </Button>
        <Pagination />
      </Space>
    </RestaurantsListWrapper>
  );
};

const RestaurantsListWrapper = styled.div`
  margin-top: 42pt;
`;
