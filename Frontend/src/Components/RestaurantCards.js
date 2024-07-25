import { CDN_URL } from "../utils/constants";

const RestaurantCards = (props) => {
  const { resData } = props;
  const { name, cloudinaryImageId, cuisines, avgRating } = resData.info;
  const { slaString } = resData.info.sla;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <div className="rounded-lg">
        <img className="res-logo" src={CDN_URL + cloudinaryImageId} />
      </div>
      <div className="res-card-info">
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(" , ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{slaString}</h4>
      </div>
    </div>
  );
};

export default RestaurantCards;
