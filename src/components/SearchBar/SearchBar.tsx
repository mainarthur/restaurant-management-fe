import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Space>
      <SearchInput placeholder="Search" />
      <SearchButton type="primary">
        <SearchOutlined />
      </SearchButton>
    </Space>
  );
};

const SearchInput = styled(Input)`
  width: 653pt;
  height: 44pt;
  font-size: 16pt;
  margin-right: 5pt;
`;

const SearchButton = styled(Button)`
  width: 88pt;
  height: 44pt;
  font-size: 16pt;
  margin-left: 5pt;
`;
