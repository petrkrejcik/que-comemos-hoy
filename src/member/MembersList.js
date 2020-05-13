import React from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { AddNewButton } from 'product/ProductListAddNew';
import { useHeader } from 'header/headerUtils';
import { userContext } from 'user/UserProvider';

export const MembersList = (props) => {
  const classes = useStyles();
  const [{ user }] = React.useContext(userContext);
  const setHeader = useHeader(props.active);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

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
