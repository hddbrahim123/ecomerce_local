import React, { Fragment } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from 'array-move';

const ListSortable = ({items,onSortEndHandler,element}) => {

  const SortableItem = SortableElement((props) => element(props));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items
          .sort((a, b) => a.position - b.position)
          .map((value, index) => (
            <SortableItem value={value} index={index} key={index} />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMoveImmutable(items, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    onSortEndHandler(arr, oldIndex, newIndex);
    //setListData(arr);
  };

  return (
      <Fragment>
        {/* <div>{JSON.stringify(items)}</div> */}
        <SortableList items={items} onSortEnd={onSortEnd} distance={1} axis="xy" />
      </Fragment>
  );
};

export default ListSortable;
