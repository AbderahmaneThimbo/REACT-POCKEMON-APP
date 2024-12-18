const formaDate = (date: Date = new Date()): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default formaDate;
