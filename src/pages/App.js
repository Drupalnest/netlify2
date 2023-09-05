import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import necessary components from React Router
import TeamDetails from './[appGroup.name]'; // Import your TeamDetails component

const App = () => {
  return (
    <Router>
      <div>
        {/* Use the Switch component to render only the first matching route */}
        <Switch>
          {/* Define your routes using the Route component */}
          <Route path="/teams/:slug/view" component={TeamDetails} />
          {/* Add more routes if needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
