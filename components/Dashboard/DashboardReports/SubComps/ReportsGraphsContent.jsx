import GenerateReportsGraphData from "@/libs/Report Libs/GenerateReportsGraphData";
import BarChart from "./BarChart";

const ReportsGraphsContent = ({ analyticsInfo }) => {
  //console.log(Object.keys(analyticsInfo[0]));

  const graphData_Views360 = GenerateReportsGraphData(
    "Views 360",
    analyticsInfo.data,
    "productSKU",
    "views360",
    "rgba(134, 239, 172, 0.5)"
  );

  const graphData_ViewsAR = GenerateReportsGraphData(
    "Views AR",
    analyticsInfo.data,
    "productSKU",
    "ARviews",
    "rgba(34, 197, 94, 0.5)"
  );

  const graphData_WishlistClicks = GenerateReportsGraphData(
    "Wishlist Clicks",
    analyticsInfo.data,
    "productSKU",
    "clicksToWishlist",
    "rgba(147, 197, 253, 0.5)"
  );

  const graphData_VariantsChecked = GenerateReportsGraphData(
    "Variants Checked",
    analyticsInfo.data,
    "productSKU",
    "clickToColorChange",
    "rgba(59, 130, 246, 0.5)"
  );

  const graphData_Loadtime360 = GenerateReportsGraphData(
    "Loadtime 360",
    analyticsInfo.data,
    "productSKU",
    "Loadtime360",
    "rgba(253, 224, 71, 0.5)"
  );

  const graphData_Duration360 = GenerateReportsGraphData(
    "Duration 360",
    analyticsInfo.data,
    "productSKU",
    "duration360",
    "rgba(234, 179, 8, 0.5)"
  );

  const graphData_CategoryViews = GenerateReportsGraphData(
    "Category Views",
    analyticsInfo.catData,
    "catName",
    "catView",
    "rgba(234, 20, 8, 0.5)"
  )

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 p-2 gap-2 w-full bg-tif-blue">
      <BarChart graphData={graphData_Views360} />
      <BarChart graphData={graphData_ViewsAR} />
      <BarChart graphData={graphData_WishlistClicks} />
      <BarChart graphData={graphData_VariantsChecked} />
      <BarChart graphData={graphData_Loadtime360} />
      <BarChart graphData={graphData_Duration360} />
      <BarChart graphData={graphData_CategoryViews} />
    </section>
  );
};

export default ReportsGraphsContent;
