export const formatDate = (date:Date) => {
  const newDate = new Date(date);
  return newDate.toDateString()
};
