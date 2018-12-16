import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import withDebouncedProp from "./withDebouncedProp";

const Wrapper = styled.div`
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 100px;
  border-radius: 8px;
  padding: 8px;
  background: white;
  overflow: hidden;
`;

const ResultItem = styled.li`
  margin: 0;
  border-radius: 6px;
  padding: 10px 8px;
  font-weight: 500;
  color: #3d4045;
`;

const TypeaheadResultsContainer = withDebouncedProp("inputValue", 250)(
  ({
    inputValue,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    itemToResult,
    searchQuery,
    queryDataToResultsArray
  }) => {
    if (!inputValue) return null;
    return (
      <Query
        query={searchQuery}
        variables={{ query: inputValue }}
        fetchPolicy="no-cache"
      >
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
                        backgroundColor:
                          highlightedIndex === index ? "#f8f9fa" : "white"
                      }
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
