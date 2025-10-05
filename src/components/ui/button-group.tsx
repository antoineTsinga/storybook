import React from "react";
import clsx from "clsx";

interface ButtonGroupProps {
  children: React.ReactNode;
  size?: "small" | "middle" | "large";
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

const sizeGapMap = {
  small: "gap-1",
  middle: "gap-2",
  large: "gap-3",
};

const Group: React.FC<ButtonGroupProps> = ({
  children,
  size = "middle",
  orientation = "horizontal",
  className,
  style,
}) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<any>[];
  const isVertical = orientation === "vertical";

  return (
    <div
      className={clsx(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        sizeGapMap[size],
        className
      )}
      style={style}
    >
      {childrenArray.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        return React.cloneElement(child, {
          className: clsx(
            child.props?.className,
            "rounded-none",
            isVertical
              ? [isFirst && "rounded-t-md", isLast && "rounded-b-md"]
              : [isFirst && "rounded-l-md", isLast && "rounded-r-md"]
          ),
          block: true,
        });
      })}
    </div>
  );
};

export default Group;
