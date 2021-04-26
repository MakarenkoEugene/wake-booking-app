import React, { useState, useEffect, useCallback } from 'react';
import { throttle } from '@utils';
import useStyle from './area.style';

function Select({ area, onSelect, selectUnique, cellSize }) {
  const classes = useStyle();
  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);
  const areaViewport = area.current?.getBoundingClientRect();
  // these are relative to the viewport, i.e. the window
  const areaTop = areaViewport?.top + window.scrollY || 0;
  const areaLeft = areaViewport?.left + window.scrollX || 0;

  const reset = useCallback(() => {
    setTouchStart(null);
    setTouchMove(null);
  }, [setTouchStart, setTouchMove]);

  const hendleTouchStart = useCallback(
    (event) => {
      if (touchStart) return;
      setTouchStart({ x: event.pageX - areaLeft, y: event.pageY - areaTop });
    },
    [areaLeft, areaTop, touchStart],
  );

  const hendleMove = useCallback(
    throttle((event) => {
      if (!touchStart) return;
      setTouchMove({ x: event.pageX - areaLeft, y: event.pageY - areaTop });
    }, 16),
    [areaLeft, areaTop, touchStart],
  );

  const hendleTouchEnd = useCallback(
    (event) => {
      if (!touchStart) return;

      const endPosition = { x: event.pageX - areaLeft, y: event.pageY - areaTop };
      const y = (touchStart.y < endPosition.y ? touchStart.y : endPosition.y) / cellSize;
      const x = (touchStart.x < endPosition.x ? touchStart.x : endPosition.x) / cellSize;

      const top = Math.floor(y);
      const left = Math.floor(x);

      const height = Math.ceil(Math.abs(touchStart.y - endPosition.y) / cellSize + y - top);
      const width = Math.ceil(Math.abs(touchStart.x - endPosition.x) / cellSize + x - left);

      if (width === 1 && height === 1) {
        selectUnique({ top, left });
      } else {
        onSelect({ top, left, height, width });
      }

      reset();
    },
    [areaLeft, areaTop, reset, touchStart, onSelect, selectUnique],
  );

  useEffect(() => {
    const { current } = area;

    if (current) {
      current.addEventListener('mousedown', hendleTouchStart);
      current.addEventListener('mousemove', hendleMove);
      current.addEventListener('mouseup', hendleTouchEnd);
    }

    return () => {
      const { current: c } = area;

      if (c) {
        c.removeEventListener('mousedown', hendleTouchStart);
        c.removeEventListener('mousemove', hendleMove);
        c.removeEventListener('mouseup', hendleTouchEnd);
      }
    };
  }, [area, hendleTouchEnd, hendleMove, hendleTouchStart]);

  if (touchStart && touchMove) {
    return (
      <div
        className={classes.select}
        style={{
          top: `${touchStart.y < touchMove.y ? touchStart.y : touchMove.y}px`,
          left: `${touchStart.x < touchMove.x ? touchStart.x : touchMove.x}px`,
          height: `${Math.abs(touchStart.y - touchMove.y)}px`,
          width: `${Math.abs(touchStart.x - touchMove.x)}px`,
        }}
      />
    );
  }

  return null;
}

export default Select;
