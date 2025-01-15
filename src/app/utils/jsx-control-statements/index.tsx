import React from 'react';

interface IfElseProps {
  condition: boolean;
  ifChildren: React.ReactNode;
  elseChildren?: React.ReactNode;
}

export const IfElse: React.FC<IfElseProps> = ({ condition, ifChildren, elseChildren }) => {
  return condition ? <>{ifChildren}</> : <>{elseChildren}</>;
};

interface ForProps<T> {
  items: T[]|undefined;
  children: (item: T, index: number, array: T[]) => React.ReactNode;
}

export const For = <T,>({ items, children }: ForProps<T>) => {
  return (
    <>
      {items?.map((item, index, array) => (
        <React.Fragment key={index}>
          {children(item, index, array)}
        </React.Fragment>
      ))}
    </>
  );
};
