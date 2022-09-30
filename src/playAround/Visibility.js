class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  render() {
    return (
      <div>
        <h2>VisibilityToggle</h2>
        <button
          onClick={() => {
            this.setState((prevState) => {
              return {
                visibility: !prevState.visibility,
              };
            });
          }}
        >
          {this.state.visibility ? "Hide Details" : "Show Details"}
        </button>
        <p>{this.state.visibility ? "Details Shown Abiiii" : ""}</p>
      </div>
    );
  }
}
