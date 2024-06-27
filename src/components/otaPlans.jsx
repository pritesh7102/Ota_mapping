import { hotelData } from "../data/apiResponse";

export default function OtaPlans(props) {
  const { handleAdd } = props;
  return (
    <div
      style={{ paddingTop: "200px", display: "flex", flexDirection: "column" }}
    >
      {hotelData.room_types_mmt.map((roomType) =>
        roomType.rate_plans.map((ratePlan) => (
          <div
            key={`${roomType.room_type_code}-${ratePlan.rate_plan_code}`}
            className="button-cms-mapping"
            onClick={() =>
              handleAdd(
                `${roomType.room_type_code}, ${roomType.room_type_name}, ${ratePlan.rate_plan_code}, ${ratePlan.rate_plan_name}`,
                950,
                `${roomType.room_type_code}-${ratePlan.rate_plan_code}`
              )
            }
          >
            <div>
              {roomType.room_type_code} {roomType.room_type_name}
            </div>
            <div>
              {ratePlan.rate_plan_code} {ratePlan.rate_plan_name}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
