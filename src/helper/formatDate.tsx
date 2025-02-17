const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleString('en-US');
};

export default formatDate;
