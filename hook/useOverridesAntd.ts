import { useEffect, useRef } from 'react';

const DEFAULT_CLASSNAMES = {
  /** 选择器 */
  Select: 'ant-select-dropdown',
  /** 日期选择框 */
  DatePicker: 'ant-picker-dropdown',
};

export default function useOverridesAntd(
  classnames?: string[],
  keepDefault = true
) {
  const defaultClassNames = useRef([
    'ant-select-dropdown',
    'ant-picker-dropdown',
  ]);
  // const defaultClassNames = useRef(Object.values(DEFAULT_CLASSNAMES));
  classnames = Array.isArray(classnames) ? classnames : [];
  const clsnames = useRef(
    keepDefault ? [...defaultClassNames.current, ...classnames] : classnames
  );
  const style = useRef<HTMLStyleElement>(null);

  useEffect(() => {
    return () => {
      if (style.current && document.head.contains(style.current)) {
        document.head.removeChild(style.current);
        style.current = null;
      }
    };
  }, []);

  return function overrides(scale = 'scale(1)') {
    if (style.current) {
      style.current.textContent = getTextContent(clsnames.current, scale);
    } else {
      style.current = document.createElement('style');
      style.current.textContent = getTextContent(clsnames.current, scale);
      style.current.id = `OverridesAntd`;
      document.head.appendChild(style.current);
    }
  };
}

function getTextContent(classnames: string[], scale: string) {
  return classnames
    .filter((clsname) => clsname !== '')
    .map((clsname) => getStyleStatement(clsname, scale))
    .join('\n');
}

function getStyleStatement(classname: string, scale: string) {
  return `.${classname} { transform: ${scale}; }`;
}
