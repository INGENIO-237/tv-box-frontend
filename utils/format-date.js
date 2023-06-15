const formatDate = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};

module.exports = formatDate;
