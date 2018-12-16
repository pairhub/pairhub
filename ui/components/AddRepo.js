import Downshift from "downshift";
import gql from "graphql-tag";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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

const GreyBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-weight: 500;
  font-size: 16px;
  color: ${props => (props.active ? "#404040" : "#7f7f7f")};
  border-radius: 8px;
  background-color: ${props =>
    props.active ? "rgba(90, 100, 109, 0.05)" : "transparent"};
  cursor: pointer;

  &:hover {
    background-color: rgba(90, 100, 109, 0.05);
    color: #404040;
  }
`;

const RepoLabel = styled.span`
  margin-left: 10px;
`;

const itemToResult = i => <span>{i.full_name}</span>;

const queryDataToResultsArray = ({ searchRepositories }) => searchRepositories;

class AddRepository extends React.Component {
  state = { addRepo: false };

  toggleAddRepo = () => this.setState({ addRepo: !this.state.addRepo });

  render() {
    const props = this.props;
    return (
      <GreyBox
        onClick={!this.state.addRepo ? this.toggleAddRepo : undefined}
        active={this.state.addRepo || props.repository}
      >
        <Icon icon={faGithub} />
        {this.state.addRepo ? (
          <>
            <Downshift
              onChange={selection => {
                props.setRepository(selection.full_name);
                this.toggleAddRepo();
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
                    autoFocus
                    placeholder="Search repo..."
                    onBlur={this.toggleAddRepo}
                  />
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
  }
}
export default AddRepository;
