import React, { useEffect, useState } from "react";

import axios from "axios";

import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";

function App() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/values")
        .then((res) => setValues(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map(({ id, name }: any) => (
          <List.Item key={id}>{name}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
