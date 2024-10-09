import Button from "@components/Button";
import {
  claim as _claim,
  useAutoRefreshUserClaimInfo,
  useRefreshUserClaimInfo,
  useUserClaimInfo,
} from "../../services/prediction";
import { Unit } from "@cfxjs/use-wallet-react/ethereum";
import { fromDripToCfx, numberFormat } from "@utils/number";
import useInTransaction from "@hooks/useInTransaction";
import { useParams } from "react-router-dom";
import { Suspense, memo, startTransition } from "react";

const Content: React.FC<{
  claimInfo: ReturnType<typeof useUserClaimInfo>;
}> = ({ claimInfo }) => {
  const { id } = useParams<{ id: string }>();
  const refreshUserClaimInfo = useRefreshUserClaimInfo();

  const { inTransaction, execTransaction: claim } = useInTransaction(_claim);
  const { isUserClaimed, userClaimableAmount } = claimInfo;
  if (Unit.equals(userClaimableAmount, 0)) return null;
  const handleClaim = async () => {
    try {
      if (!id) return;
      const txHash = await claim(id);
      if (!txHash) return;
      startTransition(() => {
        refreshUserClaimInfo();
      });
    } catch (err) {
      console.log("claim error:", err);
    }
  };
  return (
    <div className="p-16px flex-vertical-center justify-between border-(1px solid gray-90) bg-gray-100 rounded-tl-16px rounded-tr-16px">
      <div>
        <div className="text-(gray-80 12px) font-400 lh-20px">Returns</div>
        <div className="text-(white-normal 16px) font-600 lh-24px">
          {numberFormat(fromDripToCfx(userClaimableAmount), 2)} CFX
        </div>
      </div>
      {!isUserClaimed && (
        <Button
          className="px-16px py-9px rounded-8px text-14px font-600 lh-22px"
          onClick={handleClaim}
          loading={inTransaction}
        >
          Claim
        </Button>
      )}
    </div>
  );
};

const Query = memo(() => {
  useAutoRefreshUserClaimInfo();
  const claimInfo = useUserClaimInfo();
  return <Content claimInfo={claimInfo} />;
});

export const Claim: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Query />
    </Suspense>
  );
};
