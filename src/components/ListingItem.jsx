import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import BedIcon from "../assets/svg/bedIcon.svg";
import BathtubIcon from "../assets/svg/bathtubIcon.svg";
import { BiBed, BiBath } from "react-icons/bi";

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <BiBed color="var(--primary-color)" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1+ Bedroom"}
            </p>
            <BiBath color="var(--primary-color)" />
            <p className="categoryListingInfoText">
            {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
          <DeleteIcon className="removeIcon" fill="rbg(231, 76, 60)" onClick={() => onDelete(listing.id, listing.name)} />
      )}
    </li>
  );
}

export default ListingItem;
