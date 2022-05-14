import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      products {
        name
        id
        category
        inStock
        description
        brand
        gallery
        attributes {
          name
          id
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <nav className="main-nav">
        <ul>
          {data.categories.map((item, index) => {
            return (
              <li key={index}>
                <a href="#">{item.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="main-all-pict">
        {data.categories.map((item, i) => {
          return (
            <div className="describtion" key={i}>
              {item.products[0].description}
              <img
                src={item.products[0].gallery}
                alt="img"
                width={300}
                height={300}
              />
            </div>
          );
        })}
      </div>

      {/*<img src={data.categories[1].products[1].gallery[1]} alt="img" />*/}
    </div>
  );
}

export default App;
