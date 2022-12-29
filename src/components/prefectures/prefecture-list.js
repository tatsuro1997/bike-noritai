import PrefectureItem from "./prefecture-item";
import classes from "./prefecture-list.module.css";

const PrefectureList = () => (
  <ul className={classes.ul}>
    <PrefectureItem
      area={"北海道・東北"}
      prefectures={[
        "北海道",
        "青森県",
        "秋田県",
        "岩手県",
        "宮城県",
        "新潟県",
        "福島県",
      ]}
    />
    <PrefectureItem
      area={"関東"}
      prefectures={[
        "茨城県",
        "栃木県",
        "群馬県",
        "千葉県",
        "埼玉県",
        "東京都",
        "神奈川県",
      ]}
    />
    <PrefectureItem
      area={"北陸・甲信越"}
      prefectures={[
        "新潟県",
        "富山県",
        "福井県",
        "石川県",
        "長野県",
        "山梨県",
      ]}
    />
    <PrefectureItem
      area={"東海"}
      prefectures={["静岡県", "愛知県", "岐阜県", "三重県"]}
    />
    <PrefectureItem
      area={"近畿"}
      prefectures={[
        "滋賀県",
        "奈良県",
        "和歌山県",
        "大阪府",
        "京都府",
        "兵庫県",
      ]}
    />
    <PrefectureItem
      area={"中国"}
      prefectures={["鳥取県", "島根県", "岡山県", "広島県", "山口県"]}
    />
    <PrefectureItem
      area={"四国"}
      prefectures={["香川県", "徳島県", "愛媛県", "高知県"]}
    />
    <PrefectureItem
      area={"九州・沖縄"}
      prefectures={[
        "福岡県",
        "大分県",
        "宮崎県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "鹿児島県",
        "沖縄県",
      ]}
    />
  </ul>
);

export default PrefectureList;
