import moment from "moment";

const formatTimestamp = (timestamp) => {
  const now = moment();
  const messageTime = moment(timestamp);

  if (now.diff(messageTime, "days") === 0) {
    // If the message was sent today, show only the time
    return messageTime.format("LT");
  } else if (now.diff(messageTime, "days") === 1) {
    // If the message was sent yesterday, show 'Yesterday'
    return "Yesterday";
  } else {
    // Otherwise, show the date
    return messageTime.format("L");
  }
};

export default formatTimestamp