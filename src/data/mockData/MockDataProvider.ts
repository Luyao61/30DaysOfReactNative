import { IAppConfig } from "./IAppMetadata";

const BATCH = 25;

export const generateBacthOfApp = (counter: number) => {
  const batchOfApps: IAppConfig[] = [];
  for (let i = 0; i < BATCH; i++) {
    batchOfApps.push({
      id: `id-${counter + i + 1}`,
      name: `APP #${counter + i + 1}`,
    });
  }
  return batchOfApps;
};
