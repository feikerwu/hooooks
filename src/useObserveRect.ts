import React, { useRef, useEffect } from 'react';
import useRefDom from './useRefDom';

type RectInfo = Partial<DOMRect>;
type ObserveMessage = {
  rect: RectInfo;
  listeners: ((rect: RectInfo) => any)[];
};

/**
 * 每个帧去计算想要观测的dom元素rect数据
 * @param target react的Ref对象
 */
function useObserveRect(
  target: React.RefObject<HTMLElement>,
  cb: (...args: any[]) => any
) {
  target = useRefDom(target);
  const node = target.current;
  const observedMap = getObservedNodeMap();

  useEffect(() => {
    if (!observedMap.has(node)) {
      observedMap.set(node, {
        listeners: [],
        rect: null,
      });
    } else {
      observedMap.get(node).listeners.push(cb);
    }
    return () => {
      const info = observedMap.get(node);
      if (!info.listeners.length) {
        observedMap.delete(node);
      }
    };
  }, [target]);
}

function getBoundingClientRect(element: HTMLElement): DOMRect {
  const eleRect: DOMRect = element.getBoundingClientRect();
  return eleRect;
}

/**
 * 获取全局注册的监听map
 */
const observedNodeMapSymbol = Symbol.for('observed-node-map');
function getObservedNodeMap() {
  if (!window[observedNodeMapSymbol]) {
    window[observedNodeMapSymbol] = new Map();
    initObserve();
  }
  return window[observedNodeMapSymbol];
}

function initObserve() {
  const observedNodeMap = window[observedNodeMapSymbol];
  const requestAnimationFrameId = requestAnimationFrame(() => {
    const changed: ObserveMessage[] = [];
    observedNodeMap.forEach((info: ObserveMessage, node: HTMLElement) => {
      const newRect = getBoundingClientRect(node);
      if (isChanged(newRect, info.rect)) {
        info.rect = newRect;
        changed.push(info);
      }
    });
    changed.forEach((item) => {
      item.listeners.forEach((listener) => listener(item.rect));
    });
  });
  return requestAnimationFrameId;
}

const rectKeys: (keyof RectInfo)[] = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
];

/**
 * 两个元素位置是否相等
 */
function isChanged(newRect: RectInfo, oldRect: RectInfo) {
  return rectKeys.some((key) => newRect[key] !== oldRect[key]);
}
