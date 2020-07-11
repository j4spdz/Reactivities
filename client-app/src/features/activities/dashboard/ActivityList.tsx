import React, { useContext } from 'react';

import { Item, Label, Button, Segment } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

const ActivityList: React.FC = () => {
	const activityStore = useContext(ActivityStore);
	const {
		activitiesByDate,
		selectActivity,
		deleteActivity,
		submitting,
		target,
	} = activityStore;

	return (
		<Segment clearing>
			<Item.Group divided>
				{activitiesByDate.map(
					({ id, title, date, description, city, venue, category }) => (
						<Item key={id}>
							<Item.Content>
								<Item.Header as='a'>{title}</Item.Header>
								<Item.Meta>{date}</Item.Meta>
								<Item.Description>
									<div>{description}</div>
									<div>
										{city}, {venue}
									</div>
								</Item.Description>
								<Item.Extra>
									<Button
										onClick={() => selectActivity(id)}
										floated='right'
										content='View'
										color='blue'
									/>
									<Button
										name={id}
										loading={target === id && submitting}
										onClick={(e) => deleteActivity(e, id)}
										floated='right'
										content='Delete'
										color='red'
									/>
									<Label basic content={category} />
								</Item.Extra>
							</Item.Content>
						</Item>
					)
				)}
			</Item.Group>
		</Segment>
	);
};

export default observer(ActivityList);
