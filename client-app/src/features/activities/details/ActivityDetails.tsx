import React from 'react';

import { Card, Image, Button } from 'semantic-ui-react';

import { IActivity } from '../../../app/models/activity';

interface IProps {
	activity: IActivity;
	setEditMode: (editMode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({
	activity: { category, title, date, description },
	setEditMode,
	setSelectedActivity,
}) => {
	return (
		<Card fluid>
			<Image
				src={`/assets/categoryImages/${category}.jpg`}
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Meta>
					<span className='date'>{date}</span>
				</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						onClick={() => setEditMode(true)}
						basic
						color='blue'
						content='Edit'
					/>
					<Button
						onClick={() => setSelectedActivity(null)}
						basic
						color='grey'
						content='Cancel'
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default ActivityDetails;
