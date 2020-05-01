import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { AddNewButton } from 'product/ProductListAddNew';
import { useHeader } from 'header/headerUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const MembersList = (props) => {
  const classes = useStyles();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const setHeader = useHeader(props.active);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleRemove = (shop) => () => {
    console.log('🛎 ', 'edit', shop);
  };

  return (
    <>
      <List disablePadding>
        {props.members
          .filter((member) => member.originalGroupId !== user.originalGroupId)
          .map((member) => (
            <ListItem key={member.id}>
              <ListItemText>
                <Link to={`/members/${member.id}`} className={classes.link}>
                  <Button color="primary" className={classes.label}>
                    {member.email}
                  </Button>
                </Link>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={handleRemove(member)} aria-label="remove">
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <AddNewButton to={`/members/new`}>Add member</AddNewButton>
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
