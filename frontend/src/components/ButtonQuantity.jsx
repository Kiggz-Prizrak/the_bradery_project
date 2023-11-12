import Less from "../assets/icons/Less";
import Plus from "../assets/icons/Plus";

const ButtonQuantity = ({ setArticleQuantity, articleQuantity }) => {
  return (
    <div className="buttonQuantity_container">
      <button
        onClick={() =>
          articleQuantity !== 0 ? setArticleQuantity(articleQuantity - 1) : ""
        }
      >
        <Less />
      </button>
      <h6>{articleQuantity}</h6>
      <button onClick={() => setArticleQuantity(articleQuantity + 1)}>
        <Plus />
      </button>
    </div>
  );
};

export default ButtonQuantity;
