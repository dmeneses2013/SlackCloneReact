import MessageList from '../MessageList';
import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import useStayScrolled from 'react-stay-scrolled';

const Messages = ({ messages }) => {
  const listRef = useRef();
  const { stayScrolled, scrollBottom } = useStayScrolled(listRef);

  // Typically you will want to use stayScrolled or scrollBottom inside
  // useLayoutEffect, because it measures and changes DOM attributes (scrollTop) directly
  useLayoutEffect(() => {
    stayScrolled();
  }, [messages.length])

  return (
    <div ref={listRef}>
      <MessageList />
    </div>
  );
};

export default Messages;
