import React, { useState, useEffect, useRef } from 'react';

/**
 * 强制刷新重新渲染，获取dom元素
 * @param ref
 */
export default function useRefDom(ref: React.RefObject<HTMLElement>) {
  const [, rerender] = useState();
  useEffect(() => {
    if (!ref.current) {
      requestAnimationFrame(() => {
        rerender(0);
      });
    }
  });
  return ref;
}
