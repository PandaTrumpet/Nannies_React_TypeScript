import css from "./Questionnaire.module.css";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineStarPurple500 } from "react-icons/md";

import HeartIcon from "../HeartIcon";
import { Link } from "react-router-dom";

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
            <HeartIcon />
          </div>
        </div>
        <div className={css.experienceCont}>
          <div className={css.age}>
            <p>
              Age: <span>27</span>
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
        <Link to="reviews" className={css.moreLink}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Questionnaire;
