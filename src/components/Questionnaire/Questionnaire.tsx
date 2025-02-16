import css from "./Questionnaire.module.css";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineStarPurple500 } from "react-icons/md";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  addToFavoriteNannies,
  deleteFromVafourite,
} from "../../redux/nannies/slice";
import { favoriteNannies } from "../../redux/nannies/selectors";
import heart from "../../image/heart.svg";
import fullHeart from "../../image/fullHeart.png";

import { openModalWindow } from "../../redux/modal/slice";

type Reviews = {
  comment: string;
  rating: number;
  reviewer: string;
};
interface INannie {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Reviews[];
}
interface QuestionnaireProps {
  nannie: INannie;
}
const Questionnaire: React.FC<QuestionnaireProps> = ({ nannie }) => {
  const [visibileReviews, setVisibileReviews] = useState<boolean>(false);
  const birthDate = new Date(nannie.birthday);
  const currentData = new Date();
  const age = currentData.getFullYear() - birthDate.getFullYear();
  const reviews = nannie.reviews;
  const nannies = useSelector(favoriteNannies);
  const dispatch = useDispatch<AppDispatch>();
  const toggleFavorite = (nannie: INannie) => {
    const isFavorite = nannies.some((fav) => fav.name === nannie.name);
    if (isFavorite) {
      dispatch(deleteFromVafourite(nannie));
      setHeartFavourite(false);
    } else {
      dispatch(addToFavoriteNannies(nannie));
      setHeartFavourite(true);
    }
  };
  useEffect(() => {
    const isFavorite = nannies.some((fav) => fav.name === nannie.name);
    if (isFavorite) {
      setHeartFavourite(true);
    }
  }, [nannies, nannie.name]);
  const [heartFavourite, setHeartFavourite] = useState<boolean>(false);

  return (
    <div className={css.questionnaireCont}>
      <div className={css.fotoCont}>
        <img
          src={nannie.avatar_url}
          alt="Nannie foto"
          className={css.fotoNannie}
        />
      </div>

      <div>
        <div className={css.titleCont}>
          <div className={css.nannieName}>
            <p>Nanny</p>
            <h3> {nannie.name}</h3>
          </div>
          <div className={css.secondContTitle}>
            <div className={css.descriptionNannieCont}>
              <div className={css.locationCont}>
                <SlLocationPin size={16} />
                <p>{nannie.location}</p>
              </div>
              <p className={css.symbol}>|</p>
              <div className={css.ratingCont}>
                <MdOutlineStarPurple500 color="#ffc531" />
                <p>Rating: {nannie.rating}</p>
              </div>
              <p className={css.symbol}>|</p>
              <div className={css.priceCont}>
                <p>
                  Price / 1 hour: <span>{nannie.price_per_hour}$</span>
                </p>
              </div>
            </div>
            <div onClick={() => toggleFavorite(nannie)}>
              {/* <HeartIcon /> */}
              {/* <HeartIcon/> */}
              <img
                src={heartFavourite ? fullHeart : heart}
                alt="heart icon"
                className={css.heartIcon}
              />
            </div>
          </div>
        </div>
        <div className={css.experienceCont}>
          <div className={css.age}>
            <p>
              Age: <span>{age}</span>
            </p>
          </div>
          <div className={css.experience}>
            <p>
              Experience: <span>{nannie.experience}</span>
            </p>
          </div>
          <div className={css.kidsAgeCont}>
            <p>
              Kids Age: <span>{nannie.kids_age}</span>
            </p>
          </div>
          <div className={css.charactersCont}>
            <p>
              Characters:<span> {nannie.characters.join(", ")}</span>
            </p>
          </div>
          <div className={css.educationCont}>
            <p>
              Education:
              <span>
                Bachelor's in Early Childhood Education, First Aid Certified
              </span>
            </p>
          </div>
        </div>
        <p className={css.description}>{nannie.about}</p>
        {!visibileReviews && (
          <p onClick={() => setVisibileReviews(true)} className={css.moreLink}>
            Read more
          </p>
        )}

        {visibileReviews && (
          <div className={css.mainReviewCont}>
            <ul className={css.reviewList}>
              {reviews.length !== 0 &&
                reviews.map((el, index) => {
                  console.log(el);
                  return (
                    <li key={index} className={css.reviewItem}>
                      <div className={css.reviewerCont}>
                        <div className={css.reviewerLetter}>
                          <p>{el.reviewer.slice(0, 1)}</p>
                        </div>
                        <div className={css.reviewerNameCont}>
                          <p>{el.reviewer}</p>
                          <div className={css.reviewerRatingCont}>
                            <MdOutlineStarPurple500 color="#ffc531" />
                            <p>{el.rating}</p>
                          </div>
                        </div>
                      </div>
                      <p className={css.reviewerComment}>{el.comment}</p>
                    </li>
                  );
                })}
            </ul>
            <button
              onClick={() => {
                dispatch(
                  openModalWindow({
                    modalType: "appointment",
                    modalData: { photo: nannie.avatar_url, name: nannie.name },
                  })
                );
              }}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
