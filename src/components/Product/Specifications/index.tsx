import { ProductSpecs } from "@/schemas/Product/ProductSchema";
import { v4 as uuidv4 } from "uuid";

interface SpecificationsProps {
  data: ProductSpecs;
}

const Specifications = ({ data }: SpecificationsProps) => {
  const specsEntries = Object.entries(data);

  return (
    <div className="c-specifications">
      <h2 className="c-specifications__title">SPECIFICATIONS</h2>
      <table className="c-specifications__table">
        <tbody>
          {specsEntries.map(([key, value]) => (
            <tr key={uuidv4()}>
              <td className="c-specifications__label">{key}</td>
              <td className="c-specifications__value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Specifications;
