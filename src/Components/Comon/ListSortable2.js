import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from 'array-move';

const ListSortable2 = ({items,items2,onSortEndHandler,onSortEndHandler2,element,element2}) => {

  const SortableItem = SortableElement(element);

  const SortableList = SortableContainer(({ items,items2 }) => {
    return (
      <div>
        {items
          .sort((a, b) => a.position - b.position)
          .map((value, index) => (
            <SortableItem value={value} index={index} key={value.id} />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMoveImmutable(items, oldIndex, newIndex);
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i].position = i;
    // }
    onSortEndHandler(arr, oldIndex, newIndex);
    //setListData(arr);
  };

  return (
      <SortableList items={items} items2={items2} onSortEnd={onSortEnd} distance={1} axis="xy" />
  );
};

export default ListSortable2;
