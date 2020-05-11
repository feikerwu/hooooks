import React, { useEffect } from 'react';

/**
 * 用于用于处理scroll函数监听
 * @param ref dom的ref
 * @param onChange change事件处理函数
 */
export default function useScroll(
  ref: React.RefObject<HTMLElement>,
  onChange: any
) {
  useEffect(() => {
    const handler = ({ target }) =>
      onChange({
        scrollTop: target.scrollTop,
        scrollLeft: target.scrollLeft,
      });

    if (ref.current) {
      ref.current.addEventListener('scroll', handler, {
        passive: true,
        capture: false,
      });
    }

    return () => ref.current.removeEventListener('scroll', handler);
  }, [ref]);
}
