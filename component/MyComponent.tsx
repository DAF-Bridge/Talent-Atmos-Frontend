import React from 'react';

type MyComponentProps = {
  text: string;
};

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default MyComponent;
