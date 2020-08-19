import React, { Component } from "react";
import { getData } from "../apis/Example";
import { Card, Avatar } from "antd";
import CategoryModal from "./CategoryModal";

const { Meta } = Card;

class MainScreen extends Component {
  //initial state set up
  state = {
    loading: true,
    title: "",
    categories: null,
    modalVisible: false,
    currentItems: [],
    currentChildCategories: [],
    categoryName: "",
  };

  async componentDidMount() {
    //fetching remote data and storing in state
    const response = await getData();
    this.setState({
      loading: false,
      title: response.name,
      categories: response.categories,
    });
  }

  //modal boilerplate mandatory function
  onCancel = () => {
    this.setState({ modalVisible: false });
  };

  //Ideally a user should be able to see both the featured
  //and available items without having to click into every category.
  //But given the structure of the data returned, the algorithm to access
  //specific items based on "featured" or "available" wouldn't
  //exactly be efficient (especially on the first try), which is why I decided not
  //to build out that feature, although it should not be difficult to do so at all.
  //But ideally, this could be refactored on the backend to make it much faster here.

  render() {
    const {
      loading,
      title,
      categories,
      modalVisible,
      currentItems,
      currentChildCategories,
      categoryName,
    } = this.state;

    //rendering loading cards..
    //could ideally be its own component in production
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* 
          Statically rendering a loading card for each category.
          Not the best idea, I know! But works for this purpose.
          */}
          {[0, 1, 2, 3, 4].map((el) => {
            return (
              <Card
                key={el}
                style={{ width: 400, margin: 15 }}
                loading={loading}
              ></Card>
            );
          })}
        </div>
      );
    }

    //actual return method
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{title}</h1>
        </div>
        <div
          className="site-card-wrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* 
          mapping over categories to display the title of each one.
          setting state and displaying modal on click
          */}
          {categories.map((category) => {
            return (
              <Card
                bordered={true}
                hoverable
                onClick={() =>
                  this.setState({
                    modalVisible: true,
                    currentItems: category.items,
                    currentChildCategories: category.child_categories,
                    categoryName: category.name,
                  })
                }
                style={{
                  width: 400,
                  margin: 15,
                  textAlign: "center",
                }}
                key={category.id}
              >
                <div>
                  <h1>{category.name}</h1>
                </div>
              </Card>
            );
          })}
        </div>
        {/* 
        Displaying modal if modalVisible === true. 
        Spun off into a seperate component 
        */}
        {modalVisible && (
          <CategoryModal
            name={categoryName}
            items={currentItems}
            childCategories={currentChildCategories}
            visible={modalVisible}
            onCancel={this.onCancel}
          />
        )}
      </>
    );
  }
}

export default MainScreen;
