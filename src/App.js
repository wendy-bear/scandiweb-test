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
      <img src={data.categories[1].products[1].gallery[1]} alt="img" />
    </div>
  );
}

export default App;
