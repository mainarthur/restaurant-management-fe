import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEvent } from "../../hooks/useEvent.js";
import {
  createRestaurantActionAsync,
  searchActionAsync,
} from "../../redux/actions/restaurants.js";
import { createAsyncAction } from "../../redux/helpers.js";
import { paginationSelector } from "../../redux/selectors/pagination.js";

type Props = {
  open: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
};

export const CreateModal = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const pagination = useSelector(paginationSelector);
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
      createRestaurantActionAsync({ name, email, phone, address }),
    );
    await createAsyncAction(dispatch, searchActionAsync({ ...pagination }));
    onClose(e);
  });

  const handleCancel = useEvent((e) => {
    onClose(e);
  });

  return (
    <Modal
      closable={false}
      maskClosable={false}
      centered
      open={open}
      width={"538pt"}
      footer={null}
    >
      <Title>Add restaurant</Title>
      <StyledInput onChange={handleNameChange} placeholder="Name" />
      <StyledInput onChange={handleAddressChange} placeholder="Address" />
      <StyledInput onChange={handlePhoneChange} placeholder="Phone" />
      <StyledInput onChange={handleEmailChange} placeholder="Email" />
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
