import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { AppIconProps, AppIcon } from "./AppIcon";
import { IAppMetadata } from "../data/IAppMetadata";
import { RefreshControl } from "react-native";

const BATCH = 25;

export function AppList() {
  const [appData, setAppData] = React.useState<IAppMetadata[]>([]);
  const [pullCounter, setPullCounter] = React.useState<number>(0);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  React.useEffect(setInitialBacthOfApp(pullCounter, setAppData), []);
  const onRefresh = React.useCallback(() => {
    refreshAppData(pullCounter, setPullCounter, setRefreshing, setAppData);
  }, []);
  return (
    <FlatList
      data={appData}
      renderItem={renderAppIcon}
      keyExtractor={(item) => item.id}
      numColumns={3}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    ></FlatList>
  );
}

const renderAppIcon = ({ item }: { item: IAppMetadata }) => {
  const appIconProps: AppIconProps = {
    id: item.id,
    name: item.name,
    color: item.color,
  };
  return <AppIcon {...appIconProps}></AppIcon>;
};

const setInitialBacthOfApp = (
  counter: number,
  setAppData: React.Dispatch<React.SetStateAction<IAppMetadata[]>>
) => {
  return () => {
    setAppData(generateBacthOfApp(counter));
  };
};

const generateBacthOfApp = (counter: number) => {
  const batchOfApps: IAppMetadata[] = [];
  for (let i = 0; i < BATCH; i++) {
    batchOfApps.push({
      id: `id-${counter + i + 1}`,
      name: `APP #${counter + i + 1}`,
    });
  }
  return batchOfApps;
};

async function refreshAppData(
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  setAppData: React.Dispatch<React.SetStateAction<IAppMetadata[]>>
) {
  setRefresh(true);
  setCounter(counter + 1);
  const loadAppPromise = new Promise<IAppMetadata[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(generateBacthOfApp(counter));
    }, 5000);
  });
  const apps = await loadAppPromise;
  setRefresh(false);
  setAppData(apps);
}
