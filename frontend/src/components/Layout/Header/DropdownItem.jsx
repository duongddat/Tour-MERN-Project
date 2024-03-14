import { Link } from "react-router-dom";

function DropdownItem({ title, to, divider = false }) {
  return (
    <li>
      {!divider && (
        <Link className="dropdown-item" to={to}>
          {title}
        </Link>
      )}
      {divider && <hr className="dropdown-divider" />}
    </li>
  );
}

export default DropdownItem;
