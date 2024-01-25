import Form from "react-bootstrap/Form";

export default function Sort({ products, setProducts, reRender, setReRender }) {
  const onChangeHandler = (event) => {
    switch (event.target.value) {
      case "0":
        setProducts(
          products.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "1":
        setProducts(
          products.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "2":
        setProducts(
          products.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (a.price < b.price) {
              return 1;
            }
            return 0;
          })
        );
        break;
      
      default:
        break;
    }
    setReRender(true);
  };

  return (
    <Form.Select
      className="sort-form"
      aria-label="sort-by"
      size="sm"
      onChange={(event) => {
        onChangeHandler(event);
      }}
    >
      <option default>Sort By...</option>
      <option value="0">A-Z</option>
      <option value="1">Lowest Price</option>
      <option value="2">Highest Price</option>
    </Form.Select>
  );
}