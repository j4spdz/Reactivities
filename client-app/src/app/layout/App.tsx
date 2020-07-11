import React, { useEffect, useState, Fragment, SyntheticEvent } from 'react';

import { Container } from 'semantic-ui-react';

import agent from '../api/agent';

import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null
	);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [target, setTarget] = useState('');

	const handleSelectActivity = (id: string) => {
		const activity = activities.find((a) => a.id === id);
		setSelectedActivity(activity === undefined ? null : activity);
		setEditMode(false);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	useEffect(() => {
		agent.Activities.list()
			.then((res) => {
				let activities: IActivity[] = [];
				res.forEach((activity) => {
					activity.date = activity.date.split('.')[0];
					activities.push(activity);
				});
				setActivities(activities);
			})
			.then(() => setLoading(false))
			.catch((err) => console.log(err));
	}, []);

	if (loading) return <LoadingComponent content='Loading activities...' />;

	const handleCreateActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities.create(activity)
			.then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleEditActivity = (activity: IActivity) => {
		setSubmitting(true);
		agent.Activities.update(activity)
			.then(() => {
				setActivities([
					...activities.filter((a) => a.id !== activity.id),
					activity,
				]);
				setEditMode(false);
			})
			.then(() => setSubmitting(false));
	};

	const handleDeleteActivity = (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		setSubmitting(true);
		setTarget(event.currentTarget.name);
		agent.Activities.delete(id)
			.then(() => {
				setActivities([...activities.filter((a) => a.id !== id)]);
				if (selectedActivity?.id === id) {
					setSelectedActivity(null);
				}
			})
			.then(() => setSubmitting(false));
	};

	return (
		<Fragment>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectActivity={handleSelectActivity}
					selectedActivity={selectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handleDeleteActivity}
					submitting={submitting}
					target={target}
				/>
			</Container>
		</Fragment>
	);
};

export default App;
