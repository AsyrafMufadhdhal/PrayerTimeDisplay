export const formatDate = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
};
