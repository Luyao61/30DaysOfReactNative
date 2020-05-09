import React from "react";
import { View, PanResponder, Animated, Dimensions } from "react-native";
import { useSafeArea, EdgeInsets } from "react-native-safe-area-context";

interface DraggableProps {
  // center coordinates of the touchable component, not top and left
  positionX: number;
  positionY: number;
  componentWidth: number;
  componentHeight: number;
  horizontalMarginFromEdge: number;
  verticalMarginFromEdge: number;
  children: React.ReactElement;
}

export function Draggable({
  positionX,
  positionY,
  children,
  componentHeight,
  componentWidth,
  horizontalMarginFromEdge,
  verticalMarginFromEdge,
}: DraggableProps) {
  const x = positionX;
  const y = positionY;
  console.log(x);
  console.log(y);
  const translateXY = React.useRef(new Animated.ValueXY()).current;
  const safeAreaInsert = useSafeArea();
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const presetCoordinates = React.useMemo(() => {
    return calculatePresetCoordinates(
      safeAreaInsert,
      componentWidth,
      componentHeight,
      screenWidth,
      screenHeight,
      horizontalMarginFromEdge,
      verticalMarginFromEdge
    );
  }, [
    screenWidth,
    screenHeight,
    componentHeight,
    componentWidth,
    horizontalMarginFromEdge,
    verticalMarginFromEdge,
    safeAreaInsert,
  ]);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        translateXY.setOffset({
          x: (translateXY.x as any)._value,
          y: (translateXY.y as any)._value,
        });
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      onPanResponderMove: Animated.event([
        null,
        {
          dx: translateXY.x,
          dy: translateXY.y,
        },
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      onPanResponderRelease: (evt, gestureState) => {
        translateXY.flattenOffset();
        const destX =
          (translateXY.x as any)._value > 0
            ? presetCoordinates.right
            : presetCoordinates.left;
        const moveDown = (translateXY.y as any)._value > 0;
        const coordinateToCompare = moveDown
          ? presetCoordinates.bottom
          : presetCoordinates.top;
        const destY =
          Math.abs((translateXY.y as any)._value) >
          Math.abs(coordinateToCompare - presetCoordinates.mid) / 2
            ? coordinateToCompare
            : presetCoordinates.mid;
        Animated.spring(translateXY, {
          toValue: { x: destX - x, y: destY - y },
        }).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: positionY - componentHeight / 2,
        left: positionX - componentWidth / 2,
        transform: [
          { translateX: translateXY.x },
          { translateY: translateXY.y },
        ],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
}

export type coordinates = {
  left: number;
  right: number;
  top: number;
  mid: number;
  bottom: number;
};
export function calculatePresetCoordinates(
  safeAreaInsert: EdgeInsets,
  componentWidth: number,
  componentHeight: number,
  screenWidth: number,
  screenHeight: number,
  horizontalMarginFromEdge: number,
  verticalMarginFromEdge: number
): coordinates {
  return {
    left:
      0 + safeAreaInsert.left + horizontalMarginFromEdge + componentWidth / 2,
    right:
      screenWidth -
      safeAreaInsert.right -
      horizontalMarginFromEdge -
      componentWidth / 2,
    top: 0 + safeAreaInsert.top + verticalMarginFromEdge + componentHeight / 2,
    mid: 0 + safeAreaInsert.top + (screenHeight - safeAreaInsert.top) / 2,
    bottom:
      screenHeight -
      safeAreaInsert.bottom -
      verticalMarginFromEdge -
      componentHeight / 2,
  };
}
