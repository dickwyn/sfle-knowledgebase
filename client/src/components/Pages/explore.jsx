import React, { Component } from "react";
import SectionTitle from "../PageComponents/SectionTitle";
import Header from "../PageComponents/Header";
import SearchBar from "../PageComponents/SearchBar";
import styled from "styled-components";
import Footer from "../PageComponents/Footer";
import CategoryType from "../PageComponents/CategoryType";
import sampleImage from "./production.png";
import PropTypes from "prop-types";
import Search from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import Navbar from "../PageComponents/Navbar";
import { getEnterprises, getField } from "../../actions/enterpriseActions";
import { getDomains } from "../../actions/enterpriseActions";
import { getDomainEntries } from "../../actions/domainActions";
import Map from "./map.jsx";

const Page = styled.div`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  width: 100%;
  background-color: #f3f3f3;
`;
const PageSection = styled.span`
  margin-left: 24px;
  width: 95%;
`;

class explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textChange: null,
      keyWordSearchText: "",
      dataArray: [],
      solutionTypes: null
    };

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick(al) {
    this.props.history.push(`/browse?keyWordSearch=${al}`);
  }

  getCategoryItems = () => {
    var categoryTypes = [];
    if (this.state.domains) {
      for (var i = 0; i < this.state.domains.length; i++) {
        categoryTypes.push(
          <div style={{ cursor: "pointer" }}>
            <CategoryType
              history={this.props.history}
              styleObject={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "120px",
                height: "120px",
                backgroundColor: "#ffff"
              }}
              image={this.state.domains[i].image}
              label={this.state.domains[i].name}
              type="primaryDomain"
            />
          </div>
        );
      }
    }

    return categoryTypes;
  };

  getSolutionItems = () => {
    var solutionTypes = [];
    if (this.state.solutionTypes) {
      for (var i = 0; i < this.state.solutionTypes.length; i++) {
        const lab = this.state.solutionTypes[i]["Name"];
        solutionTypes.push(
          <div style={{ cursor: "pointer", marginRight: "24px" }}>
            <CategoryType
              history={this.props.history}
              styleObject={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                width: "120px",
                height: "120px",
                backgroundColor: "#ffff"
              }}
              type="solutionType"
              image=""
              label={this.state.solutionTypes[i]}
            />
          </div>
        );
      }
    }

    return solutionTypes;
  };

  getPopularItems = () => {
    var popularItems = [];
    if (this.state.popularSolutions) {
      for (var i = 0; i < this.state.popularSolutions.length; i++) {
        const lab = this.state.popularSolutions[i].Name;
        popularItems.push(
          <div style={{ padding: "5px" }}>
            <a
              style={{ color: "blue" }}
              href={`/solution/${this.state.popularSolutions[i]._id}`}
            >
              {this.state.popularSolutions[i].Name}
            </a>
          </div>
        );
      }
    }

    return popularItems;
  };
  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      this.setState({
        domains: data.payload
      });
    });
    const poulars = this.props.getEnterprises();
    poulars.then(data => {
      this.setState({
        popularSolutions: data.payload
      });
    });
    const fields = this.props.getField("Solution Type", "0");
    fields.then(data => {
      this.setState({
        solutionTypes: data.payload
      });
    });
    while (this.state.dataArray.loading == false) {
      if (this.state.dataArray.loading == true) {
        break;
      }
    }
  }

  mapData(array) {}

  render() {
    const enterprises = this.props.enterprise;

    const categoryList = this.getCategoryItems();
    const solutionList = this.getSolutionItems();
    const popularList = this.getPopularItems();

    return (
      <Page>
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          crossorigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossorigin="anonymous"
        />

        <div style={{ width: "100%" }}>
          <Navbar />
        </div>
        <PageSection>
          <div style={{ width: "75%", marginTop: "20px" }}>
            <div>
              <SectionTitle label="Keyword Search" />
              <MuiThemeProvider>
                <Search
                  value={this.state.keyWordSearchText}
                  onChange={value => {
                    this.setState({ keyWordSearchText: value });
                  }}
                  onRequestSearch={() => {
                    this.props.history.push(
                      `/browse?keyWordSearch=${this.state.keyWordSearchText}`
                    );
                  }}
                />
              </MuiThemeProvider>
            </div>
          </div>
        </PageSection>
        <PageSection>
          <div style={{ marginTop: "50px" }}>
            <SectionTitle label="Primary Domains: " />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginRight: "10px",
              width: "100%"
            }}
          >
            {categoryList}
          </div>
        </PageSection>
        <PageSection>
          <div style={{ marginTop: "50px" }}>
            <SectionTitle label="Solution Types: " />
          </div>
          <div
            style={{
              width: "100%",
              alignItems: "center",
              display: "grid",
              gridRowGap: "10px",
              gridTemplateColumns: "repeat(6, 1fr)"
            }}
          >
            {solutionList}
          </div>
        </PageSection>
        <span style={{ width: "96%", marginLeft: "24px" }}>
          <div style={{ marginTop: "50px" }}>
            <SectionTitle label="Featured Solutions" />
          </div>
          <br />
          <div style={{ marginBottom: "20px" }}>
            <Map width={"100%"} height={"500px"} />
          </div>
          <div
            style={{
              width: "100%",
              alignItems: "center",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)"
            }}
          >
            {popularList}
          </div>
        </span>
        <div style={{ width: "100%" }}>
          <Footer />
        </div>
      </Page>
    );
  }
}
explore.propTypes = {
  getDomainEntreis: PropTypes.func.isRequired,
  getDomains: PropTypes.func.isRequired,
  getEnterprises: PropTypes.func.isRequired,
  categoryTypes: PropTypes.object,
  enterprise: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default connect(
  mapStateToProps,
  { getEnterprises, getDomains, getField, getDomainEntries }
)(explore);
