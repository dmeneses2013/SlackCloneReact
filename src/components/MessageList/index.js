// @flow
import React, { useRef, Component } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import Message from '../Message';
import './index.scss';

type MessageType = {
  id: number,
  inserted_at: string,
}

type Props = {
  messages: Array<MessageType>,
}

class MessageList extends Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.checkShouldScroll();
  }

  checkShouldScroll = () => {
    if (!this.stayScrolledElem) { return }
    var a = this.stayScrolledElem.scrollTop
    var b = this.stayScrolledElem.scrollHeight - this.stayScrolledElem.clientHeight;
    var c = a / b;
    let shouldScroll = (c > 0.90)
    if (shouldScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }

  renderMessages = messages =>
    messages.map(message => <Message key={message.id} message={message} className={"day-message"}/>);


  renderDays() {
    const { messages } = this.props;
    messages.map(message => message.day = moment(message.inserted_at).format('MMMM Do'));
    const dayGroups = groupBy(messages, 'day');
    const days = [];
    mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value });
    });
    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');
    return days.map(day =>
      <div key={day.date} className={"day-section"}>
        <div className={"day-subsection"}>
        <div className={"daydivider"}>
          <span className={"daytext"}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {![today, yesterday].includes(day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={"messages-container"} ref={c => { this.stayScrolledElem = c; }}>
      <div className={"inner"}>
        {this.renderDays()}
        <div
            ref={(el) => { this.messagesEnd = el; }}
            className={"message-end"}
             >
        </div>
        </div>
      </div>
    );
  }
}

export default MessageList;
