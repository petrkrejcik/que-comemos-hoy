import React from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { useCrud } from 'itemDetail/itemDetailHooks';

export const ItemDetail = (props) => {
  const history = useHistory();
  const [saveOptions, setSaveOptions] = React.useState();
  const form = useForm({ defaultValues: props.defaultValues });
  const { handleSubmit, getValues, setValue, reset, formState } = form;
  const { dirty } = formState;
  const setHeader = useHeader(props.active);
  // const { globalActions } = React.useContext(globalStateContext);
  const { refetch: save, isLoading: isSaving } = useCrud(
    `${props.queryKey}Upsert`,
    props.handleSave(getValues(), props.defaultValues.id),
    saveOptions
  );
  const { refetch: remove, isLoading: isRemoving } = useCrud(
    `${props.queryKey}Remove`,
    props.handleRemove(props.defaultValues.id)
  );

  React.useEffect(() => {
    setHeader({
      left: {
        icon: 'back',
        action: history.goBack,
      },
      right: [
        {
          title: 'Save',
          action: handleSubmit(save),
        },
      ],
      ...(props.defaultValues.id && { menu: [{ title: 'Remove', action: remove }] }),
    });
    if (!props.active) {
      // reset to empty
      reset();
    }
  }, [save, setHeader, props.active, handleSubmit, reset, history.goBack, remove, props.defaultValues.id]);

  React.useEffect(() => {
    if (!props.active) return;
    if (dirty) return;
    Object.keys(props.defaultValues).forEach((key) => setValue(key, props.defaultValues[key]));
  }, [props.active, props.defaultValues, setValue, dirty]);

  if (isSaving || isRemoving) {
    return <Loading />;
  }

  return (
    <Grid container spacing={3}>
      {React.Children.map(props.renderFields({ ...form, handleSave: handleSubmit(save) }), (child) => (
        <Grid item xs={12} key={child.props.name}>
          {React.cloneElement(child, {
            setSaveOptions: (options) => {
              setSaveOptions(options);
              handleSubmit(save)();
            },
          })}
        </Grid>
      ))}
    </Grid>
  );
};
