"use client";
import { useEffect, useRef, useState } from "react";
import { Table } from "antd";

const CustomTable = ({ data, dataPagination, columns }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterdColumns, setFilterdColumns] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1 },
  });

  // Functions

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex) => {
    clearFilters();
    setSearchText("");
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, ...sorter });
  };

  const refreshTable = () => {
    setTableParams({ pagination: { current: 1 } });
    setSearchText("");
    setSearchedColumn("");
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  //   Useeffect
  useEffect(() => {
    if (dataPagination) {
      const { total, limit: pageSize } = dataPagination;
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total, pageSize },
      }));
    }
  }, [dataPagination]);

  useEffect(() => {
    const select = [
      columns.filter((col) => col.status).map((col) => col.dataIndex),
    ];
  }, [columns]);

  return (
    <div className="tableBox">
      <Table
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns.filter((col) => col.status)}
        dataSource={data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
        size="small"
      />
    </div>
  );
};

export default CustomTable;
