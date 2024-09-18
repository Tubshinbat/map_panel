"use client";
import { Button, Form, Input, Modal, Switch, Tree, message } from "antd";
import PageNavItem from "components/Page/PageNavItem";
import { useNotificationContext } from "context/notificationContext";
import useCity from "hooks/useCity";
import { menuGenerateData } from "lib/menuGenerate";
import { toastControl } from "lib/toastControl";
import { useEffect, useState } from "react";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const { contentLoad } = useNotificationContext();
  // STATES
  const [gData, setGData] = useState([]);
  const [visible, setVisible] = useState({
    edit: false,
    add: false,
    delete: false,
    parent: false,
  });
  const { cities, getAllData, changePosition } = useCity();

  const init = async () => {
    await getAllData();
  };

  const clear = () => {
    form.resetFields();
  };

  useEffect(() => {
    (async () => {
      await init();
    })();
    return () => clear();
  }, []);

  useEffect(() => {
    if (cities) {
      setGData(menuGenerateData(cities));
    }
  }, [cities]);

  const onDrop = async (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    const sendData = {
      data: data,
    };
    await changePosition(sendData);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Хот/Аймаг дэс дараалал</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="content">
        <div className="container-fluid">
          <div className="card card-body page-nav-body py-3">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="d-sm-flex align-items-center justify-space-between">
                  <nav className="page-nav ">
                    <PageNavItem label="Хот/Аймаг" link="/city-province" />
                    <PageNavItem
                      label="Дэс дараалал"
                      link="/city-province/position"
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card ">
                <div className="card-body">
                  <Tree
                    className="draggable-tree tree-style custom-tree"
                    // defaultExpandedKeys={expandedKeys}
                    draggable
                    blockNode
                    onDrop={onDrop}
                    treeData={gData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category */}
    </>
  );
};

export default Page;
