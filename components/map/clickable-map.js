import * as d3 from "d3";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

// GeoJsonファイルを読み込み
import geoJson from "/japan.geo.json";

function ClickableMap() {
  const router = useRouter();
  const mapRef = useRef(null);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    let windowSm = 768;
    let w;
    let h;

    if (windowWidth <= windowSm) {
      //横幅768px以下（スマホ）に適用させるJavaScriptを記述
      w = 350;
      h = 500;
    } else {
      //横幅768px以上（PC、タブレット）に適用させるJavaScriptを記述
      w = 550;
      h = 500;
    }
    // 地図の投影図法を設定する．
    const projection = d3
      .geoMercator()
      //中心座標
      .center([136.5, 37.5])
      .scale(1300)
      .translate([w / 2, h / 2]);

    // GeoJSONからpath要素を作る．
    const path = d3.geoPath().projection(projection);

    const svg = d3.select(mapRef.current);
    svg
      .attr("height", h)
      .attr("width", w)
      .selectAll("path")
      .data(geoJson.features)
      .enter()
      .append("path")
      .attr("class", (d) =>
        d.properties.region
          ? "region ${d.properties.region.toLowerCase()}"
          : "region"
      )
      .attr("class", function (d) {
        return "pref ";
      })
      .attr("d", path)
      .attr("stroke", "#F56018")
      .attr("stroke-width", 0.25)
      .style("fill", "#fff")
      .style("fill-opacity", () => {
        return 0.9;
      })
      .on("mouseover", (ev, d) => {
        // マウス位置の都道府県領域の色を変更
        d3.select(ev.currentTarget).attr("stroke-width", "3");
        d3.select(ev.currentTarget).style("fill", "#fff");
        d3.select(ev.currentTarget).style("fill-opacity", 1);
      })
      .on("mouseout", (ev, d) => {
        d3.select(ev.currentTarget).attr("stroke-width", "0.25");
        d3.select(ev.currentTarget).style("fill-opacity", 0.9);
      })
      .on("click", (ev, d) => {
        // マウス位置の都道府県領域を赤色に変更
        d3.select(ev.currentTarget).attr("fill", "#CC4C39");
        d3.select(ev.currentTarget).attr("stroke-width", "1");
        // 遷移要素取得
        const preName = d.properties.name_ja;

        router.push(`spots/search/${preName}`);
      });
  }, [mapRef]);
  return (
    <div>
      <svg ref={mapRef} />
    </div>
  );
}

export default ClickableMap;
