export const sleepAsync = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const sleepFor = (sleepDuration: number) => {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {}
};
