import { RepositoryArea, Title } from '../styles/RepositoryInfo';
import { Card } from '../styles/Shared';

export default ({ repository }) => (
  <div>
    <Card>
      <RepositoryArea>
        <a href={repository.url} target="_blank">
          <Title>
            <img src={repository.avatar_url} /> {repository.full_name}
          </Title>
        </a>
        <h2>{repository.description}</h2>
        <span>
          <a href={`${repository.url}/issues`}>{repository.open_issues_count} open issues</a> •{' '}
          <a href={`${repository.url}/stargazers`}>{repository.stargazers_count} stars</a>
        </span>
      </RepositoryArea>
    </Card>
  </div>
);
