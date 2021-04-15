export const normalizeJsonArray = (arr: any[]) => {
  return arr.map((obj: any) => normalizeJson(obj));
}

export const normalizeJson = (obj: any) => {
  return JSON.parse(JSON.stringify({...obj}));
}