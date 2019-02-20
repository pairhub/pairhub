import Downshift from "downshift";
import gql from "graphql-tag";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { GreyBox } from "./styled";

import TypeaheadResultsContainer from "./TypeaheadResultsContainer";

const searchQuery = gql`
  query searchRepositories($query: String!) {
    searchRepositories(query: $query) {
      full_name
    }
  }
`;

const ResultList = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  position: absolute;
  left: -8px;
`;

const Input = styled.input`
  background: transparent;
  padding: 12px 8px;
  color: #404040;
  font-weight: 500;
  border-radius: 8px;
  border: 0;
  margin: 0;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const CancelIcon = styled(Icon)`
  margin-left: 10px;
  color: #7f7f7f;
  &:hover {
    color: #404040;
  }
`;

const RepoLabel = styled.span`
  margin-left: 10px;
`;

const itemToResult = i => <span>{i.full_name}</span>;

const queryDataToResultsArray = ({ searchRepositories }) => searchRepositories;

const AddRepository = props => {
  const [hasFocus, setFocus] = React.useState(false);
  return (
    <GreyBox hasFocus={hasFocus || props.repository}>
      <Icon icon={faGithub} />
      {!props.repository ? (
        <>
          <Downshift
            onChange={selection => {
              props.setRepository(selection.full_name);
              setFocus(false);
            }}
            itemToString={item => (item ? item.full_name : "")}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
            }) => (
              <div style={{ position: "relative" }}>
                <Input
                  {...getInputProps()}
                  //autoFocus
                  placeholder="Add repository"
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                />
                {/* <div onClick={clearSelection}>clear</div> */}
                <ResultList {...getMenuProps()}>
                  {isOpen && (
                    <TypeaheadResultsContainer
                      {...{
                        inputValue,
                        getMenuProps,
                        getItemProps,
                        highlightedIndex,
                        itemToResult,
                        searchQuery,
                        queryDataToResultsArray
                      }}
                    />
                  )}
                </ResultList>
              </div>
            )}
          </Downshift>
        </>
      ) : (
        <RepoLabel>
          {props.repository ? (
            <>
              {props.repository}{" "}
              <CancelIcon
                onClick={props.clearRepository}
                icon={faTimesCircle}
              />
            </>
          ) : (
            "Add repository"
          )}
        </RepoLabel>
      )}
    </GreyBox>
  );
};
export default AddRepository;
