import css from "./Questionnaire.module.css";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineStarPurple500 } from "react-icons/md";

import HeartIcon from "../HeartIcon";
import { Link } from "react-router-dom";

const Questionnaire = () => {
  return (
    <div className={css.questionnaireCont}>
      <div className={css.fotoCont}>
        <img src="" alt="Nannie foto" className={css.fotoNannie} />
      </div>

      <div>
        <div className={css.titleCont}>
          <div className={css.nannieName}>
            <p>Nanny</p>
            <h3> Anna Schevchenko</h3>
          </div>
          <div className={css.secondContTitle}>
            <div className={css.descriptionNannieCont}>
              <div className={css.locationCont}>
                <SlLocationPin size={16} />
                <p>Kyiv, Ukraine</p>
              </div>
              <p className={css.symbol}>|</p>
              <div className={css.ratingCont}>
                <MdOutlineStarPurple500 color="#ffc531" />
                <p>Rating: 4.5</p>
              </div>
              <p className={css.symbol}>|</p>
              <div className={css.priceCont}>
                <p>
                  Price / 1 hour: <span>15$</span>
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
              Experience: <span>5</span>
            </p>
          </div>
          <div className={css.kidsAgeCont}>
            <p>
              Kids Age: <span>1 to 6 years old</span>
            </p>
          </div>
          <div className={css.charactersCont}>
            <p>
              Characters:<span> Patient, Energetic, Creative, Punctual</span>
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
        <p className={css.description}>
          I love children and have been working with them for over 5 years. I
          believe in creating a positive and nurturing environment for kids. I
          also love outdoor activities and crafts.
        </p>
        <Link to="reviews" className={css.moreLink}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Questionnaire;
