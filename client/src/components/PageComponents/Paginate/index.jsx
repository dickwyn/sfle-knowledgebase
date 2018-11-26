import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  margin-left: 100px;
  width: 100%;
`;

class Paginate extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: null,
      currentPage: 1,
      todosPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, todosPerPage } = this.state;
    const todos = this.props.todos;
    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <div key={index}>{todo}</div>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          style={{ display: "inline-flex", alignItmes: "space-between" }}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <Page>
        <div>{renderTodos}</div>
        <div
          style={{
            display: "flex",
            width: "250px",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
          id="page-numbers"
        >
          {renderPageNumbers}
        </div>
      </Page>
    );
  }
}

Paginate.propTypes = {
  todos: PropTypes.object,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Paginate;
