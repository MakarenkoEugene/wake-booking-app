import React, { useCallback, useRef } from 'react';
import { Grid } from '@material-ui/core';

import uuid from 'react-uuid';
import clsx from 'clsx';
import SelectArea from './select';
import useStyle from './area.style';

// nowDate ddhh
const Area = ({ daysInMonth, nowDate, schedule, cellSize, selected, setSelected }) => {
  const classes = useStyle(cellSize);
  const area = useRef(null);

  const selectArea = useCallback(
    ({ top, left, height, width }) => {
      const dateRange = new Array(width)
        .fill('')
        .map((v, id) => {
          const d = left + id + 1;

          return new Array(height).fill('').map((ve, ih) => {
            const h = top + ih;

            return `${d < 10 ? `0${d}` : d}${h < 10 ? `0${h}` : h}`;
          });
        })
        .flat();

      setSelected(nowDate ? dateRange.filter((d) => d > nowDate) : dateRange);
    },
    [nowDate],
  );

  const selectUnique = ({ top, left }) => {
    const hh = `${top < 10 ? `0${top}` : top}`;
    const dd = `${left + 1 < 10 ? `0${left + 1}` : left + 1}`;

    const ddhh = `${dd}${hh}`;

    if (nowDate && ddhh < nowDate) return;
    setSelected(selected.includes(ddhh) ? selected.filter((c) => c !== ddhh) : [...selected, ddhh]);
  };

  return (
    <Grid
      container
      ref={area}
      className={classes.area}
      style={{ width: `${cellSize * daysInMonth}px`, height: `${cellSize * 24}px` }}
    >
      <SelectArea
        onSelect={selectArea}
        selectUnique={selectUnique}
        area={area}
        cellSize={cellSize}
      />

      {new Array(24 * daysInMonth).fill('').map((v, i) => {
        const h = Math.floor(i / daysInMonth);
        const d = (i % daysInMonth) + 1;
        const ddhh = `${d < 10 ? `0${d}` : d}${h < 10 ? `0${h}` : h}`;

        return (
          <Grid
            item
            key={uuid()}
            className={clsx(
              classes.cell,
              ddhh <= nowDate && classes.passed,
              selected.includes(ddhh) && classes.selected,
              schedule?.weekday?.includes(ddhh) && classes.weekday,
              schedule?.weekend?.includes(ddhh) && classes.weekend,
              schedule?.holiday?.includes(ddhh) && classes.holiday,
            )}
          />
        );
      })}
    </Grid>
  );
};

export default Area;
