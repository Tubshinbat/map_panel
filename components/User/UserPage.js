"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Table, Tag, Space, Tooltip, Modal, Form } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import useUser from "hooks/useUser";
import Header from "components/Header/Header";
import PageNavItem from "components/Page/PageNavItem";
import Side from "components/Side/Side";
import base from "lib/base";
import { toastControl } from "lib/toastControl";
import TemplateSettings from "components/Generals/TemplateSettings";
import { useNotificationContext } from "context/notificationContext";

const Page = () => {
  const searchInput = useRef(null);
  const router = useRouter();
  const { contentLoad } = useNotificationContext();
  const [form] = Form.useForm();
  // States
  const [querys, setQuerys] = useState();
  const { users, pagination, loadUser, deleteUser, changePassword } = useUser();
  const [data, setData] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);

  // -- Table states
  const [filterdColumns, setFilterdColumns] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
    },
  });
  // -- Modal states
  const [visible, setVisible] = useState({
    delete: false,
    column: false,
    password: false,
  });

  // Init datas
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Хайлт хийх`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Хайх
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, selectedKeys, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Шинчлэх
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const changePasswrodModal = (value) => {
    setVisible((bv) => ({ ...bv, password: true }));
    setSelectedKey(value);
  };

  const handleChangePassowrd = async (values) => {
    const result = await changePassword(selectedKey, values);
    if (result) {
      handleCancel();
    }
  };

  const [columns, setColumns] = useState([
    {
      dataIndex: "status",
      key: "status",
      title: "Төлөв",
      status: true,

      filters: [
        {
          text: "Идэвхтэй",
          value: "true",
        },
        {
          text: "Идэвхгүй",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "memberShip",
      key: "memberShip",
      title: "Гишүүнчлэл",
      status: true,

      filters: [
        {
          text: "Гишүүнчлэлтэй",
          value: "true",
        },
        {
          text: "Гишүүн биш",
          value: "false",
        },
      ],
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "firstName",
      key: "firstName",
      title: "Нэр",
      status: true,
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "lastName",
      key: "lastName",
      title: "Овог",
      status: true,
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "email",
      key: "email",
      title: "Имэйл",
      status: true,
      ...getColumnSearchProps("email"),
      sorter: (a, b) => handleSort(),
    },

    {
      key: "keyPassword",
      title: "Нууц үг өөрчлөх",
      status: true,
      render: (text, record) => {
        return (
          <button
            className="changePasswordBtn"
            onClick={() => changePasswrodModal(record.key)}
          >
            Нууц үг солих
          </button>
        );
      },
    },

    {
      dataIndex: "age",
      key: "age",
      title: "Нас",
      status: false,
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "address",
      key: "address",
      title: "Хаяг",
      status: false,
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "picture",
      key: "picture",
      title: "Зураг",
      status: true,
      render: (text, record) => {
        // console.log(record);
        return (
          <div className="table-image">
            {record.picture ? (
              <img src={`${base.cdnUrl}/150x150/${record.picture}`} />
            ) : (
              "Зураг оруулаагүй байна"
            )}
          </div>
        );
      },
    },

    {
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      title: "Утасны дугаар",
      status: true,
      ...getColumnSearchProps("phoneNumber"),
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "gender",
      key: "gender",
      title: "Хүйс",
      status: false,

      filters: [
        {
          text: "male",
          value: "Эрэгтэй",
        },
        {
          text: "female",
          value: "Эмгэтэй",
        },
        {
          text: "other",
          value: "Бусад",
        },
      ],
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "role",
      key: "role",
      title: "Эрх",
      status: true,
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "startPlanDate",
      key: "startPlanDate",
      title: "Багц идэвхжүүлсэн огноо",
      status: true,
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "endPlanDate",
      key: "endPlanDate",
      title: "Багц  дуусах огноо",
      status: true,
      sorter: (a, b) => handleSort(),
    },

    {
      dataIndex: "createUser",
      key: "createUser",
      title: "Бүртгэсэн",
      status: true,

      ...getColumnSearchProps("createUser"),
      render: (text, record) => {
        return (
          record.createUser && <Tag color="#3c3c3c">{record.createUser}</Tag>
        );
      },
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateUser",
      key: "updateUser",
      title: "Өөрчлөлт хийсэн",
      status: false,
      ...getColumnSearchProps("updateUser"),
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "createAt",
      key: "createAt",
      title: "Үүсгэсэн огноо",
      status: true,
      sorter: (a, b) => handleSort(),
    },
    {
      dataIndex: "updateAt",
      key: "updateAt",
      title: "Өөрчлөлт хийсэн огноо",
      status: false,
      sorter: (a, b) => handleSort(),
    },
  ]);
  const [cloneColumns, setCloneColumns] = useState(columns);
  // Functions
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setQuerys((bquerys) => ({ ...bquerys, [dataIndex]: selectedKeys[0] }));
  };

  const handleEdit = () => {
    if (selectedRowKeys.length != 1)
      toastControl("error", "Нэг өгөгдөл сонгоно уу");
    else router.push(`/users/edit/${selectedRowKeys[0]}`);
  };

  const handleSort = () => {};

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination) {
      setQuerys((bq) => ({
        ...bq,
        page: pagination.current,
        limit: pagination.pageSize,
      }));
    }

    if (sorter) {
      const clkey = sorter.columnKey;
      setQuerys((bquery) => ({
        ...bquery,
        sort: `${clkey + ":" + sorter.order}`,
      }));
    } else {
      setQuerys((bquery) => {
        delete bquery.sort;
        return { ...bquery };
      });
    }

    if (filters) {
      Object.keys(filters).map((key) => {
        let str = null;
        if (filters[key]) {
          str = filters[key].toString();
          setQuerys((bq) => ({ ...bq, [key]: str }));
        } else {
          setQuerys((bq) => {
            delete bq[key];
            return { ...bq };
          });
        }
      });
      //
    }
  };

  const queryBuild = () => {
    let resultQuery = "";
    Object.keys(querys).map((key) => {
      key !== "select" && (resultQuery += `${key}=${querys[key]}&`);
    });
    if (querys.select && querys.select[0])
      resultQuery += `select=${
        querys &&
        querys.select &&
        querys.select[0].join(" ").replaceAll(",", " ")
      }`;
    return resultQuery;
  };

  // Handle Colmuns
  const handleColumn = (e) => {
    const newArr = [...cloneColumns];
    const checkElmt = newArr.findIndex((col) => col.key == e.target.name);
    const toggle = newArr[checkElmt].status === true ? false : true;
    newArr[checkElmt] = { ...newArr[checkElmt], status: toggle };
    setCloneColumns(() => [...newArr]);
  };

  const showModal = (modal) => {
    switch (modal) {
      case "delete": {
        if (selectedRowKeys && selectedRowKeys.length > 0) {
          setVisible((sb) => ({ ...sb, [modal]: true }));
        } else {
          toastControl("error", "Өгөгдөл сонгоно уу");
        }
        break;
      }
      case "edit": {
        if (selectedRowKeys && selectedRowKeys.length === 1) {
          router.push("/users/edit/" + selectedRowKeys[0]);
        } else {
          toastControl("error", "Нэг өгөгдөл сонгоно уу");
        }
        break;
      }
      default: {
        setVisible((sb) => ({ ...sb, [modal]: true }));
        break;
      }
    }
  };

  const handleCancel = () => {
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
  };

  const handleReset = (clearFilters, selectedKeys, dataIndex) => {
    clearFilters();
    setQuerys((bquery) => ({ ...bquery, [dataIndex]: "" }));
    setSearchText("");
  };

  const handleDelete = async () => {
    await deleteUser(selectedRowKeys);
    handleCancel();
    setSelectedRowKeys([]);
  };

  const refreshTable = async () => {
    setTableParams(() => ({
      ...{
        pagination: {
          current: 1,
        },
      },
    }));
    await loadUser();
    setSearchText(() => "");
    setSearchedColumn("");
  };

  // Useeffect
  useEffect(() => {
    setFilterdColumns(columns.filter((col) => col.status === true));
  }, [columns]);

  useEffect(() => {
    if (users) {
      const refData = [];

      Array.isArray(users) > 0 &&
        users.map((el) => {
          const key = el._id;
          delete el._id;
          el.status = el.status == true ? "Идэвхтэй" : "Идэвхгүй";
          el.memberShip =
            el.memberShip == true ? "Гишүүнчлэлтэй" : "Гишүүнчлэлгүй";
          el.createUser = el.createUser && el.createUser.firstName;
          el.updateUser = el.updateUser && el.updateUser.firstName;
          el.startPlanDate = moment(el.startPlanDate)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.endPlanDate = moment(el.endPlanDate)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.createAt = moment(el.createAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");
          el.updateAt = moment(el.updateAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss");

          refData.push({
            dataIndex: key,
            key,
            ...el,
          });
        });
      // console.log(refData);
      setData(refData);
    }
  }, [users]);

  useEffect(() => {
    if (pagination) {
      const total = pagination.total;
      const pageSize = pagination.limit;

      setTableParams((tbf) => ({
        ...tbf,
        pagination: { ...tbf.pagination, total, pageSize },
      }));
    }
  }, [pagination]);

  useEffect(() => {
    const fetcData = async (query) => {
      await loadUser(query);
    };
    if (querys) {
      const query = queryBuild();
      fetcData(query)
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [querys]);

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Гишүүд</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <div className="card card-body py-5 px-4">
          <div className="datatable-header-tools">
            <div className="datatable-actions">
              <Button
                onClick={() => router.push(`/users/add`)}
                className="datatable-action add-bg"
              >
                <i className="fa fa-plus"></i> Нэмэх
              </Button>
              <Button onClick={handleEdit} className="datatable-action edit-bg">
                <i className="fa fa-pencil"></i> Засах
              </Button>
              <Button
                className="datatable-action delete-bg"
                onClick={() => showModal("delete")}
              >
                <i className="fa fa-trash"></i>
                Устгах
              </Button>
            </div>
            <div className="datatable-tools">
              <Tooltip placement="left" title="Шинчлэх">
                <Button
                  className="datatable-tool"
                  onClick={() => refreshTable()}
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                </Button>
              </Tooltip>
              <Tooltip placement="left" title="Баганын тохиргоо">
                <Button
                  className="datatable-tool"
                  onClick={() => showModal("column")}
                >
                  <i className="fa-solid fa-table"></i>
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="tableBox">
            <Table
              size="small"
              rowSelection={rowSelection}
              columns={filterdColumns}
              dataSource={data}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
              loading={contentLoad}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        visible={visible && visible.column}
        title="Тохиргоо"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() => setColumns(cloneColumns)}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <table className="custom-table">
            <tr>
              <th>№</th>
              <th>Нэр</th>
              <th>Харагдах эсэх</th>
            </tr>
            {cloneColumns.map((col, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{col.title}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={col.status}
                    name={col.key}
                    onChange={handleColumn.bind()}
                  />{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Modal>
      {/* Delete modal */}
      <Modal
        visible={visible && visible.delete}
        title="Устгах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Болих
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            danger
            className="btn-danger"
            loading={contentLoad}
            onClick={() => handleDelete(cloneColumns)}
          >
            Устгах
          </Button>,
        ]}
      >
        <div className="tableBox">
          <p>
            {" "}
            Та нийт <b> {selectedRowKeys.length} </b> мэдээлэл сонгосон байна
            устгахдаа итгэлтэй байна уу? <br /> Хэрэв устгавал дахин сэргээх
            боломжгүйг анхаарна уу.{" "}
          </p>
        </div>
      </Modal>

      <Modal
        visible={visible && visible.password}
        title="Нууц үг солих"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleChangePassowrd(values);
                })
                .catch(() => {});
            }}
          >
            Шинэчлэх
          </Button>,
        ]}
      >
        <div className="tableBox">
          <Form layout="vertical" form={form}>
            <div className="col-12">
              <Form.Item
                label="Нууц үг оруулах"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Тус талбарыг заавал бөглөнө үү",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Нууц үгээ оруулна уу" />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item
                name="confirm"
                label="Нууц үгээ давтан оруулна уу"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Тус талбарыг заавал бөглөнө үү",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Эхний оруулсан нууц үгтэй тохирохгүй байна!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Нууц үгээ давтан оруулна уу" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Page;
