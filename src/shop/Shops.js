import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AddNewButton } from 'product/ProductListAddNew';
import { useUserData, shops2Array } from 'user/userUtils';

export const Shops = (props) => {
  const [userData, userDataLoading] = useUserData();
  const handleRemove = (shop) => () => {
    console.log('🛎 ', 'remove', shop);
  };
  const handleAdd = () => {
    console.log('🛎 ', 'add');
  };

  if (userDataLoading) return 'loading';

  const shops = shops2Array(userData.shops);

  return (
    <Box width={1}>
      <List disablePadding>
        {shops.map((shop) => (
          <ListItem key={shop.id}>
            <ListItemText>{shop.title}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton onClick={handleRemove(shop)} aria-label="remove">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddNewButton onClick={handleAdd}>Add shop (todo)</AddNewButton>
    </Box>
  );
};
