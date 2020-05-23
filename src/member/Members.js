import React from 'react';
import { Box, Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { useColData } from 'storage/firebase';
import { Swipeable } from 'app/Swipeable';
import { Member } from 'member/Member';
import { MembersList } from 'member/MembersList';
import { useUser } from 'user/userUtils';
import { Loading } from 'app/Loading';
import { useFirestore } from 'storage/firebase';

const PAGES = {
  list: 0,
  detail: 1,
};

const options = {
  idField: 'id',
};

export const Members = (props) => {
  // const classes = useStyles();
  const { memberId } = useParams();
  const location = useLocation();
  const user = useUser();
  const db = useFirestore();

  const query = db.collection(`users`).where('groupId', '==', user.groupId);
  const [members, loading, error] = useColData(query, options);

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
        <Container>
          <MembersList members={members} active={getIndex() === PAGES.list} />
        </Container>
        <Container>
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
