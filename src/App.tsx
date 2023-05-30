import { Component } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { withRouter } from "./components/WithRouter";
import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
interface AppProps {
  navigate: ReturnType<typeof useNavigate>;
}

interface AppState {
  selectedHit: any;
}
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      selectedHit: {},
    };
  }

  goToDetails = (selected: any) => {
    this.setState({ selectedHit: selected });
    this.props.navigate("/story");
  };

  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage goToDetails={this.goToDetails} />} />
        <Route
          path="/story"
          element={<StoryPage selectedHit={this.state.selectedHit} />}
        />
      </Routes>
    );
  }
}

export default withRouter(App);
