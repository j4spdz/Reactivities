import React from 'react';

import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
	return (
		<Container style={{ marginTop: '7em' }}>
			<h1>Home Page</h1>
			<h3>
				Got to <Link to='/activities'>Activities</Link>
			</h3>
		</Container>
	);
};

export default Homepage;
