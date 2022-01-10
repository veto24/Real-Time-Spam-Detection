import { createStyles, makeStyles } from '@mui/styles';
import { Paper, Theme, Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/SendRounded';
import { Message, MessageProps } from './Message';
import { ChangeEvent, useState, FormEvent } from 'react';
import fetchIsSpam from './IsSpam';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '80vw',
      height: '80vh',
      maxWidth: '500px',
      maxHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#383838',
    },
    messagesBody: {
      width: 'calc( 100% - 20px )',
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',
    },
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `auto`,
    },
    wrapText: {
      width: '100%',
    },
  })
);

const App = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState<string>('');

  const handleChange = (e: ChangeEvent<any>) => setInput(e.target.value);

  // Append message to messages after fetching to server if the message is spam
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input) {
      const isSpam = await fetchIsSpam(input);
      setMessages([...messages, { content: input, isSpam }]);
      setInput('');
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant='h4' gutterBottom color='white'>
        Real Time Spam Detection
      </Typography>
      <Paper className={classes.paper}>
        <Paper id='style-1' className={classes.messagesBody}>
          {messages.map((msg: MessageProps, index) => (
            <Message {...msg} key={index} />
          ))}
        </Paper>
        <form className={classes.wrapForm} onSubmit={handleSubmit}>
          <TextField
            autoComplete='off'
            value={input}
            onChange={handleChange}
            id='standard-text'
            label='Enter Message'
            className={classes.wrapText}
          />
          <Button variant='contained' color='primary' type='submit'>
            <SendIcon />
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default App;
