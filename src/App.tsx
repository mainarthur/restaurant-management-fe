import { useState } from "react";
import { Button, Card, Input, Pagination, Space, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Space>
        <Input />
        <Button type="primary">
          <SearchOutlined />
        </Button>
      </Space>
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
    </div>
  );
}

export default App;
