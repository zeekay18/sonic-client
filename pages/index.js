import React from "react";

const styles = {
  center: {},
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%"
  },
  tblContent: {
    textAlign: "center"
  },
  headerTitle: {
    backgroundColor: "#0F0",
    textAlign: "center"
  },
  description: {
    textAlign: "center"
  }
};

const baseUrl = "http://87223a99.ngrok.io";
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      suggestions: [],
      searchText: ""
    };
  }
  componentDidMount() {}

  async onSearch(text) {
    this.setState({ searchText: text.target.value });

    if (text.target.value) {
      let res = await fetch(
        `${baseUrl}/api/v1/sonic/suggest/users/${text.target.value}`
      );
      const result = await res.json();
      console.log(result);
      this.setState({ suggestions: result.data });
    }
  }

  async searchUser() {
    if (this.state.searchText) {
      let res = await fetch(
        `${baseUrl}/api/v1/sonic/users/${this.state.searchText}`
      );

      const result = await res.json();

      this.setState({ results: result.data });
    }
  }

  setSearchText(text) {
    this.setState({ searchText: text }, () => {
      this.setState({ suggestions: [] });
    });
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <h1 style={styles.headerTitle}>SONIC SERVER DEMO</h1>
        <h5 style={styles.description}>
          This is a project that shows how sonic server works <br />
          <br />
          Enter some text to search for users
        </h5>

        <div
          style={{
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
            display: "inline-block"
          }}
        >
          <input
            style={{
              height: 30,
              padding: 8,
              width: "100%",
              fontSize: 20,
              fontWeight: 200
            }}
            value={this.state.searchText}
            onChange={text => this.onSearch(text)}
          />

          {this.state.suggestions && this.state.suggestions.length > 0 && (
            <div
              style={{
                width: "100%",
                boxShadow: "-1px 4px 12px -1px rgba(184,184,184,1)",
                padding: 8
              }}
            >
              {this.state.suggestions.map((t, i) => (
                <p
                  style={{
                    color: "#5E5E5E",
                    fontSize: 13,
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                  key={i}
                  onClick={() => this.setSearchText(t)}
                >
                  {t}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          style={{
            fontSize: 13,
            height: 40,
            marginLeft: 30,
            position: "absolute",
            cursor: "pointer"
          }}
          onClick={() => this.searchUser()}
        >
          search
        </button>

        <div
          style={{
            width: 300,
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <h5>Results:</h5>
          <div>
            <ol>
              {this.state.results.map((t, i) => (
                <li key={i}>{t.firstName + " " + t.lastName}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
