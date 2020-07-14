import React from 'react';
import { Box, Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { Swipeable } from 'app/Swipeable';
import { Shop } from 'shop/Shop';
import { ShopsList } from 'shop/ShopsList';
import { Shell } from 'app/Shell';

const PAGES = {
  list: 0,
  detail: 1,
};

export const Shops = (props) => {
  // const classes = useStyles();
  const { shopId } = useParams();
  const location = useLocation();

  const getIndex = () => {
    if (location === '/shops/new') return PAGES.detail;
    if (shopId) return PAGES.detail;
    return PAGES.list;
  };

  return (
    <Shell>
      <Box width={1}>
        <Swipeable index={getIndex()}>
          <Container index={PAGES.list}>
            <ShopsList active={getIndex() === PAGES.list} />
          </Container>
          <Container index={PAGES.detail}>
            <Shop active={getIndex() === PAGES.detail} />
          </Container>
        </Swipeable>
      </Box>
    </Shell>
  );
};

// const useStyles = makeStyles({
//   label: {
//     textTransform: 'none',
//     justifyContent: 'flex-start',
//   },
//   link: {
//     textDecoration: 'none',
//   },
// });
