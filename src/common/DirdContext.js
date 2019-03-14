import React from 'react';

const DirdContext = React.createContext({
  token: '',
});

export const DirdProvider = DirdContext.Provider;
export const DirdConsumer = DirdContext.Consumer;
