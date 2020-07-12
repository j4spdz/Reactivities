import React, { useState, FormEvent, useContext, useEffect } from 'react';

import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

import LoadingComponent from '../../../app/layout/LoadingComponent';

import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParams {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
	match,
	history,
}) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		submitting,
		activity: initialFormState,
		loadActivity,
		clearActivity,
	} = activityStore;

	const [activity, setActivity] = useState<IActivity>({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: '',
	});

	useEffect(() => {
		if (match.params.id && activity.id.length === 0) {
			loadActivity(match.params.id).then(
				() => initialFormState && setActivity(initialFormState)
			);
		}

		return () => {
			clearActivity();
		};
	}, [
		loadActivity,
		match.params.id,
		clearActivity,
		initialFormState,
		activity.id.length,
	]);

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity).then(() =>
				history.push(`/activities/${newActivity.id}`)
			);
		} else {
			editActivity(activity).then(() =>
				history.push(`/activities/${activity.id}`)
			);
		}
	};

	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value, name } = event.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	if (activityStore.loadingInitial)
		return <LoadingComponent content='Loading activities...' />;

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
					onClick={() => history.push('/activities')}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);
