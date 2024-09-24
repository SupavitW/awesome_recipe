import React, { useEffect } from 'react';
import styles from './ShoppingListTab.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { getShoppingList, deleteFromShoppingList, clearShoppingList } from '../../../slices/shoppingList/shoppingListAPI';

export default function ShoppingListTab() {
  const dispatch = useDispatch();
  // Access the shopping list from the Redux store
  const { items } = useSelector((state) => state.shoppingList);

  const handleDelete = (id) => {
    dispatch(deleteFromShoppingList(id)).then(() => {
      dispatch(getShoppingList());
    });
  }

  const handleDeleteAll = () => {
    dispatch(clearShoppingList()).then(() => {
      dispatch(getShoppingList());
    })
  }

  useEffect(() => {
    dispatch(getShoppingList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.shoppingList_container}>
        <div className={styles.shoppingList_header}>
          <h2>My Shopping List</h2>
        </div>
        {items.length > 0 && (
        <div className={styles.deleteAll}>
          <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>Delete All</button>
        </div>)}
        <div className={styles.alignLeft}>
          {items.length === 0 ? <p className={styles.noItem}>Your Shopping List is Empty</p> : (
            <ul className={styles.shoppingList_content}>
              {items.map((item) => (
                <li key={item.id} className={styles.shoppingList_item}>
                  <div className={styles.item_info}>
                    <p>{item.title}</p>
                    <p>{item.measurements.quantity}</p>
                    <p>{item.measurements.unit}</p>
                  </div>
                  <button className={styles.shoppingList_deleteBtn} onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
