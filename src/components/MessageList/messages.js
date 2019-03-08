days.map(day =>
<div className={"inner"}>
<div key={day.date} className={"messages-list"} ref={c => { this.stayScrolledElem = c; }}>
  <div className={"daydivider"}>
    <span className={"daytext"}>
      {day.date === today && 'Today'}
      {day.date === yesterday && 'Yesterday'}
      {![today, yesterday].includes(day.date) && day.date}
    </span>
  </div>
  {this.renderMessages(day.messages)}
  <div style={{ float:"left", clear: "both" }}
       ref={(el) => { this.messagesEnd = el; }}>
  </div>
  </div>
</div>
