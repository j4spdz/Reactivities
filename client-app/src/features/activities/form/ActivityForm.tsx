import React, { useState, FormEvent } from 'react';

import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
	setEditMode,
	activity: initialFormState,
	createActivity,
	editActivity,
	submitting,
}) => {
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				title: '',
				category: '',
				description: '',
				date: '',
				city: '',
				venue: '',
			};
		}
	};

	const [activity, setActivity] = useState<IActivity>(initializeForm);

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity);
		} else {
			editActivity(activity);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value, name } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const { title, description, category, date, city, venue } = activity;
	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='title'
					placeholder='Title'
					value={title}
				/>
				<Form.TextArea
					onChange={handleInputChange}
					name='description'
					rows={2}
					placeholder='Description'
					value={description}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='category'
					placeholder='Category'
					value={category}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='date'
					type='datetime-local'
					placeholder='Date'
					value={date}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='city'
					placeholder='City'
					value={city}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='venue'
					placeholder='Venue'
					value={venue}
				/>
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={() => setEditMode(false)}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default ActivityForm;
