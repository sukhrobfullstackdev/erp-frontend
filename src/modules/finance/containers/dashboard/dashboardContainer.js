import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import CardComponent from "../../components/dashboard/cardComponent";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { get, head, isArray, isEmpty } from "lodash";
import Actions from "../../../../services/api/actions";
import Flex from "../../../../components/elements/flex";
import CardCashRegisters from "../../components/dashboard/cardCashRegisters";
import CashRegistersList from "../../components/dashboard/cashRegistersList";
import IncomeComponent from "../../components/dashboard/incomeComponent";
import CashFlowComponent from "../../components/dashboard/cashFlowComponent";
import ExpensesPropositionComponent from "../../components/dashboard/expensesPropositionComponent";

const DashboardContainer = ({ getData, getCashRegisters, getIncomes, request, setTemp, getDataFromApi, t }) => {
  const [state, setState] = useState({
    selected: 0,
    cashRegistersIsFetched: false,
    incomeIsFetched: false,
    cashFlowIsFetched: false,
    expensesIsFetched: false,
    currencyType: "",
  });

  getCashRegisters = get(getCashRegisters, "data", []);

  useEffect(() => {
    getData({
      url: "/finance/v1/dashboard/cash-registers",
      storeName: "cash-registers",
    });

    getData({
      url: "/finance/v1/dashboard/cash-flow",
      storeName: "cash-flow",
      method: "post",
    });

    getData({
      url: "/finance/v1/dashboard/expenses-proposition",
      storeName: "expenses-proposition",
      method: "post",
    });
    getData({
      url: "finance/v1/dashboard/currency-type",
      storeName: "currency-type",
      cb: {
        success: ({ data }) => {
          setState({ ...state, currencyType: head(data) });
          getData({
            url: "/finance/v1/dashboard/incomes",
            storeName: "incomes",
            method: "post",
            config: { currencyType: head(data) },
          });
          getData({
            url: "/finance/v1/dashboard/expenses",
            storeName: "expenses",
            method: "post",
            config: { currencyType: head(data) },
          });
        },
        fail: () => "",
      },
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(state.currencyType)) {
      getData({
        url: "/finance/v1/dashboard/incomes",
        storeName: "incomes",
        method: "post",
        config: { currencyType: state.currencyType },
      });
      getData({
        url: "/finance/v1/dashboard/expenses",
        storeName: "expenses",
        method: "post",
        config: { currencyType: state.currencyType },
      });
    }
  }, [state.currencyType]);

  const refresh = () => {
    // getData({url: "/finance/v1/dashboard/cash-registers", storeName: "cash-registers"});
    setState((s) => ({ ...s, cashRegistersIsFetched: true }));
    request({
      url: "/finance/v1/dashboard/cash-registers",
      cb: {
        success: (res) => {
          setTemp({
            item: {
              data: { result: { data: get(res, "data", {}) } },
            },
            storeName: "cash-registers",
          });
          setState((s) => ({ ...s, cashRegistersIsFetched: false }));
        },
        fail: (e) => "",
      },
    });
  };
  const refreshIncome = () => {
    // getData({url: "/finance/v1/dashboard/incomes", storeName: "incomes", method: "post"});
    setState((s) => ({ ...s, incomeIsFetched: true }));
    request({
      attributes: { currencyType: state.currencyType },
      url: "/finance/v1/dashboard/incomes",
      method: "post",
      cb: {
        success: (res) => {
          setTemp({
            item: {
              data: { result: { data: get(res, "data", {}) } },
            },
            storeName: "incomes",
          });
          setState((s) => ({ ...s, incomeIsFetched: false }));
        },
        fail: (e) => "",
      },
    });
  };
  const refreshExpenses = () => {
    setState((s) => ({ ...s, expensesIsFetched: true }));
    request({
      attributes: { currencyType: state.currencyType },
      url: "/finance/v1/dashboard/expenses",
      method: "post",
      cb: {
        success: (res) => {
          setTemp({
            item: {
              data: { result: { data: get(res, "data", {}) } },
            },
            storeName: "expenses",
          });
          setState((s) => ({ ...s, expensesIsFetched: false }));
        },
        fail: (e) => "",
      },
    });
  };
  const refreshCashFlow = () => {
    setState((s) => ({ ...s, cashFlowIsFetched: true }));
    request({
      url: "/finance/v1/dashboard/cash-flow",
      method: "post",
      cb: {
        success: (res) => {
          setTemp({
            item: {
              data: { result: { data: get(res, "data", {}) } },
            },
            storeName: "cash-flow",
          });
          setState((s) => ({ ...s, cashFlowIsFetched: false }));
        },
        fail: (e) => "",
      },
    });
  };

  const getCards = (currencyType, item, index) => {
    if (currencyType === "USD")
      return (
        <Col xs={4} className={"col"} key={currencyType}>
          <CardComponent
            onClick={() => setState((s) => ({ ...s, selected: index }))}
            {...{
              type: "third",
              title: t("total_cashboxes") ?? "Total Cashboxes",
              refresh,
              isFetched: state.cashRegistersIsFetched,
              ...item,
            }}
          />
        </Col>
      );
    else if (currencyType === "UZS")
      return (
        <Col xs={4} className={"col"} key={currencyType}>
          <CardComponent
            onClick={() => setState((s) => ({ ...s, selected: index }))}
            {...{
              type: "first",
              title: t("total_cashboxes") ?? "Total Cashboxes",
              refresh,
              isFetched: state.cashRegistersIsFetched,
              ...item,
            }}
          />
        </Col>
      );
    else if (currencyType === "RUB")
      return (
        <Col xs={4} className={"col"} key={currencyType}>
          <CardComponent
            onClick={() => setState((s) => ({ ...s, selected: index }))}
            {...{
              type: "second",
              title: t("total_cashboxes") ?? "Total Cashboxes",
              refresh,
              isFetched: state.cashRegistersIsFetched,
              ...item,
            }}
          />
        </Col>
      );
  };

  return (
    <Row className={"row"}>
      <Col xs={9} className={"col"}>
        <Row className={"row"}>
          {isArray(getCashRegisters) && getCashRegisters.map((item, index) => getCards(get(item, "currencyType"), item, index))}
        </Row>
        <Row className={"row space-for-row"}>
          <Col xs={4} className={"col col-for-swiper"}>
            <CashRegistersList data={get(getCashRegisters, `[${state.selected}].cashRegisters`, [])} />
            <IncomeComponent
              isFetched={get(state, "incomeIsFetched", false)}
              data={get(getIncomes, "result.data", {})}
              refreshIncome={refreshIncome}
              currencyType={getDataFromApi("currency-type.data.result.data")}
              currency={state.currencyType}
              setCurreny={(currency) => setState((s) => ({ ...s, currencyType: currency }))}
            />
          </Col>
          <Col xs={8} className={"col"}>
            <CashFlowComponent
              data={getDataFromApi("cash-flow.data.result.data")}
              isFetched={get(state, "cashFlowIsFetched", false)}
              refresh={refreshCashFlow}
            />
            <ExpensesPropositionComponent data={getDataFromApi("expenses-proposition.data.result.data")} />
          </Col>
        </Row>
      </Col>
      <Col xs={3} className={"col"}>
        <IncomeComponent
          title={"Expenses"}
          innerRadius={160}
          isFetched={get(state, "expensesIsFetched", false)}
          data={getDataFromApi("expenses.data.result.data")}
          refreshIncome={refreshExpenses}
          currencyType={getDataFromApi("currency-type.data.result.data")}
          currency={state.currencyType}
          setCurreny={(currency) => setState((s) => ({ ...s, currencyType: currency }))}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    getCashRegisters: get(state, `api.cash-registers.data.result`, {}),
    getIncomes: get(state, `api.incomes.data`, {}),
    getDataFromApi: (storeName) => get(state, `api.${storeName}`, {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: ({ url, storeName, config = {}, isChangeState = true, method = "get", cb }) => {
      dispatch({
        type: Actions.GET_DATA.REQUEST,
        payload: {
          storeName,
          url,
          method,
          isChangeState,
          config,
          cb,
        },
      });
    },
    request: ({ url, attributes = {}, method = "get", cb }) => {
      dispatch({
        type: Actions.REQUEST.REQUEST,
        payload: {
          attributes,
          url,
          method,
          cb,
        },
      });
    },
    setTemp: ({ item, storeName }) => {
      dispatch({
        type: Actions.TEMP_DATA.REQUEST,
        payload: {
          storeName,
          item,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(DashboardContainer)));
