import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { add, update, remove } from 'member/memberUtils';

export const Member = (props) => {
  const history = useHistory();
  const { memberId } = useParams();
  // const classes = useStyles();
  const setHeader = useHeader(props.active);
  const [email, setEmail] = React.useState('');
  const [titleError, setTitleError] = React.useState(null);
  const { userState, globalActions } = React.useContext(globalStateContext);
  const [user] = userState;
  const [member, setMember] = React.useState(null);

  useEffect(() => {
    if (!memberId) return;
    const member = props.members.find((m) => m.id === memberId);
    if (!member) return;
    setMember(member);
    setEmail(member.email);
  }, [memberId, setEmail, props.members]);

  const [{ loading: loadingSave }, handleUpdate] = useAsyncFn(async () => {
    await update(member, user, { email });
    history.goBack();
  }, [user, member, history, email]);

  const [{ loading: loadingAdd }, handleAdd] = useAsyncFn(async () => {
    await add(user, email);
    history.goBack();
  }, [user, member, history, email]);

  const [{ loading: loadingRemove }, handleRemove] = useAsyncFn(async () => {
    await remove(member, user);
    history.goBack();
  }, [member, user]);

  useEffect(() => {
    const buttons = {
      left: {
        icon: 'close',
        action: () => history.push('/members'),
      },
    };
    if (member) {
      buttons.menu = [{ title: 'Remove', action: handleRemove }];
    } else {
      buttons.right = [
        {
          title: 'Save',
          action: member ? handleUpdate : handleAdd,
        },
      ];
    }
    setHeader(buttons);
  }, [handleUpdate, handleAdd, handleRemove, history, setHeader, member]);

  const handleTitleChange = (event) => {
    setTitleError(null);
    const newTitle = event.target.value;
    setEmail(newTitle);
    // const exists = userData.shops.find((p) => p.email === newTitle);
    // exists && setTitleError('Already exists');
    newTitle.trim() === '' && setTitleError('Cannot be empty');
  };

  if (loadingSave || loadingAdd || loadingRemove) return <Loading />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitleInput
          title={email}
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
    label="Email"
    error={!!props.titleError}
    helperText={props.titleError}
    onChange={props.handleTitleChange}
    onFocus={() => props.focusInput(true)}
    onBlur={() => props.focusInput(false)}
    fullWidth
  />
);

// const useStyles = makeStyles({});
