import React from 'react';

import { Form as FinalForm, Field } from 'react-final-form';

import { IProfile } from '../../app/models/profile';
import { isRequired, combineValidators } from 'revalidate';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { Form, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
	displayName: isRequired('displayName'),
});

interface IProps {
	updateProfile: (profile: IProfile) => void;
	profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
	return (
		<FinalForm
			onSubmit={updateProfile}
			validate={validate}
			initialValues={profile!}
			render={({ handleSubmit, invalid, pristine, submitting }) => (
				<Form onSubmit={handleSubmit}>
					<Field
						name='displayName'
						placeholder='DisplayName'
						value={profile!.displayName}
						component={TextInput}
					/>
					<Field
						name='bio'
						placeholder='Bio'
						rows={3}
						value={profile!.bio}
						component={TextAreaInput}
					/>
					<Button
						loading={submitting}
						disabled={invalid || pristine}
						floated='right'
						positive
						content='Update Profile'
					/>
				</Form>
			)}
		/>
	);
};

export default observer(ProfileEditForm);
