import React, { Component } from "react";
import SectionTitle from "../PageComponents/SectionTitle";
import Header from "../PageComponents/Header";
import QueryString from "query-string";
import styled from "styled-components";
import ResultItem from "../PageComponents/ResultItem";
import Paginate from "../PageComponents/Paginate";
import PropTypes from "prop-types";
import { getEnterprises, getField } from "../../actions/enterpriseActions";
import { connect } from "react-redux";
import CheckBox from "rc-checkbox";
import Navbar from "../PageComponents/Navbar";
import Footer from "../PageComponents/Footer";

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  width: 100%;
`;

const InnerPage = styled.div`
  display: flex;
  flex-direction: row;
  min-width: fit-content;
  height: 100%;
  marginLeft: 100px;
`;

const Section = styled.div`
  display: inline-flex;
  justify-content: space-betwen;
  flex-direction: row;
  margin-top: 24px;
  height: 50px;
`;

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: null,
      itemList: null,
      solutions: null,
      filteredSolutions: null,
      solutionTypes: null,
      locations: null
    };
  }
  componentWillMount() {
    const fields = this.props.getField("Primary Domain", "0");
    fields.then(data => {
      this.setState({
        domains: data.payload
      });
    });

    const poulars = this.props.getEnterprises();
    poulars
      .then(data => {
        this.setState({
          solutions: data.payload
        });
      })
      .then(() => {
        this.setState({
          filteredSolutions: this.getItems2()
        });
      });
    const solutionTypes = this.props.getField("Solution Type", "0");
    solutionTypes.then(data => {
      this.setState({
        solutionTypes: data.payload
      });
    });
    const cities = this.props.getField("City", "0");
    cities.then(data => {
      this.setState({
        cities: data.payload
      });
    });
    const states = this.props.getField("State", "0");
    states.then(data => {
      this.setState({
        states: data.payload
      });
    });
    const countries = this.props.getField("Country", "0");
    countries.then(data => {
      this.setState({
        countries: data.payload
      });
    });
    const secondaryDomains = this.props.getField("Secondary Domain", "0");
    secondaryDomains.then(data => {
      this.setState({
        secondaryDomains: data.payload
      });
    });
    const locations = this.props.getField("Location", "0");
    locations.then(data => {
      this.setState({
        locations: data.payload
      });
    });
    const OrgEntTypes = this.props.getField("Organizational Entity Type", "0");
    OrgEntTypes.then(data => {
      this.setState({
        OrgEntTypes: data.payload
      });
    });
    const scopes = this.props.getField("Scope of Activities", "0");
    scopes.then(data => {
      this.setState({
        scopes: data.payload
      });
    });
    const climateZones = this.props.getField("Climate Zone", "0");
    climateZones.then(data => {
      this.setState({
        climateZones: data.payload
      });
    });
  }
  handleCheckBox = (event, checked) => {
    console.log("name: ", event);
    const x = QueryString.parse(this.props.location.search);
    if (event.target.checked) {
      if (this.props.location.search) {
        let result = [];
        var duplicate = false;
        for (var param in x) {
          if (
            x[param] === event.target.name &&
            param === event.target.filterType
          ) {
            result[param] = event.target.name;
            duplicate = true;
          }
          if (
            x[param] != event.target.name &&
            param === event.target.filterType
          ) {
            result[param] = event.target.name;
            duplicate = true;
          }
          if (
            x[param] != event.target.name &&
            param != event.target.filterType
          ) {
            result[param] = x[param];
          } else {
            result[event.target.filterType] = event.target.name;
          }
        }
        if (duplicate) {
          this.props.history.push(`/browse?${QueryString.stringify(result)}`);
        } else {
          this.props.history.push(
            `/browse${this.props.location.search}&${event.target.filterType}=${
              event.target.name
            }`
          );
        }
      } else {
        this.props.history.push(
          `/browse?${event.target.filterType}=${event.target.name}`
        );
      }
      window.location.reload();
    } else {
      if (x.length === 1) {
        this.props.history.push("/browse");
      } else {
        var result = [];

        for (var param in x) {
          console.log("&&&&", x[param], param);

          if (
            x[param] === event.target.name &&
            param === event.target.filterType
          ) {
            console.log("excluding: ", x[param]);
          } else if (
            x[param] != event.target.name &&
            param === event.target.filterType
          ) {
            console.log("LLLAAAALAAAA");
            result[param] = event.target.name;
          } else {
            console.log("***PUSING RESULT***: ", x[param]);
            result[param] = x[param];
          }
        }
        this.props.history.push(`/browse?${QueryString.stringify(result)}`);
      }
      window.location.reload();
    }
  };
  getCheckBoxs = () => {
    if (this.state.domains) {
      var checkboxes = [];
      this.state.domains.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.domains.length; i++) {
        checkboxes.push(
          <div style={{ marginBottom: "10px", marginLeft: "15px" }}>
            <CheckBox
              name={this.state.domains[i]}
              onChange={this.handleCheckBox}
              filterType={"primaryDomain"}
              checked={x.primaryDomain === this.state.domains[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.domains[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.solutionTypes) {
      var checkboxes2 = [];
      this.state.solutionTypes.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.solutionTypes.length; i++) {
        checkboxes2.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.solutionTypes[i]}
              onChange={this.handleCheckBox}
              filterType={"solutionType"}
              checked={x.solutionType === this.state.solutionTypes[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.solutionTypes[i]}
            </div>
          </div>
        );
      }
    }

    if (this.state.OrgEntTypes) {
      var checkboxes3 = [];
      this.state.OrgEntTypes.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.OrgEntTypes.length; i++) {
        checkboxes3.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.OrgEntTypes[i]}
              onChange={this.handleCheckBox}
              filterType={"OrgEntType"}
              checked={x.OrgEntType === this.state.OrgEntTypes[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.OrgEntTypes[i]}
            </div>
          </div>
        );
      }
    }

    if (this.state.climateZones) {
      var checkboxes4 = [];
      this.state.climateZones.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.climateZones.length; i++) {
        checkboxes4.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.climateZones[i]}
              onChange={this.handleCheckBox}
              filterType={"climateZone"}
              checked={x.climateZone === this.state.climateZones[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.climateZones[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.scopes) {
      var checkboxes5 = [];
      this.state.scopes.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.scopes.length; i++) {
        checkboxes5.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.scopes[i]}
              onChange={this.handleCheckBox}
              filterType={"scope"}
              checked={x.scope === this.state.scopes[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.scopes[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.secondaryDomains) {
      var checkboxes6 = [];
      this.state.secondaryDomains.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.secondaryDomains.length; i++) {
        checkboxes6.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.secondaryDomains[i]}
              onChange={this.handleCheckBox}
              filterType={"secondaryDomain"}
              checked={x.secondaryDomain === this.state.secondaryDomains[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.secondaryDomains[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.countries) {
      var checkboxes7 = [];
      this.state.countries.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.countries.length; i++) {
        checkboxes7.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.countries[i]}
              onChange={this.handleCheckBox}
              filterType={"country"}
              checked={x.country === this.state.countries[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.countries[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.states) {
      var checkboxes8 = [];
      this.state.states.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.states.length; i++) {
        checkboxes8.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.states[i]}
              onChange={this.handleCheckBox}
              filterType={"state"}
              checked={x.state === this.state.states[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.states[i]}
            </div>
          </div>
        );
      }
    }
    if (this.state.cities) {
      var checkboxes9 = [];
      this.state.cities.sort();
      const x = QueryString.parse(this.props.location.search);
      for (var i = 0; i < this.state.cities.length; i++) {
        checkboxes9.push(
          <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
            <CheckBox
              name={this.state.cities[i]}
              onChange={this.handleCheckBox}
              filterType={"city"}
              checked={x.city === this.state.cities[i]}
              enabled={true}
            />
            <div
              style={{
                fontSize: "12px",
                display: "block",
                marginTop: "-20px",
                marginLeft: "20px"
              }}
            >
              {this.state.cities[i]}
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{ marginLeft: "5px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          {typeof checkboxes !== "undefined" && checkboxes.length > 0 && (
            <div style={{ fontSize: "12px" }}>
              <h4 style={{ marginLeft: "10px" }}> Primary Domains </h4>
              {checkboxes}
            </div>
          )}
          <button
            style={{ marginTop: "20px", width: "100px" }}
            onClick={this.resetFilters}
          >
            Reset Filters
          </button>
        </div>
        {typeof checkboxes6 !== "undefined" && checkboxes6.length > 0 && (
          <div
            style={{
              fontSize: "12px",
              display: "grid",
              overflow: "scroll",
              height: "500px"
            }}
          >
            <h4 style={{ marginLeft: "10px" }}> Secondary Domains </h4>
            {checkboxes6}
          </div>
        )}
        {typeof checkboxes2 !== "undefined" && checkboxes2.length > 0 && (
          <div
            style={{
              fontSize: "12px",
              overflow: "scroll",
              height: `${checkboxes2.length * 15}px`
            }}
          >
            <h4 style={{ marginLeft: "10px" }}> Solution Type </h4>
            {checkboxes2}
          </div>
        )}
        {typeof checkboxes3 !== "undefined" && checkboxes3.length > 0 && (
          <div
            style={{ fontSize: "12px", overflow: "scroll", maxHeight: `250px` }}
          >
            <h4 style={{ marginLeft: "10px" }}> Organization Entity Type </h4>
            {checkboxes3}
          </div>
        )}
        {typeof checkboxes4 !== "undefined" && checkboxes4.length > 0 && (
          <div
            style={{ fontSize: "12px", overflow: "scroll", maxHeight: `250px` }}
          >
            <h4 style={{ marginLeft: "10px" }}> Climate Zone </h4>
            {checkboxes4}
          </div>
        )}
        {typeof checkboxes5 !== "undefined" && checkboxes5.length > 0 && (
          <div
            style={{ fontSize: "12px", overflow: "scroll", maxHeight: `250px` }}
          >
            <h4 style={{ marginLeft: "10px" }}> Scope of Activities </h4>
            {checkboxes5}
          </div>
        )}
        {typeof checkboxes7 !== "undefined" && checkboxes7.length > 0 && (
          <div style={{ fontSize: "12px", overflow: "scroll" }}>
            <h4 style={{ marginLeft: "10px" }}> Country </h4>
            {checkboxes7}
          </div>
        )}
        {typeof checkboxes8 !== "undefined" && checkboxes8.length > 0 && (
          <div
            style={{ fontSize: "12px", overflow: "scroll", height: "350px" }}
          >
            <h4 style={{ marginLeft: "10px" }}> State </h4>
            {checkboxes8}
          </div>
        )}
        {typeof checkboxes9 !== "undefined" && checkboxes9.length > 0 && (
          <div
            style={{ fontSize: "12px", overflow: "scroll", height: "350px" }}
          >
            <h4 style={{ marginLeft: "10px" }}> City </h4>
            {checkboxes9}
          </div>
        )}
      </div>
    );
  };
  resetFilters = () => {
    this.props.history.push(`/browse`);
    window.location.reload();
  };
  getItems2 = () => {
    var multipleFilters = false;

    const x = QueryString.parse(this.props.location.search);

    var filteredData = this.state.solutions;

    if (x.primaryDomain) {
      multipleFilters = true;
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          if (filteredData[i]["Primary Domain"] != x.primaryDomain) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.secondaryDomain) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log(
            "###",
            filteredData[i]["Secondary Domain"] !== x.secondaryDomain
          );
          if (filteredData[i]["Secondary Domain"] != x.secondaryDomain) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.country) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log("###", filteredData[i]["Country"] !== x.country);
          if (filteredData[i]["Country"] != x.country) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.state) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log("###", filteredData[i]["State"] !== x.state);
          if (filteredData[i]["State"] != x.state) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.city) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log("###", filteredData[i]["City"] !== x.city);
          if (filteredData[i]["City"] != x.city) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.climateZone) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log("###", filteredData[i]["Climate Zone"] !== x.climateZone);
          if (filteredData[i]["Climate Zone"] != x.climateZone) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.scope) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log(
            "###",
            filteredData[i]["Scope of Activities"] !== x.scope
          );
          if (filteredData[i]["Scope of Activities"] != x.scope) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.OrgEntType) {
      multipleFilters = true;
      console.log(x);
      console.log(this.props.enterprise);
      if (this.state.solutions) {
        for (var i = 0; i < filteredData.length; i++) {
          console.log(
            "###",
            filteredData[i]["Primary Domain"] !== x.primaryDomain
          );
          if (filteredData[i]["Organizational Entity Type"] != x.OrgEntType) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }
    if (x.solutionType) {
      if (multipleFilters) {
        if (this.state.solutions) {
          for (var i = 0; i < filteredData.length; i++) {
            if (filteredData[i]["Solution Type"] != x.solutionType) {
              filteredData.splice(i, 1);
              i = i - 1;
            }
          }
        }
      } else {
        if (this.state.solutions) {
          for (var i = 0; i < filteredData.length; i++) {
            if (filteredData[i]["Solution Type"] !== x.solutionType) {
              filteredData.splice(i, 1);
              i = i - 1;
            }
          }
        }
      }
      multipleFilters = true;
    }
    if (x.location) {
      if (multipleFilters) {
        if (this.state.solutions) {
          for (var i = 0; i < filteredData.length; i++) {
            if (filteredData[i]["Location"] !== x.location) {
              filteredData.splice(i, 1);
              i = i - 1;
            }
          }

          console.log("THIRD FILTER: ", filteredData);
        }
      } else {
        if (this.state.solutions) {
          for (var i = 0; i < filteredData.length; i++) {
            if (filteredData[i]["Location"] !== x.location) {
              filteredData.splice(i, 1);
              i = i - 1;
            }
          }
        }
      }
    }
    if (x.keyWordSearch) {
      if (this.state.solutions) {
        for (var i = 0; i < this.state.solutions.length; i++) {
          console.log(x.keyWordSearch);
          console.log(this.state.solutions[i]["Keyword Descriptors"]);
          console.log(
            this.state.solutions[i]["Keyword Descriptors"].indexOf(
              x.keyWordSearch
            )
          );
          if (
            !this.state.solutions[i]["Keyword Descriptors"]
              .toLowerCase()
              .match(x.keyWordSearch.toLowerCase()) &&
            !this.state.solutions[i]["Name"]
              .toLowerCase()
              .match(x.keyWordSearch.toLowerCase())
          ) {
            filteredData.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }

    for (var i = 0; i < filteredData.length; i++) {
      for (var k = i + 1; k < filteredData.length; k++) {
        if (
          filteredData[i].Name.toLowerCase() >
          filteredData[k].Name.toLowerCase()
        ) {
          var temp = filteredData[i];
          filteredData[i] = filteredData[k];
          filteredData[k] = temp;
        }
      }
    }
    return this.getItems(filteredData);
  };

  getItems = filteredData => {
    const items = [];
    if (filteredData) {
      for (var i = 0; i < filteredData.length; i++) {
        const lab = filteredData[i]["Name"];

        let s = filteredData[i]._id;
        console.log("111111111111111111111111111111");
        console.log("???!!!: ", s);
        console.log(filteredData[i]);
        items.push(
          <div
            onClick={() => {
              this.props.history.push(`/solution/${s}`);
            }}
            style={{ marginBottom: "50px", cursor: "pointer" }}
          >
            <ResultItem
              text={filteredData[i]["General Description"]}
              label={filteredData[i]["Name"]}
              img={filteredData[i]["mainImage"]}
              location={filteredData[i]["Location"]}
            />
          </div>
        );
      }
    }

    return items;
  };

  render() {
    const checkboxes = this.getCheckBoxs();

    return (
      <Page>
        <div style={{ marginBottom: "50px", width: "100%" }}>
          <Navbar />
        </div>
        <InnerPage>
          <div style={{ minWidth: "200px" }}>{checkboxes}</div>
          {this.state.filteredSolutions && (
            <Paginate todos={this.state.filteredSolutions} />
          )}
        </InnerPage>
        <div style={{ marginTop: "50px", width: "100%" }}>
          <Footer />
        </div>
      </Page>
    );
  }
}

Browse.propTypes = {
  getField: PropTypes.func.isRequired,
  getEnterprises: PropTypes.func.isRequired,
  categoryTypes: PropTypes.object,
  enterprise: PropTypes.object.isRequired,
  data: PropTypes.object
};
const mapStateToProps = state => ({
  enterprise: state.enterprise
});
export default connect(
  mapStateToProps,
  { getEnterprises, getField }
)(Browse);
