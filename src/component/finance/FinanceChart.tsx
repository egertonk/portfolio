import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

export const FinanceChart: React.FC<any> = ({ barData }) => {
  return (
    <div className="grid grid-cols-4" style={{ height: 350 }}>
      <div
        style={{ height: 350 }}
        className="col-span-3 text-white border-separate border-spacing-2 "
      >
        <ResponsiveBar
          data={barData}
          keys={["value"]}
          indexBy="id"
          margin={{ top: 50, right: 130, bottom: 70, left: 90 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          colors="#2c5282"
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Amount",
            legendPosition: "middle",
            legendOffset: -50,
          }}
        />
      </div>

      <div
        style={{ height: 350 }}
        className="flex-col w-25 text-white border-separate border-spacing-2 "
      >
        <ResponsivePie
          data={barData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
        />
      </div>
    </div>
  );
};
