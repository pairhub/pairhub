import React from 'react';
import { Query } from 'react-apollo';
import withDebouncedProp from './withDebouncedProp';

import { ResultItem, Wrapper } from '../styles/TypeadheadResultsContainer';

const TypeaheadResultsContainer = withDebouncedProp('inputValue', 250)(
  ({
    inputValue,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    itemToResult,
    searchQuery,
    queryDataToResultsArray,
  }) => {
    if (!inputValue) return null;
    return (
      <Query query={searchQuery} variables={{ query: inputValue }} fetchPolicy="no-cache">
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Wrapper>
                <ResultItem>Loading</ResultItem>
              </Wrapper>
            );
          if (error) return <Wrapper>Error: {error.message}</Wrapper>;
          const searchResults = queryDataToResultsArray(data);
          if (searchResults.length === 0)
            return (
              <Wrapper>
                <ResultItem>No results</ResultItem>
              </Wrapper>
            );

          return (
            <Wrapper {...getMenuProps()}>
              {searchResults.map((item, index) => {
                return (
                  <ResultItem
                    {...getItemProps({
                      key: item.full_name,
                      item,
                      style: {
                        backgroundColor: highlightedIndex === index ? '#f8f9fa' : 'white',
                      },
                    })}
                  >
                    {itemToResult(item)}
                  </ResultItem>
                );
              })}
            </Wrapper>
          );
        }}
      </Query>
    );
  }
);

export default TypeaheadResultsContainer;
