export const useCloneDeep = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
