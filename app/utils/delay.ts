export const delay = async (ms = 2000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}