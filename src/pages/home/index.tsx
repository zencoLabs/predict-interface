import { Header } from "@modules/Header";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import clsx from "clsx";

const HomePage: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Zenco-Prediction</title>
        <meta name="description" content={'Zenco—The First Conflux Prediction Market and SocialFi'} />
      </Helmet>
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
            <Link className="zc-bet-btn zc-bet-btn-base" to="/prediction/0">Go to Prediction</Link>
          </div>

        </div>

      </div>

    </>
  );
};

export default HomePage;
