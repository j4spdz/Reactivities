import React from 'react';

import { Item, Button, SegmentGroup, Segment, Icon } from 'semantic-ui-react';

import { IActivity } from '../../../app/models/activity';

import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ActivityListItem: React.FC<IActivity> = (activity) => {
	const { id, title, date, description, city, venue } = activity;

	return (
		<SegmentGroup>
			<Segment>
				<Item.Group>
					<Item key={id}>
						<Item.Image size='tiny' circular src='/assets/user.png' />
						<Item.Content>
							<Item.Header as='a'>{title}</Item.Header>
							<Item.Description>Hosted by Bob</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<Icon name='clock' />
				{format(date, 'h:mm a')}
				<Icon name='marker' />
				{venue}, {city}
			</Segment>
			<Segment secondary>Attendees will go here</Segment>
			<Segment clearing>
				<span>{description}</span>
				<Button
					as={Link}
					to={`/activities/${id}`}
					floated='right'
					content='View'
					color='blue'
				/>
			</Segment>
		</SegmentGroup>
	);
};

export default ActivityListItem;
