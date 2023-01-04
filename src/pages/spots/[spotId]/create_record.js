import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewRecord from "../../../components/input/new-record";

const CreateRecordPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const [spotId, setSpotId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      setSpotId(query.spotId);
      setLoading(false);
    }
  }, [isReady, query, spotId, setSpotId, setLoading]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return <NewRecord spotId={spotId} />;
};

export default CreateRecordPage;
