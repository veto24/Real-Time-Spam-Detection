import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: 'flex',
    },
    messageRowRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    messageBox: {
      position: 'relative',
      marginRight: '20px',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#A8DDFD',
      width: '60%',
      textAlign: 'left',
      font: "400 .9em 'Open Sans', sans-serif",
      border: '1px solid #97C6E3',
      borderRadius: '10px',
      '&:after': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '15px solid #A8DDFD',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        top: '0',
        right: '-15px',
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '0',
        height: '0',
        borderTop: '17px solid #97C6E3',
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        top: '-1px',
        right: '-17px',
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
    },
    spamWarning: {
      margin: 0,
      padding: 0,
      alignSelf: 'center',
      color: '#ff5c5c ',
      fontSize: 12,
    },
  })
);

export type MessageProps = {
  content: string;
  isSpam: boolean;
};

export const Message = ({ content, isSpam = false }: MessageProps) => {
  const classes = useStyles();
  const [showSpam, setShowSpam] = useState(isSpam);

  // View the spam message
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setShowSpam(false);
  };

  // Blur message and show warning if message is a spam
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageBox}>
        <p
          className={classes.messageContent}
          style={showSpam ? { filter: 'blur(2px)' } : {}}>
          {content}
        </p>
        {showSpam && (
          <div className={classes.spamWarning} onClick={handleClick}>
            This message is a spam, click to view message
          </div>
        )}
      </div>
    </div>
  );
};
