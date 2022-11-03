import * as React from 'react';
import './style.css';
import { useOverridesAntd, useScreenSizeAdaptation } from './hook';
import { Select } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export default function App() {
  const adaptiveEle = React.useRef<HTMLDivElement | null>(null);
  const overrides = useOverridesAntd();
  useScreenSizeAdaptation({
    adaptiveEle: adaptiveEle,
    overrides,
  });
  return (
    <div ref={adaptiveEle}>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        transitionName=""
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
    </div>
  );
}
