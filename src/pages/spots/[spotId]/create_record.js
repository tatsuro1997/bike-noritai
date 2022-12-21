import { useRouter } from "next/router";

import NewRecord from "../../../components/input/new-record";

function CreateRecordPage() {
  const router = useRouter();
  const spotId = router.query.spotId

  return <NewRecord spotId={spotId} />;
}

export default CreateRecordPage;
