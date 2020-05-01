import React from 'react';
import { Box, Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { db, useColData } from 'storage/firebase';
import { Swipeable } from 'app/Swipeable';
import { Member } from 'member/Member';
import { MembersList } from 'member/MembersList';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';

const PAGES = {
  list: 0,
  detail: 1,
};

export const Members = (props) => {
  // const classes = useStyles();
  const { memberId } = useParams();
  const location = useLocation();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;

  const query = db.collection(`users`).where('groupId', '==', user.groupId);
  const [members, loading, error] = useColData(query, {
    idField: 'id',
  });

  if (loading) return <Loading />;
  if (error) return 'error loading users';

  const getIndex = () => {
    if (location === '/members/new') return PAGES.detail;
    if (memberId) return PAGES.detail;
    return PAGES.list;
  };

  return (
    <Box width={1}>
      <Swipeable index={getIndex()}>
        <Container index={PAGES.list}>
          <MembersList members={members} active={getIndex() === PAGES.list} />
        </Container>
        <Container index={PAGES.detail}>
          <Member members={members} active={getIndex() === PAGES.detail} />
        </Container>
      </Swipeable>
    </Box>
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
