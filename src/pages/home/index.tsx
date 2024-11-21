import { Header } from "@modules/Header";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; 
import electricalSVG from "@assets/images/electrical-system_dark.svg";

const HomePage: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Zenco-Prediction</title>
        <meta name="description" content={'Zenco—The First Conflux Prediction Market and SocialFi'} />
      </Helmet>

      <div style={{
        position:'relative',
        width:'100%',
        height:'100vh',
        overflow:'hidden'
      }}>

        <Header />
        <div
          // className={clsx(
          //   "py-18px px-16px flex flex-col gap-24px web-(max-w-520px mx-auto px-0 pt-36px pb-48px)"
          // )}
          className="landing-page"
        >

          <div className="zc-container">
            <div className="text-content">
              <h1>Zenco—The First Conflux Prediction Market and SocialFi</h1>
              {/* <Link className="zc-bet-btn zc-bet-btn-base" to="/prediction/0">Go to Prediction</Link> */}
              <Link className="zc-bet-btn zc-bet-btn-base" to="/markets">Go to Prediction</Link>
            </div>

          </div>


        </div>


        <img className="zc-animations" style={{
          position: 'absolute', 
          zIndex: '-1',
          opacity: '0.5'
        }}
          loading="lazy"
          data-src={electricalSVG} alt="zenco"
          width="100%" height="100%" src={electricalSVG} />


      </div>


    </>
  );
};

export default HomePage;
