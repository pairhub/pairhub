import Downshift from 'downshift';
import gql from 'graphql-tag';
import TypeaheadResultsContainer from './TypeaheadResultsContainer';

import { DownshiftInput, GreyBox, CancelIcon, RepoLabel, ResultList } from '../styles/AddRepo';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const searchQuery = gql`
  query searchRepositories($query: String!) {
    searchRepositories(query: $query) {
      full_name
    }
  }
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
              itemToString={item => (item ? item.full_name : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
              }) => (
                <div style={{ position: 'relative' }}>
                  <DownshiftInput
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
                          queryDataToResultsArray,
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
                {props.repository}{' '}
                <CancelIcon onClick={props.clearRepository} icon={faTimesCircle} />
              </>
            ) : (
              'Add repository'
            )}
          </RepoLabel>
        )}
      </GreyBox>
    );
  }
}
export default AddRepository;
