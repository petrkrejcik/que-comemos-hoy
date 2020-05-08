import React from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AddNewButton } from 'product/ProductListAddNew';
import { useUserData, shops2Array } from 'user/userUtils';
import { useHeader } from 'header/headerUtils';
import { Loading } from 'app/Loading';

export const ShopsList = (props) => {
  const classes = useStyles();
  const [userData, userDataLoading] = useUserData();
  const setHeader = useHeader(props.active);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  if (userDataLoading) return <Loading />;

  const shops = shops2Array(userData.shops);

  return (
    <>
      <List disablePadding>
        {shops.map((shop) => (
          <ListItem key={shop.id}>
            <ListItemText>
              <Link to={`/shops/${shop.id}`} className={classes.link}>
                <Button color="primary" className={classes.label}>
                  {shop.title}
                </Button>
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <AddNewButton to={`/shops/new`}>Add shop</AddNewButton>
    </>
  );
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
  link: {
    textDecoration: 'none',
  },
});
