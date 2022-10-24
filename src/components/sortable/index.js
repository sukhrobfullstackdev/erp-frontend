import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { Col, Row } from "react-grid-system";
import { connect } from "react-redux";
import { get } from "lodash";
import Actions from "../../modules/academy/actions";
import { toast } from "react-toastify";

const Style = styled.div`
  width: 100%;
`;
const Sortable = ({ data = [], Item = () => {}, colSize = 3, changeOrderRequest, ...rest }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(data);
  }, [data]);

  const SortableItem = SortableElement(({ value }) => <Item item={value} />);

  const SortableList = SortableContainer(({ items }) => {
    return (
      <Row>
        {items.map((item, index) => (
          <Col xs={colSize} key={`item-${index}`} className={"sortable-list-col"}>
            <SortableItem index={index} value={item} />
          </Col>
        ))}
      </Row>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const id = get(items, `[${oldIndex}].id`, null);
    let top = get(items, `[${newIndex}].orderIndex`, null);
    let bottom = get(items, `[${newIndex + 1}].orderIndex`, null);

    if (newIndex < oldIndex) {
      top = get(items, `[${newIndex - 1}].orderIndex`, null);
      bottom = get(items, `[${newIndex}].orderIndex`, null);
    }

    if (newIndex == 0) top = null;

    if (newIndex + 1 >= items.length) bottom = null;

    setItems((items) => arrayMoveImmutable(items, oldIndex, newIndex));
    changeOrderRequest({
      attributes: { id, top, bottom },
      formMethods: {},
      cb: {
        success: ({ message = "SUCCESS" }) => {
          toast.success(message);
        },
        fail: () => {},
      },
    });
  };

  return (
    <Style {...rest}>
      <SortableList pressDelay={200} lockToContainerEdges={false} axis="xy" items={items} onSortEnd={onSortEnd} />
    </Style>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeOrderRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: Actions.CHANGE_ORDER.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "changeOrderUrl"),
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sortable);
