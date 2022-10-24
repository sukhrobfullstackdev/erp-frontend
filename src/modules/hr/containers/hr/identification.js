import React from "react";
import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import { isArray, get } from "lodash";
import { withTranslation } from "react-i18next";
import Collapse from "../../../../components/elements/collapse";
import Field from "../../../../containers/Form/field";

const IdentificationStyle = styled.div`
.thirdCollapse .active{
  padding: 40px 30px;
}
.task_list{
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .task{
    button{
      position: absolute;
      bottom: -70px;
      background-color: #45B26B;
      border-radius: 50%;
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .ui__icon__wrapper {
        width: 36px;
        height: 36px; 
        .icon{
          width: 36px;
          height: 36px; 
        }
      }
    }
  }
}
.select__text{
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 14px !important;
  padding: 10px 0 4px !important;
  color: #777E91;
}
.form-input-container{
  width: 100% !important;
  height: 50px !important;
  input{
    color: #777E91;
    font-size: 16px !important;
    line-height: 24px !important;
  }
}
.rs-picker-toggle-wrapper{
  display: block !important;
}
.imgContainer{
  width: 100% !important;
}
.first-row{
  margin-bottom: 30px;
}
.dateInputContainer{
  height: 50px;
  input{
    color: #777E91;
    font-size: 16px !important;
    line-height: 24px !important;
  }
}
.Select__controller{
  height: 50px;
  input{
    font-size: 16px !important;
    line-height: 24px !important;
  }
}
 .label {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 12px;
  text-transform: uppercase;
  color: #353945;
  margin-bottom: 40px;
  span {
    display: inline-block;
    margin-bottom: 10px;
  }
}
.form-label{
  width: 100%;
  line-height: 12px;
  color: #353945;
  margin-bottom: 8px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}  
`;

const Identification = ({ passportInfo = {}, active = true, isRequire = false, editable, t, ...props }) => {
  return (
    <IdentificationStyle>
      <Collapse title={t("shaxsiy_identifikator_haqida_ma’lumot") ?? "Shaxsiy identifikator haqida ma’lumot"} active={active} className="thirdCollapse">
        <Row className="first-row">
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.passportSerial`}
                type={"input"}
                className="inputStyle"
                label={t("employee-passport-serial") ?? "Passport series"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "passportSerial", "")}
                property={{ placeholder: "AA" }}
                disabled={!editable}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.passportNumber`}
                type={"input"}
                className="inputStyle"
                label={t("employee-passport-number") ?? "Passport number"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "passportNumber", "")}
                property={{ placeholder: "4015203" }}
                disabled={!editable}
              />
            </div>
          </Col>

          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.passportGivenOrganisation`}
                type={"input"}
                className="inputStyle"
                label={t("employee-passport-given-organisation") ?? "Passport issuing authority"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "passportGivenOrganisation", "")}
                property={{ placeholder: "Tashkent IIB" }}
                disabled={!editable}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.currentAddress`}
                type={"input"}
                className="inputStyle"
                label={t("employee-current-address") ?? "ADDRESS"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "currentAddress", "")}
                property={{ placeholder: "Yunusobod Ц - 5" }}
                disabled={!editable}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.permanentAddress`}
                type={"input"}
                className="inputStyle"
                label={t("employee-permanent-address") ?? "Permanent residence address"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "permanentAddress", "")}
                property={{ placeholder: "Shayxontohur M - 1" }}
                disabled={!editable}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                name={`passportInfo.personalNumber`}
                type={"input"}
                className="inputStyle"
                label={t("employee-personal-number") ?? "Personal Number"}
                labelRequired
                params={{ required: editable }}
                defaultValue={get(passportInfo, "personalNumber", "")}
                property={{ placeholder: "5413 0902 1372" }}
                disabled={!editable}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                type={"datepicker2"}
                name={`passportInfo.passportGivenDate`}
                label={t("employee-passport-given-date") ?? "Date of passport issuance"}
                labelRequired
                property={{
                  format: "dd / MM / yyyy",
                  placeholder: "dd / MM / yyyy",
                }}
                params={{ required: editable }}
                defaultValue={get(passportInfo, "passportGivenDate", new Date().getTime())}
                disabled={!editable}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="formWrapper">
              <Field
                type={"datepicker2"}
                name={`passportInfo.passportExpireDate`}
                label={t("employee-passport-expire-date") ?? "Validity of the passport"}
                labelRequired
                property={{
                  format: "dd / MM / yyyy",
                  placeholder: "dd / MM / yyyy",
                }}
                params={{ required: editable }}
                defaultValue={get(passportInfo, "passportExpireDate", new Date().getTime())}
                disabled={!editable}
              />
            </div>
          </Col>
        </Row>
      </Collapse>
    </IdentificationStyle>
  );
};

export default withTranslation("pdp")(Identification);
