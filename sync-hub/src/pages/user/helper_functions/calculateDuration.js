function calculateDuration(param, created=true) {
 

  let flag = param.indexOf("T");
  let char;
  if (created) {
    char = param.split("")
    let flag2 = param.indexOf(":")
    let hr = (parseInt(param.slice(flag+1, flag2)) + 1).toString()
    hr = hr.length === 1 ? hr.padStart(2, 0) : hr
    char[flag+1] = hr[0]
    char[flag2-1] = hr[1]
    param = char.join("")
  }
  let today = new Date();
  let currentTime = [today.getHours(), today.getMinutes()];
  
  let currentDate = [
    today.getDate(),
    today.getMonth() + 1,
    today.getFullYear(),
  ];
  // alert(currentDate)
  let createdDate = param
    .slice(0, flag)
    .split("-")
    .reverse()
    .map((item) => parseInt(item));
  let createdTime = param
    .slice(flag + 1, flag + 6)
    .split(":")
    .map((item) => parseInt(item));

  let days = currentDate[0] - createdDate[0];
  // alert(days)
  let months = currentDate[1] - createdDate[1];
  let years = currentDate[2] - createdDate[2];

  if (years === 0 && months >= 1) {
    return months > 1 ? `${months} months ago` : "last month";
  } else if (years === 0 && months === 0 && days > 0) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  } else if (years === 0 && months === 0 && days === 0) {
    if (
      currentTime[0] - createdTime[0] < 0 ||
      (currentTime[0] - createdTime[0] === 0 &&
        currentTime[1] - createdTime[1] < 1)
    ) {
      return "active";
    } else if (
      currentTime[0] - createdTime[0] === 1 &&
      currentTime[1] - createdTime[1] < 1
    ) {
      return currentTime[1] + createdTime[1] > 1
        ? `${currentTime[1] + (60 - createdTime[1])} minutes ago`
        : `${currentTime[1] + createdTime[1]} minute ago`;
    } else if (
      (currentTime[0] - createdTime[0]) * 60 >
      currentTime[1] - createdTime[1]
    ) {
      return currentTime[0] - createdTime[0] > 1
        ? `${currentTime[0] - createdTime[0]} hours ago`
        : "1 hour ango";
    } else if (currentTime[0] - createdTime[0] === 0) {
      return currentTime[1] - createdTime[1] > 1
        ? `${currentTime[1] - createdTime[1]} minutes ago`
        : "1 minute ago";
    } else {
      return currentTime[1] - createdTime[1] > 1
        ? `${currentTime[0] - createdTime[0]} minutes ago`
        : "1 minute ago";
    }
  } else if ((years >= 1 && months === 0) || (years > 1 && months < 1)) {
    return years > 1 ? `${years} years ago` : `${years} year ago`;
  } else if (years === 1 && months < 1) {
    return 12 - createdDate[1] + currentDate[1] > 1
      ? `${12 - createdDate[1] + currentDate[1]} months ago`
      : "last month";
  } else if (years >= 1 && months >= 1) {
    return years > 1 ? `${years} years ago` : `${years} year ago`;
  } else {
    return "active";
  }
}

export default calculateDuration;
