import { IAppConfig } from "./IAppMetadata";

const BATCH = 40;

export const generateBacthOfApp = (counter: number) => {
  const batchOfApps: IAppConfig[] = [...retrieveAppData()];
  for (let i = batchOfApps.length; i < BATCH; i++) {
    batchOfApps.push({
      id: `id-${counter + i + 1}`,
      name: `APP #${i + 1}`,
      route: "BlankPage",
    });
  }
  return batchOfApps;
};

export const retrieveApps = (counter: number) => {
  return new Promise<IAppConfig[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(generateBacthOfApp(counter));
    }, 1500);
  });
};

export const retrieveAppData = () => {
  const apps: IAppConfig[] = [
    {
      id: "Day1-id",
      name: "Day 1",
      route: "Day1",
    },
  ];
  return apps;
};
