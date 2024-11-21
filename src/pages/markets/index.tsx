import { Header } from "@modules/Header";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import clsx from "clsx"; 

const MarketsPage: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Zenco-Prediction Markets</title>
        <meta name="description" content={'Zenco—The First Conflux Prediction Market and SocialFi'} />
      </Helmet>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}>

        <Header />

        <div
          className={clsx(
            "py-18px px-16px flex flex-col gap-24px web-(max-w-520px mx-auto px-0 pt-36px pb-48px)"
          )}
        >
          <div>
            <div className="text-(white-normal 24px) font-700 lh-32px mb-4px web-(text-36px lh-42px font-600 mb-8px)">
              Markets
            </div>
          </div>
          <div className="pl-16px pr-8px py-8px border-(1px solid gray-90) flex-vertical-center justify-between rounded-8px">
            <div className="text-(gray-80 14px) font-400 lh-22px">
              <Link className="text-(white-normal 16px) font-700 lh-24px web-(text-20px lh-28px)"
                to="/prediction/1"> Will Bitcoin hit $100k in 2024?</Link>
            </div>
            <div className="flex-vertical-center gap-8px">
              <span className="text-(green 16px) lh-24px">
                Active
              </span>
            </div>
          </div>

          <div className="pl-16px pr-8px py-8px border-(1px solid gray-90) flex-vertical-center justify-between rounded-8px">
            <div className="text-(gray-80 14px) font-400 lh-22px">
              <Link className="text-(gray 16px) font-700 lh-24px web-(text-20px lh-28px)"
                to="/prediction/0"> 2024 Election Forecastn</Link>
            </div>
            <div className="flex-vertical-center gap-8px">
              <span className="text-(gray 16px) lh-24px">
                Ended
              </span>
            </div>
          </div>

          {/* <div className="flex flex-col gap-16px">
            {options.map((o, i) => (
              <VoteOption key={i} option={o} isEnd={isEnd} />
            ))}
          </div> */}

        </div>



      </div>


    </>
  );
};

export default MarketsPage;
