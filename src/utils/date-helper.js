const prepareForOutput = date => date.toISOString().substring(0, 10);
const prepareForRequest = dateStr => dateStr.replace(/-/g, "");

export { prepareForOutput, prepareForRequest };
