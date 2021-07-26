export const formatTime = (time: number) => {
  return time.toString().length !== 2 ? `0${time}` : time;
};
