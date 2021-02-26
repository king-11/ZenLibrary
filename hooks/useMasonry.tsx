import { useWindowWidth } from "@react-hook/window-size";
import { FC, ReactNode, useEffect, useState } from "react";

interface breakpoint {
  width: number;
  columns: number;
}

const Masonry: FC<{ breakpoints: breakpoint[]; children: ReactNode[] }> = ({
  breakpoints,
  children,
}) => {
  const [columns, setColumns] = useState(1);
  const width = useWindowWidth();

  useEffect(() => {
    for (let index = 0; index < breakpoints.length; index++) {
      const element = breakpoints[index];
      if (element.width > width) {
        setColumns(element.columns);
        break;
      }
    }
  }, [width]);

  const columnWrapper = {};
  const result = [];
  for (let index = 0; index < columns; index++) {
    columnWrapper[`column${index}`] = [];
  }

  for (let i = 0; i < children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(children[i]);
  }

  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex-grow px-2"
        key={i}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return <div style={{ display: "flex" }}>{result}</div>;
};

export default Masonry;
