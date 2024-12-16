export const checkInput = (entries) => {
  var errors = [];

  entries.forEach((entry) => {
    if (entry.condition) errors.push(entry.result);
  });

  return errors.length != 0 ? errors : null;
};

export default checkInput;
