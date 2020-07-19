import React from 'react';

import {
	Item,
	Button,
	SegmentGroup,
	Segment,
	Icon,
	Label,
} from 'semantic-ui-react';

import { IActivity } from '../../../app/models/activity';
import ActivityListItemAttendees from './ActivityListItemAttendees';

import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ActivityListItem: React.FC<IActivity> = (activity) => {
	const {
		id,
		title,
		date,
		description,
		city,
		venue,
		isGoing,
		isHost,
		attendees,
	} = activity;

	const host = attendees.find((x) => x.isHost);

	return (
		<SegmentGroup>
			<Segment>
				<Item.Group>
					<Item key={id}>
						<Item.Image
							size='tiny'
							circular
							src={host?.image || '/assets/user.png'}
						/>
						<Item.Content>
							<Item.Header as={Link} to={`/activities/${id}`}>
								{title}
							</Item.Header>
							<Item.Description>Hosted by {host?.displayName}</Item.Description>

							{isHost && (
								<Item.Description>
									<Label
										basic
										color='orange'
										content='You are hosting this activity'
									/>
								</Item.Description>
							)}
							{isGoing && !isHost && (
								<Item.Description>
									<Label
										basic
										color='green'
										content='You are going to this activity'
									/>
								</Item.Description>
							)}
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
			<Segment secondary>
				<ActivityListItemAttendees attendees={activity.attendees} />
			</Segment>
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
