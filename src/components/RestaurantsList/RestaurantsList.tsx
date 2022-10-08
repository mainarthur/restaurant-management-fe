import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Pagination, PaginationProps, Space } from "antd";
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
import { CreateModal } from "../CreateModal/CreateModal.js";
import { Restaurant } from "../Restaurant/Restaurant.js";

export const RestaurantsList = () => {
  const [updatingRestaurantId, setUpdatingRestaurantId] = useState<
    number | undefined
  >();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleChangePageNumber: PaginationProps["onChange"] = useEvent(
    async (page) => {
      await createAsyncAction(
        dispatch,
        searchActionAsync({
          page,
          searchTerm: pagination.searchTerm,
          pageSize: pagination.pageSize,
        }),
      );
    },
  );

  const handleOpenCreateModal = useEvent(() => setIsCreateModalOpen(true));
  const handleCloseCreateModal = useEvent(() => setIsCreateModalOpen(false));

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
      <PaginationContainer>
        <AddButton type="primary" onClick={handleOpenCreateModal}>
          <PlusOutlined />
        </AddButton>
        <PaginationWrapper
          showQuickJumper={false}
          current={pagination.page}
          onChange={handleChangePageNumber}
          total={pagination.total ?? 0}
          showSizeChanger={false}
          pageSize={pagination.pageSize}
        />
      </PaginationContainer>
      <CreateModal open={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </RestaurantsListWrapper>
  );
};

const PaginationContainer = styled(Space)`
  display: flex;
  justify-content: space-between;
  padding-right: 95pt;
  margin-top: 28pt;
`;

const AddButton = styled(Button)`
  width: 88pt;
  height: 44pt;
  font-size: 16pt;
`;

const PaginationWrapper = styled(Pagination)`
  li {
    width: 44pt;
    height: 44pt;
  }
  li a {
    padding-top: 10pt;
  }
  a {
    font-size: 16pt;
  }
`;

const RestaurantsListWrapper = styled.div`
  margin-top: 42pt;
`;
