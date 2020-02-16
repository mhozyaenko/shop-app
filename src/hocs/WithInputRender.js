import React from 'react';

export const WithInputRender = Wrapper => ({input, ...props}) => {
  return (
      <Wrapper {...input} {...props} />
  );
};