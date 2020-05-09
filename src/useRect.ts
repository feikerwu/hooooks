import React, { useState } from 'react';

/**
 * 实时获取dom元素
 * @param nodeRef dom元素ref引用
 */
function useRect(nodeRef: React.Ref<HTMLElement>) {
  const [rect, setRect] = useState(null);
}
