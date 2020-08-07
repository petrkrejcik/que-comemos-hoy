import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';

export const useCrud = (key, queryFn, options = {}) => {
  const history = useHistory();
  const showSnackbar = useSnackbar();

  return useQuery(key, queryFn, {
    enabled: false,
    cacheTime: 0,
    onSuccess: () => {
      history.goBack();
      showSnackbar({ message: 'Saved' });
    },
    onError: () => {
      showSnackbar({ message: 'Error during saving' });
    },
    ...options,
  });
};
