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

  const card = data.categories.map((item, i) => {
    return (
      <div className="describtion" key={i}>
        {item.products[i].description}
        <img
          src={item.products[i].gallery}
          alt="img"
          width={300}
          height={300}
        />
      </div>
    );
  });

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

      <div className="main-all-pict">{card}</div>
    </div>
  );
}

export default App;
