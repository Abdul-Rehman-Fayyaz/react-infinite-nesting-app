import { Col, Row } from "antd";
import {
  colSizes,
  getStorageItem,
  getUserInitials,
} from "../../utils/common-utils";

import TitleDescriptionBox from "../../components/TitleDescriptionBox";
import useLabels from "../../hooks/use-labels";
import DropDownBox from "../../components/DropDownBox";

import "./styles.css";

const Header = () => {
  const activeUser = getStorageItem("activeUser");

  const { userRole, userName } = activeUser;

  const { brandNameLabel, brandsTagLabel, logoutLabel } = useLabels([
    "brandNameLabel",
    "brandsTagLabel",
    "logoutLabel",
  ]);

  return (
    <div className="header-container">
      <Row justify="space-between">
        <Col {...colSizes(12, 12, 12, 12, 12, 12)}>
          <TitleDescriptionBox
            title={brandNameLabel}
            description={brandsTagLabel}
            className="heading-style brand-meta"
          />
        </Col>
        <Col {...colSizes(12, 12, 12, 12, 12, 12)}>
          <div className="user-info-container">
            <TitleDescriptionBox
              title={userName}
              description={userRole}
              className="user-info"
            />
            <DropDownBox
              label={getUserInitials(userName)}
              items={[{ key: "logout", label: logoutLabel }]}
              className="user-profile-dropdown"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
