import { Header } from "@modules/Header";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import clsx from "clsx";
// import { fetchChain } from "@utils/fetch";
// import { PredictionContract } from "@contracts/index";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, Contract } from "ethers";
// import abi from "@contracts/abis/prediction";

const MarketsPage: React.FC = () => {

  // // 2024-10-01 00:00
  // const date1 = new Date('2024-10-01T00:00:00Z');
  // console.log(date1.getTime());

  // // 2028-10-01 00:00
  // const date2 = new Date('2028-10-01T00:00:00Z');
  // console.log(date2.getTime());

  const abi = [
    {
      "inputs": [],
      "name": "getPredictions",
      "outputs": [
        {
          "components": [
            { "internalType": "uint256", "name": "index", "type": "uint256" },
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "uint256", "name": "endTime", "type": "uint256" },
            { "internalType": "address", "name": "admin", "type": "address" },
            { "internalType": "uint256", "name": "feeRatio", "type": "uint256" },
            { "internalType": "uint8", "name": "outcome", "type": "uint8" },
            { "internalType": "bool", "name": "feeClaimed", "type": "bool" },
            { "internalType": "string[]", "name": "options", "type": "string[]" },
            { "internalType": "string[]", "name": "optionLogos", "type": "string[]" },
            { "internalType": "uint256[]", "name": "optionVotes", "type": "uint256[]" }
          ],
          "internalType": "struct IPrediction.PredictionMeta[]",
          "name": "",
          "type": "tuple[]",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    }
  ];


  const [formattedData, setFormattedData] = useState<{ name: string, isEnded: boolean }[]>([]);

  useEffect(() => {
    queryMarkets()
  }, [])

  async function queryMarkets() {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const provider = new JsonRpcProvider('https://evm.confluxrpc.com')
    const prediContract = new Contract('0x378396EE652CB8BE5A7ACDD40c697912415822Af', abi, provider)
    try {
      const list = await prediContract.getPredictions().catch()

      const predictionData = []
      for (let index = 0; index < list.length; index++) {
        const rs = list[index];
        const model = {
          name: rs.name,
          isEnded: parseInt(BigNumber.from(rs.endTime).toString()) < currentTimestamp
        };
        predictionData.push(model)
      }

      console.log(predictionData)
      setFormattedData(predictionData)
    } catch (error) {
      console.log(error)
    }

    // const fetchRes = await fetchChain<string>({
    //   params: [
    //     {
    //       data: PredictionContract.encodeFunctionData("predictionIndex", [
    //         //  BigInt(1727740800000),
    //         //  BigInt(1853971200000),
    //       ]),
    //       to: PredictionContract.address,
    //     },
    //     "latest",
    //   ],
    // });

    // const response = PredictionContract.decodeFunctionResult(
    //   "predictionIndex",
    //   fetchRes
    // )[0];

    // console.log({
    //   fetchRes,
    //   response:response
    // })

  }



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
          {formattedData.map((item, index) => (
            <div key={index} className="pl-16px pr-8px py-8px border-(1px solid gray-90) flex-vertical-center justify-between rounded-8px">
              <div className="text-(gray-80 14px) font-400 lh-22px">
                {
                  item.isEnded ?
                    <Link className="text-(gray 16px) font-700 lh-24px web-(text-20px lh-28px)"
                      to="/prediction/0"> {item.name}</Link>
                    :
                    <Link className="text-(white-normal 16px) font-700 lh-24px web-(text-20px lh-28px)"
                      to="/prediction/1"> {item.name} </Link>
                }

              </div>
              <div className="flex-vertical-center gap-8px">
                {
                  item.isEnded ?
                    <span className="text-(gray 16px) lh-24px">
                      Ended
                    </span>
                    :
                    <span className="text-(green 16px) lh-24px">
                      Active
                    </span>
                }

              </div>
            </div>
          ))}
          {/* <div className="pl-16px pr-8px py-8px border-(1px solid gray-90) flex-vertical-center justify-between rounded-8px">
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
          </div> */}

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
