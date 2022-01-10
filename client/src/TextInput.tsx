import { TextField, Button, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/SendRounded';
import { ChangeEventHandler } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `auto`,
    },
    wrapText: {
      width: '100%',
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

type TextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

const TextInput = ({ value, onChange }: TextInputProps) => {
  const classes = useStyles();
  return (
    <form className={classes.wrapForm} noValidate autoComplete='off'>
      <TextField
        value={value}
        onChange={onChange}
        id='standard-text'
        label='Enter Message'
        className={classes.wrapText}
      />
      <Button variant='contained' color='primary' className={classes.button}>
        <SendIcon />
      </Button>
    </form>
  );
};

export default TextInput;
