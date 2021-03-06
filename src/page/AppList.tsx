import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { AppIconProps, AppIcon } from "./AppIcon";
import { IAppConfig } from "../data/mockData/IAppMetadata";
import { RefreshControl } from "react-native";
import {
  generateBacthOfApp,
  retrieveApps,
} from "../data/mockData/MockDataProvider";

export function AppList() {
  const [appData, setAppData] = React.useState<IAppConfig[]>([]);
  const [pullCounter, setPullCounter] = React.useState<number>(0);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  React.useEffect(setInitialBacthOfApp(pullCounter, setAppData), []);
  const onRefresh = React.useCallback(() => {
    refreshAppData(pullCounter, setPullCounter, setRefreshing, setAppData);
  }, [pullCounter]);
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

const renderAppIcon = ({ item }: { item: IAppConfig }) => {
  const appIconProps: AppIconProps = {
    id: item.id,
    name: item.name,
    color: item.color,
    route: item.route,
  };
  return <AppIcon {...appIconProps}></AppIcon>;
};

const setInitialBacthOfApp = (
  counter: number,
  setAppData: React.Dispatch<React.SetStateAction<IAppConfig[]>>
) => {
  return () => {
    setAppData(generateBacthOfApp(counter));
  };
};

async function refreshAppData(
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  setAppData: React.Dispatch<React.SetStateAction<IAppConfig[]>>
) {
  setRefresh(true);
  setCounter(counter + 1);
  const loadAppPromise = retrieveApps(counter);
  const apps = await loadAppPromise;
  setRefresh(false);
  setAppData(apps);
}
