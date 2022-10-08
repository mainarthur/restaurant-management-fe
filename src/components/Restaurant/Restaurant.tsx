import styled from "@emotion/styled";
import { Button, Card, Space, Typography } from "antd";

import { useEvent } from "../../hooks/useEvent.js";
import { Restaurant as RestaurantType } from "../../redux/types/Restaurant.js";

type Handler = (id: number) => void;
type Props = RestaurantType & { onUpdate: Handler; onDelete: Handler };

export const Restaurant = ({
  id,
  name,
  address,
  email,
  phone,
  onDelete,
  onUpdate,
}: Props) => {
  const handleDelete: React.MouseEventHandler<HTMLElement> = useEvent(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      onDelete(id);
    },
  );

  const handleUpdate: React.MouseEventHandler<HTMLElement> = useEvent(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      onUpdate(id);
    },
  );

  return (
    <RestaurantContainer onClick={handleUpdate}>
      <ContactContainer>
        <span>
          <Title>{name}</Title>
          <Address>{address}</Address>
        </span>
        <DeleteButton onClick={handleDelete}>
          <MinusOutlined />
        </DeleteButton>
      </ContactContainer>
      <ContactContainer>
        <Email>{email}</Email>
        <Phone>{phone}</Phone>
      </ContactContainer>
    </RestaurantContainer>
  );
};

const Title = styled(Typography)`
  font-size: 22pt;
  font-weight: bold;
`;

const Address = styled(Typography)`
  font-size: 16pt;
`;

const Email = styled(Typography)`
  font-size: 16pt;
  color: #323cf0;
`;

const Phone = Address;

const DeleteButton = styled(Button)`
  width: 44pt;
  height: 44pt;
  background-color: #4c54ee;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: #4c54ee;
  }
  &:active {
    background-color: #4c54ee;
  }
  &:focus {
    background-color: #4c54ee;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
`;

const RestaurantContainer = styled.div`
  width: 750pt;
  height: 134pt;
  background-color: #f3f4f5;
  margin-bottom: 10pt;
  padding-top: 18pt;
  padding-left: 20pt;
  padding-right: 20pt;
  padding-bottom: 12pt;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    background-color: #323cf0;
    article {
      color: white;
    }
    button {
      display: flex;
    }
  }
`;

const ContactContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const MinusOutlined = styled.div`
  width: 12pt;
  height: 2pt;
  background-color: white;
`;
