import { getTechnologyBadgeStyle } from "../../constants/TechnologyTags";

interface FilterBadgeProps {
  label: string;
  isActive: boolean;
}

function FilterBadge({ label, isActive }: FilterBadgeProps) {
  const style = getTechnologyBadgeStyle(label);

  return (
    <span
      style={{
        ...style,
        padding: "4px 12px",
        borderRadius: "15px",
        display: "block",
        width: "100%",
        textAlign: "center",
        border: isActive
          ? `2px solid ${style.color}`
          : `1px solid ${style.borderColor}`,
        background: style.backgroundColor,
        color: style.color,
      }}
    >
      {label}
    </span>
  );
}

export default FilterBadge;