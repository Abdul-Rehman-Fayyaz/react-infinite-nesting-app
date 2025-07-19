import defaults from "../utils/defaults";

const useLabels = (keys: Array<string>) => {
  const labelsData = {} as Record<string, string>;

  keys.forEach((key) => {
    labelsData[key] = defaults[key];
  });

  return labelsData;
};

export default useLabels;

export const getLabel = (key: string) => {
  return defaults[key];
};
