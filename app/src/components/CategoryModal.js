import React, { Component } from "react";
import { Modal, Collapse } from "antd";
import { StarFilled } from "@ant-design/icons";

const { Panel } = Collapse;

//function to render the actual collapsible item
const renderPanel = (item) => {
  return (
    <Panel
      header={item.name}
      disabled={!item.available ? true : false}
      extra={item.featured ? <StarFilled style={{ color: "#00cc76" }} /> : null}
      key={item.id}
    >
      {item.description ? (
        <p>{item.description}</p>
      ) : (
        <p>Just a simple {item.name}</p>
      )}
    </Panel>
  );
};

export default function CategoryModal(props) {
  return (
    <Modal
      title={props.name}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      footer={null}
      style={{
        textAlign: "center",
      }}
    >
      {/* if category has items, map over them and display them */}
      {props.items.length > 0 && (
        <Collapse>{props.items.map((item) => renderPanel(item))}</Collapse>
      )}

      {/* if category has sub categories, map over them and display them */}
      {props.childCategories.length > 0 && (
        <Collapse bordered={true}>
          {props.childCategories.map((category) => (
            <Panel header={category.name} key={category.id}>
              <Collapse>
                {/* map over items in sub categories and display them */}
                {category.items.map((item) => renderPanel(item))}
              </Collapse>
            </Panel>
          ))}
        </Collapse>
      )}
    </Modal>
  );
}
