import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { useUserData } from 'user/userUtils';
import { addShop, updateShop, removeShop } from 'shop/shopUtils';

export const Shop = (props) => {
  const history = useHistory();
  const { shopId } = useParams();
  // const classes = useStyles();
  const setHeader = useHeader(props.active);
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(null);
  const { userState, globalActions } = React.useContext(globalStateContext);
  const [user] = userState;
  const [userData, userDataLoading] = useUserData();
  const [shop, setShop] = React.useState(null);

  useEffect(() => {
    if (userDataLoading) return;
    if (!shopId) return;
    const shop = userData.shops[shopId];
    if (!shop) return;
    setShop({ ...shop, id: shopId });
    setTitle(shop.title);
  }, [userData, shopId, userDataLoading, setTitle]);

  const [{ loadingSave }, handleUpdate] = useAsyncFn(async () => {
    await updateShop(shop, user, { title });
    history.goBack();
  }, [user, shop, history, title]);

  const [{ loadingAdd }, handleAdd] = useAsyncFn(async () => {
    await addShop(user, title);
    history.goBack();
  }, [user, shop, history, title]);

  const [{ loading: loadingRemove }, handleRemove] = useAsyncFn(async () => {
    await removeShop(shop, user);
    history.goBack();
  }, [shop, user]);

  useEffect(() => {
    const buttons = {
      left: {
        icon: 'close',
        action: () => history.push('/shops'),
      },
      right: [
        {
          title: 'Save',
          action: shop ? handleUpdate : handleAdd,
        },
      ],
    };
    if (shop) {
      buttons.menu = [{ title: 'Remove', action: handleRemove }];
    }
    setHeader(buttons);
  }, [handleUpdate, handleAdd, handleRemove, history, setHeader, shop]);

  const handleTitleChange = (event) => {
    setTitleError(null);
    const newTitle = event.target.value;
    setTitle(newTitle);
    // const exists = userData.shops.find((p) => p.title === newTitle);
    // exists && setTitleError('Already exists');
    newTitle.trim() === '' && setTitleError('Cannot be empty');
  };

  if (userDataLoading || loadingSave || loadingAdd || loadingRemove) return <Loading />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitleInput
          title={title}
          titleError={titleError}
          handleTitleChange={handleTitleChange}
          focusInput={globalActions.focusInput}
        />
      </Grid>
    </Grid>
  );
};

const TitleInput = (props) => (
  <TextField
    value={props.title}
    label="Shop"
    error={!!props.titleError}
    helperText={props.titleError}
    onChange={props.handleTitleChange}
    onFocus={() => props.focusInput(true)}
    onBlur={() => props.focusInput(false)}
    fullWidth
  />
);

// const useStyles = makeStyles({});
