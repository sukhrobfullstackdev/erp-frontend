import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isNull } from "lodash";
import { Link, useHistory } from "react-router-dom";
import { Col, Row } from "react-grid-system";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Actions from "../actions";
import ApiActions from "../../../services/api/actions";
import MiniLoader from "../../../components/loader/mini-loader";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import LoginWith from "../../../components/elements/loginWith";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import PhoneNumberRegex from "../../../schema/PhoneNumberRegex";
import Normalizer from "../../../services/normalizer";
import Label from "../../../components/elements/label";
import { getCountry } from "../../../utils";
import CustomHeader from "../components/SelectCustomHader";
import CustomOption from "../components/SelectCustomOption";

const LoginOrSignUpContainer = ({
  loginOrSigUpRequest,
  getPhoneNumberRegexList,
  entities,
  phoneRegexList,
  setIsFocused,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    prefix: "998",
    selected: {
      mask: "99 999 99 99",
    },
  });
  const history = useHistory();

  useEffect(() => {
    isEmpty(get(phoneRegexList, "result.data", [])) && getPhoneNumberRegexList();
  }, []);

  useEffect(() => {
    if (!isEmpty(get(phoneRegexList, "result.data", []))) {
      let country = getCountry();
      let res = get(phoneRegexList, "result.data", []).find((item) => get(item, "countryName", "") === country);
      if (!isEmpty(get(res, "prefix", "")) && state.prefix !== get(res, "prefix", ""))
        setState((s) => ({
          ...s,
          prefix: get(res, "prefix", ""),
        }));
    }
  }, [phoneRegexList]);

  const loginOrSignUp = ({ data: { phoneNumber } = {}, setError }) => {
    phoneNumber = phoneNumber.replace(/[\s()-]+/gi, "");
    setLoading(true);
    loginOrSigUpRequest({
      attributes: { phoneNumber: `+${state.prefix}${phoneNumber}` },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ data: { registered, hasPassword } = {}, phoneNumber }) => {
          setLoading(false);
          if (!registered) {
            history.push(`/auth/sign-up/${btoa(phoneNumber)}`);
          } else {
            if (registered && hasPassword) {
              history.push(`/auth/login/${btoa(phoneNumber)}`);
            } else if (registered && !hasPassword) {
              history.push(`/auth/sign-up/${btoa(phoneNumber)}/${btoa("yes")}`);
            }
          }
        },
      },
    });
  };
  phoneRegexList = Normalizer.Denormalize(phoneRegexList, { result: { data: [PhoneNumberRegex] } }, entities);

  const getPlaceHolder = useCallback(() => `${get(state, "selected.mask", "").replaceAll("9", "-")}`, [state.selected]);

  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center "}>
        Welcome Back, Please <br /> log in to Get started
      </Title>
      <FormDemo
        formRequest={loginOrSignUp}
        footer={
          <>
            <Row>
              <Col xs={12}>
                <Link to={"/auth/forgot-phone-number"} className={"forgot-password"}>
                  {" "}
                  Forgot phone number ?{" "}
                </Link>
              </Col>
            </Row>

            <Flex justify={"space-between"} className={"backAndNextBtnContainer"}>
              <Button center="1" className="backButton" lightSmBorder lightButton>
                <Icon icon="icon-left-arrow" className="dark" mainClassName="left-arrow" />
                Back
              </Button>
              <Button center="1" type={"submit"} lightSmBorder success className="nextButton">
                {loading ? <MiniLoader /> : "Next"}
              </Button>
            </Flex>
          </>
        }
      >
        <Row>
          <Col xs={12}>
            <Label>Phone number</Label>
          </Col>
        </Row>
        <Row nogutter className="auth-select__input">
          <Col xs={3} className="auth-select__input__dropdown">
            <Field
              type={"custom-select"}
              name={"prefix"}
              CustomOption={CustomOption}
              CustomHeader={CustomHeader}
              options={get(phoneRegexList, "result.data", [])}
              defaultValue={state.prefix}
              valueKey={"prefix"}
              labelKey={"countryName"}
              params={{ required: true }}
              hideLabel
              onChange={(value, item) =>
                state.prefix !== value &&
                !isNull(value) &&
                setState((s) => ({
                  ...s,
                  prefix: value,
                  selected: item,
                }))
              }
            />
          </Col>
          <Col xs={9}>
            <Field
              type={"input-mask"}
              name={"phoneNumber"}
              label={"Phone number"}
              hideLabel
              params={{
                required: true,
                pattern: "",
                maxLength: 30,
                minLength: 5,
              }}
              property={{
                disabled: false,
                mask: get(state, "selected.mask", ""),
                placeholder: getPlaceHolder(),
                prefix: `+ ${state.prefix}`,
                setIsFocused,
              }}
            />
          </Col>
        </Row>
      </FormDemo>
      <LoginWith className="loginWidthComponent" />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    phoneRegexList: get(state, "normalizer.data.phone-regex-list", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginOrSigUpRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.LOGIN_OR_SIGNUP.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
    getPhoneNumberRegexList: () => {
      const storeName = "phone-regex-list";
      const entityName = "phone-regex";
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: "auth/v1/auth/phone-number-pattern",
          config: {
            params: {},
          },
          scheme: { data: [PhoneNumberRegex] },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrSignUpContainer);
