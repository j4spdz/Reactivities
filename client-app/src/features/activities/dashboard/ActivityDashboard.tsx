import React, { useEffect, useContext, useState } from 'react';

import { Grid, Loader } from 'semantic-ui-react';

import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlacholder from './ActivityListItemPlaceholder';

import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';

const ActivityDashboard: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		loadActivites,
		loadingInitial,
		setPage,
		page,
		totalPages,
	} = rootStore.activityStore;
	const [loadingNext, setLoadingNext] = useState(false);

	const handleGetNext = () => {
		setLoadingNext(true);
		setPage(page + 1);
		loadActivites().then(() => setLoadingNext(false));
	};

	useEffect(() => {
		loadActivites();
	}, [loadActivites]);

	return (
		<Grid>
			<Grid.Column width={10}>
				{loadingInitial && page === 0 ? (
					<ActivityListItemPlacholder />
				) : (
					<InfiniteScroll
						pageStart={0}
						loadMore={handleGetNext}
						hasMore={!loadingNext && page + 1 < totalPages}
						initialLoad={false}
					>
						<ActivityList />
					</InfiniteScroll>
				)}
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityFilters />
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);
