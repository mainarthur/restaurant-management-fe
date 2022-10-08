import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEvent } from "../../hooks/useEvent.js";
import {
  createRestaurantActionAsync,
  searchActionAsync,
  updateRestaurantActionAsync,
} from "../../redux/actions/restaurants.js";
import { createAsyncAction } from "../../redux/helpers.js";
import { paginationSelector } from "../../redux/selectors/pagination.js";
import { restaurantsSelector } from "../../redux/selectors/restaurants.js";

type Props = {
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  id: number;
};

export const UpdateModal = ({ onClose, id }: Props) => {
  const pagination = useSelector(paginationSelector);
  const restaurants = useSelector(restaurantsSelector);

  const restaurant = restaurants.find(
    (restaurantToCheck) => restaurantToCheck.id === id,
  );
  console.log({ id, restaurant, restaurants });
  const [name, setName] = useState(restaurant?.name ?? "");
  const [address, setAddress] = useState(restaurant?.address ?? "");
  const [phone, setPhone] = useState(restaurant?.phone ?? "");
  const [email, setEmail] = useState(restaurant?.email ?? "");

  const dispatch = useDispatch();

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = useEvent(
    (event) => setName(event.target.value),
  );

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> =
    useEvent((event) => setAddress(event.target.value));

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> =
    useEvent((event) => setPhone(event.target.value));

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    useEvent((event) => setEmail(event.target.value));

  const handleCreate = useEvent(async (e) => {
    await createAsyncAction(
      dispatch,
      updateRestaurantActionAsync({ id, name, email, phone, address }),
    );
    await createAsyncAction(dispatch, searchActionAsync({ ...pagination }));
    onClose(e);
  });

  const handleCancel = useEvent((e) => {
    onClose(e);
  });

  return (
    <Modal
      centered
      open
      closable={false}
      maskClosable={false}
      width={"538pt"}
      footer={null}
    >
      <Title>Edit restaurant</Title>
      <StyledInput
        defaultValue={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <StyledInput
        defaultValue={address}
        onChange={handleAddressChange}
        placeholder="Address"
      />
      <StyledInput
        defaultValue={phone}
        onChange={handlePhoneChange}
        placeholder="Phone"
      />
      <StyledInput
        defaultValue={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <>
        <ConfirmButton type="primary" onClick={handleCreate}>
          <CheckOutlined />
        </ConfirmButton>
        <CancelButton onClick={handleCancel}>
          <CloseOutlined />
        </CancelButton>
      </>
    </Modal>
  );
};
const Title = styled(Typography)`
  font-size: 22pt;
  font-weight: bold;
  margin-bottom: 30pt;
`;

const StyledInput = styled(Input)`
  width: 499.3pt;
  height: 44pt;
  font-size: 16pt;
  margin-bottom: 20pt;
`;

const ConfirmButton = styled(Button)`
  margin-top: 10pt;
  width: 88pt;
  height: 44pt;
  font-size: 16pt;
`;

const CancelButton = styled(Button)`
  margin-top: 10pt;
  width: 44pt;
  height: 44pt;
  font-size: 16pt;
  margin-left: 10pt;
  background-color: #f3f4f5;
  border: none;
`;
