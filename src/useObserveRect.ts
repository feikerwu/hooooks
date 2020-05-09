import React, { useRef } from 'react';
import { useRefDom } from '';

/**
 * 获取尺寸变化
 * @param target react的Ref对象
 */
function useObserveRect(
  target: React.RefObject<HTMLElement>,
  cb: (...args: any[]) => any
) {}
