import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AddNewButton } from 'product/ProductListAddNew';

export const Shops = (props) => {
  const handleRemove = (shop) => () => {
    console.log('🛎 ', 'remove', shop);
  };
  const handleAdd = () => {
    console.log('🛎 ', 'add');
  };

  return (
    <List>
      {props.shops.map((shop) => (
        <ListItem key={shop.id}>
          <ListItemText>{shop.title}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={handleRemove(shop)} aria-label="remove">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <AddNewButton onClick={handleAdd}>Add shop (todo)</AddNewButton>
    </List>
  );
};
