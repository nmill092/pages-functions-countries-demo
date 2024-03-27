import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { Country } from '../types.ts';
import './App.css';

// eslint-disable-next-line max-len
export const OptionButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button type="button" className="option-button" {...props}>
    {children}
  </button>
);

export const CountryWrapper = ({ stat, datum }: { stat: string, datum: Partial<Country> }) => (
  <div className="country">
    <h2>{datum.name}</h2>
    {stat === 'populations' ? (
      <div>
        <strong>Population:</strong>
        {datum.population?.toLocaleString() || 'No Data'}
      </div>
    ) : (
      <div>
        <strong>Capital:</strong>
        {datum.capital}
      </div>
    )}
  </div>
);

export const Loading = ({ children }: {children: ReactNode }) => (
  <div className="loading">
    <code>
      {children}
    </code>
  </div>
);

export const SearchBox: React.FC<HTMLInputElement> = forwardRef((props, ref) => (
  //  @ts-expect-error: Suppress ref error
  <input className="search-box" ref={ref} {...props} />
));
