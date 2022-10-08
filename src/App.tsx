import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Pagination, Space, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { SearchBar } from "./components/SearchBar/SearchBar.js";

const App = () => {
  // const dispatch = useDi;
  useEffect(() => {}, []);

  return (
    <AppContainer>
      <SearchBar />
      <Space>
        <Card>
          <Typography>McDonalds</Typography>
          <Typography>
            5 Hermitage Rd, St John's, Woking GU21 8TE, UK
          </Typography>
          <Typography>hi@mcdonalds.com</Typography>
          <Typography>(494) 927-2152</Typography>
        </Card>
      </Space>
      <Space>
        <Button type="primary">
          <PlusOutlined />
        </Button>
        <Pagination />
      </Space>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15pt;
  margin-left: 218pt;
  margin-right: 218pt;
`;

export default App;
