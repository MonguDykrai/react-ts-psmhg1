import { useRef, useCallback, useEffect } from 'react';

// 大屏基于 transform scale 自适应方案
export default function useScreenSizeAdaptation({
  // 缩放的 DOM 元素
  adaptiveEle,
  overrides,
}: {
  adaptiveEle: any;
  overrides?: (scale: string) => void;
}) {
  const design_viewport_height = useRef(1080); // 1080 为设计图的高度
  const resize = useCallback(
    (e?: any) => {
      const ele = adaptiveEle.current;
      if (ele instanceof HTMLElement) {
        // 计算 scale 的比例
        // window.innerHeight viewport 的高度
        // design_viewport_height.current 设计图的高度
        const zoom = (
          window.innerHeight / design_viewport_height.current
        ).toFixed(3);
        // 对容器设置缩放比例
        const scale = `scale(${zoom})`;
        ele.style.transform = scale;
        // 通过计算出来的缩放的比例求容器宽度并设置
        ele.style.width = `${(window.innerWidth / Number(zoom)).toFixed(2)}px`;
        ele.style.transformOrigin = `left top`;
        overrides && overrides(scale);
      }
    },
    [adaptiveEle]
  );

  useEffect(() => {
    // 进入页面先调用一下
    resize();
    // 用户缩放页面时重新调用 resize 对容器的宽高进行修改
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);
}
