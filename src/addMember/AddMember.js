import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { db } from 'storage/firebase';
import { userContext } from 'user/UserProvider';

export const AddMember = () => {
  const [email, setEmail] = React.useState('');
  const [{ user }, { setUser }] = React.useContext(userContext);

  const addMember = async () => {
    const query = await db.collection('users').where('email', '==', email).limit(1).get();
    if (query.empty) {
      alert('Email not found');
      return;
    }
    const member = query.docs[0].data();
    const batch = db.batch();
    batch.update(db.collection('users').doc(member.id), {
      [`members.${user.id}`]: true,
    });
    batch.update(db.collection('users').doc(user.id), {
      [`members.${member.id}`]: true,
    });
    batch.commit();
    setUser({
      // TODO: await and if OK then do this
      ...user,
      members: {
        ...user.members,
        [member.id]: true,
      },
    });
  };

  return (
    <>
      <TextField onChange={(e) => setEmail(e.target.value)} placeholder="email" value={email} />
      <Button
        onClick={addMember}
        color="secondary"
        variant="outlined"
        disabled={email.trim() === ''}
      >
        Save
      </Button>
    </>
  );
};
