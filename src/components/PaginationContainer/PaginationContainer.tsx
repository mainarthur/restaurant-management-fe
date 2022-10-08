import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Pagination, PaginationProps, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEvent } from "../../hooks/useEvent.js";
import { searchActionAsync } from "../../redux/actions/restaurants.js";
import { createAsyncAction } from "../../redux/helpers.js";
import { paginationSelector } from "../../redux/selectors/pagination.js";
import { CreateModal } from "../CreateModal/CreateModal.js";

export const PaginationContainer = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const pagination = useSelector(paginationSelector);
  const dispatch = useDispatch();

  const handleOpenCreateModal = useEvent(() => setIsCreateModalOpen(true));
  const handleCloseCreateModal = useEvent(() => setIsCreateModalOpen(false));

  const handleChangePageNumber: PaginationProps["onChange"] = useEvent(
    async (page) => {
      await createAsyncAction(
        dispatch,
        searchActionAsync({
          page: page - 1,
          searchTerm: pagination.searchTerm,
          pageSize: pagination.pageSize,
        }),
      );
    },
  );

  return (
    <Container>
      <AddButton type="primary" onClick={handleOpenCreateModal}>
        <PlusOutlined />
      </AddButton>
      <PaginationWrapper
        showQuickJumper={false}
        current={pagination.page + 1}
        onChange={handleChangePageNumber}
        total={pagination.total ?? 0}
        showSizeChanger={false}
        pageSize={pagination.pageSize}
        showLessItems
      />
      <CreateModal open={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </Container>
  );
};

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
  .ant-pagination-item {
    background-color: #f3f4f5;
    border: none;
  }
  .ant-pagination-item-active {
    background-color: #323cf0;
    a {
      color: white;
    }
  }
  .ant-pagination-jump-next,
  .ant-pagination-prev,
  .ant-pagination-next {
    display: none;
  }
`;

const Container = styled(Space)`
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
