import React from 'react';
import { useQuery } from 'react-query';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';
import slugify from 'slugify';
import { MenuItem } from '@material-ui/core';

export const useSave = ({ variantId, title, rating, shop, price }, oldVariant) => {
  const db = useFirestore();
  const user = useUser();
  const { productId } = useParams();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const shops = oldVariant.shops || {};

  return useQuery(
    ['saveProductVariant', { productId }],
    async (key, { productId }) => {
      variantId = variantId || slugify(title, { lower: true });
      await db.doc(`userGroups/${user.groupId}/ingredients/${productId}`).update({
        [`variants.${variantId}`]: {
          title,
          rating: rating ? parseFloat(rating) : null,
          ...(shop && { shops: { ...shops, [shop]: { price } } }),
        },
      });
    },
    {
      enabled: false,
      onSuccess: () => {
        history.goBack();
        showSnackbar({ message: 'Saved' });
      },
    }
  );
};
