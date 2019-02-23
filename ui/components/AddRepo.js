import Downshift from "downshift";
import gql from "graphql-tag";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { GreyBox, Input } from "./styled";

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
                <Tippy
                  content="If you would like to pair on<br/> a specific GitHub repository"
                  placement="bottom"
                  arrow
                >
                  <Input
                    {...getInputProps()}
                    placeholder="Add repository"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    size="15"
                  />
                </Tippy>
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
